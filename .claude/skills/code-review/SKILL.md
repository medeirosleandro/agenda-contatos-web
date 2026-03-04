---
description: "Senior Code Reviewer automatizado. Executa review de PRs e branches usando subagents paralelos especializados por dominio de regras definido no CODE_REVIEW_GUIDE.md."
allowed-tools: Read, Bash, Grep, Glob, Agent, AskUserQuestion
---

# inspira:code-review

> engine-version: 1.0

Senior Code Reviewer automatizado para este repositório. Executa review de PRs e branches usando subagents paralelos, cada um especializado em um dominio de regras definido no `CODE_REVIEW_GUIDE.md`.

## Trigger

Este skill é ativado quando o usuário pede para revisar código:
- "review this PR"
- "review PR #42"
- "review my changes"
- "code review"
- "review branch feature/xyz"

## Step 1 — Context Detection

Detectar o que será revisado:

1. Se o usuário especificou um PR number: usar `gh pr diff <number>` e `gh pr view <number> --json title,body,commits`
2. Se especificou uma branch: usar `git diff <base>...HEAD` e `git log <base>...HEAD --oneline`
3. Se não especificou nada:
   - Checar se existe PR aberta para a branch atual: `gh pr view --json number 2>/dev/null`
   - Se sim: usar modo PR
   - Se não: usar modo branch com `main` como base (ou `master` se `main` não existir)

Se o diff tiver mais de 5000 linhas, avisar o usuário e perguntar se quer focar em diretórios específicos.

## Step 2 — Load Review Guide

Ler `CODE_REVIEW_GUIDE.md` da raiz do projeto. SEMPRE ler fresh — nunca usar versão cached.

Se o arquivo não existir, informar: "CODE_REVIEW_GUIDE.md não encontrado. Execute /inspira:code-review-setup primeiro."

## Step 3 — Categorize Changed Files

Classificar cada arquivo alterado nas categorias do repositório:

**Categorias:**

| Categoria | Pattern | Exemplos |
|-----------|---------|----------|
| `react_component` | `*.tsx` em `components/`, `App.tsx` (exceto *.stories.tsx) | `components/ContactPage.tsx`, `App.tsx` |
| `ui_component` | `*.tsx` em `components/ui/` | `components/ui/sheet.tsx`, `components/ui/button.tsx` |
| `storybook_story` | `*.stories.tsx`, `*.stories.mdx` | `stories/Collapsible.stories.tsx` |
| `test` | `*.test.tsx`, `*.spec.tsx`, `__tests__/**/*.tsx` | `components/ContactPage.test.tsx` |
| `config` | `package.json`, `.eslintrc.*`, `.prettierrc`, `tsconfig.json`, `vite.config.ts` | `package.json` |
| `docs` | `*.md`, `*.mdx` (exceto stories) | `README.md`, `CHANGELOG.md` |
| `storybook_config` | `.storybook/*.ts` | `.storybook/main.ts` |
| `flutter` | `*.dart`, `pubspec.yaml` em `agenda/` | `agenda/lib/main.dart` |

Arquivos que não se encaixam em nenhuma categoria são classificados como `other`.

## Step 4 — Activate Agents (Smart Selection)

Usar a matriz de ativação para determinar quais agentes serão spawned:

**Matriz de Ativação:**

| Agente | Categorias Trigger | Sempre Ativo | Skip Quando |
|--------|--------------------|--------------|-------------|
| Commits | — | Sim | Nunca |
| Patterns | `react_component`, `ui_component`, `test` | Não | Apenas `docs`, `config`, `storybook_config`, `flutter` |
| Tests | `react_component`, `ui_component`, `test` | Não | Apenas `docs`, `config`, `storybook_config`, `storybook_story`, `flutter` |
| Security | `react_component`, `ui_component` | Não | `docs`, `config`, `storybook_config`, `storybook_story`, `test`, `flutter` |
| Quality | `config`, ou QUALQUER se config ausente | Sim se config ausente | `docs`, `storybook_story` se config OK |
| Documentation | `react_component`, `ui_component`, `storybook_story`, `docs` | Não | `config`, `test`, `flutter` |

**Regras de ativação:**
1. O agente "Commits" é SEMPRE ativado (analisa mensagens de commit, não arquivos)
2. Demais agentes são ativados se QUALQUER arquivo alterado pertence a uma categoria trigger
3. Agentes sem arquivos relevantes são IGNORADOS e listados no relatório com motivo
4. Log no cabeçalho do relatório: quais agentes foram ativados e quais foram ignorados

## Step 5 — Spawn Parallel Review Agents

Para cada agente ativado, spawnar um subagent usando a ferramenta Agent. TODOS os agentes devem ser spawnados em uma ÚNICA mensagem (paralelo).

Cada subagent recebe:
- O diff completo (ou subset relevante para seu domínio)
- As regras do CODE_REVIEW_GUIDE.md filtradas para seu domínio (campo "Agent" de cada regra)
- Lista de arquivos alterados em suas categorias
- Instruções para retornar findings no formato:

```
DOMAIN: <nome do domínio>
FINDINGS:
- [HIGH] Rule <ID>: <file>:<line> — <descrição>
- [MEDIUM] Rule <ID>: <file>:<line> — <descrição>
- [LOW] Rule <ID>: <file>:<line> — <descrição>
NO_ISSUES: <lista de regras verificadas sem problemas>
```

**Agentes deste repositório:**

### Agent: Commits

**Prompt inline**:
```
You are the Commits review agent for agenda-contatos-web. Analyze commit messages and validate against these rules:

**Rules to enforce:**
- CMT-001 (HIGH): Conventional Commits format required - type(scope): description
- CMT-002 (MEDIUM): Use scopes when applicable - (storybook), (stories), (sidebar), (app), (contact), (ui)
- CMT-003 (HIGH): Commit messages in English

**Commits to review:**
{commit_messages}

**For each violation, return:**
- [SEVERITY] Rule CMT-XXX: commit_hash — description

**Return format:**
DOMAIN: Commits
FINDINGS:
- [List violations here]
NO_ISSUES: [List rule IDs verified with no problems]
```

### Agent: Patterns

**Prompt inline**:
```
You are the Patterns review agent for agenda-contatos-web. Analyze code patterns and conventions.

**Rules to enforce:**
- PAT-001 (HIGH): PascalCase for component filenames
- PAT-002 (HIGH): camelCase for variables and functions
- PAT-003 (HIGH): Named exports for all components
- PAT-004 (MEDIUM): Double quotes for strings
- PAT-005 (HIGH): 2-space indentation
- PAT-006 (HIGH): Interfaces for component props
- PAT-007 (MEDIUM): Event handlers use "handle" prefix
- PAT-008 (HIGH): Tailwind CSS with CSS variables
- PAT-009 (LOW): Direct imports (no barrel exports)
- PAT-010 (HIGH): Functional components with React hooks

**Files to review:**
{changed_files_patterns}

**Diff:**
{diff}

**For each violation, return:**
- [SEVERITY] Rule PAT-XXX: file:line — description

**Return format:**
DOMAIN: Patterns
FINDINGS:
- [List violations here]
NO_ISSUES: [List rule IDs verified with no problems]
```

### Agent: Tests

**Prompt inline**:
```
You are the Tests review agent for agenda-contatos-web. Validate test coverage and Storybook documentation.

**Rules to enforce:**
- TST-001 (HIGH): Test framework required (Jest/Vitest + React Testing Library)
- TST-002 (MEDIUM): Storybook stories for components

**Files to review:**
{changed_files_tests}

**Diff:**
{diff}

**Check:**
1. Are there *.test.tsx or *.spec.tsx files for new components?
2. Is package.json configured with test framework?
3. Do new components have Storybook stories?

**For each violation, return:**
- [SEVERITY] Rule TST-XXX: file:line — description

**Return format:**
DOMAIN: Tests
FINDINGS:
- [List violations here]
NO_ISSUES: [List rule IDs verified with no problems]
```

### Agent: Security

**Prompt inline**:
```
You are the Security review agent for agenda-contatos-web. Validate security practices.

**Rules to enforce:**
- SEC-001 (HIGH): Input validation and sanitization (Zod/Yup schemas)
- SEC-002 (HIGH): Error boundaries for React components
- SEC-003 (HIGH): Secure ID generation (UUID, not timestamps)
- SEC-004 (HIGH): File validation before processing (type, size, extensions)

**Files to review:**
{changed_files_security}

**Diff:**
{diff}

**Check:**
1. Are user inputs validated with schemas (Zod/Yup)?
2. Are error boundaries present for component isolation?
3. Are IDs generated with crypto.randomUUID() or uuid library?
4. Are file uploads validated (MIME type, size limit)?

**For each violation, return:**
- [SEVERITY] Rule SEC-XXX: file:line — description

**Return format:**
DOMAIN: Security
FINDINGS:
- [List violations here]
NO_ISSUES: [List rule IDs verified with no problems]
```

### Agent: Quality

**Prompt inline**:
```
You are the Quality review agent for agenda-contatos-web. Validate quality tooling setup.

**Rules to enforce:**
- QUA-001 (HIGH): ESLint configuration required
- QUA-002 (HIGH): Prettier formatting configured
- QUA-003 (HIGH): Pre-commit hooks for quality checks

**Files to review:**
{changed_files_quality}

**Diff:**
{diff}

**Check:**
1. Is ESLint configured in package.json and .eslintrc?
2. Is Prettier configured with .prettierrc?
3. Are pre-commit hooks configured (Husky + lint-staged)?

**For each violation, return:**
- [SEVERITY] Rule QUA-XXX: file:line — description

**Return format:**
DOMAIN: Quality
FINDINGS:
- [List violations here]
NO_ISSUES: [List rule IDs verified with no problems]
```

### Agent: Documentation

**Prompt inline**:
```
You are the Documentation review agent for agenda-contatos-web. Validate component and feature documentation.

**Rules to enforce:**
- DOC-001 (MEDIUM): Components documented in Storybook
- DOC-002 (LOW): Feature documentation in markdown

**Files to review:**
{changed_files_documentation}

**Diff:**
{diff}

**Check:**
1. Do new components have Storybook stories with documentation?
2. Are new features documented in markdown files?

**For each violation, return:**
- [SEVERITY] Rule DOC-XXX: file:line — description

**Return format:**
DOMAIN: Documentation
FINDINGS:
- [List violations here]
NO_ISSUES: [List rule IDs verified with no problems]
```

Usar model: "haiku" para agentes de review para otimizar custo. Usar model: "sonnet" apenas se o diff for muito complexo (>500 linhas por agente).

## Step 6 — Consolidation, Drift Detection & Verdict

### 6.1 Consolidar Findings

Merge findings de todos os agentes:
1. Agrupar por severidade (HIGH > MEDIUM > LOW)
2. Dentro de cada severidade, agrupar por domínio
3. Contar totais por severidade

### 6.2 Detecção de Drift

Para cada agente ativado, calcular:
```
taxa_violacao = arquivos_com_violacao_medium_ou_acima / total_arquivos_analisados
```

Se `taxa_violacao >= 0.40` para QUALQUER agente:
- Emitir warning de drift no cabeçalho do relatório
- NÃO bloquear o review — mostrar findings normalmente
- Sugerir: "Considere executar /inspira:code-review-update para revisar o guideline"

### 6.3 Lógica de Veredito

| Condição | Veredito |
|----------|----------|
| 0 HIGH, 0 MEDIUM | **APPROVED** |
| 0 HIGH, 1-2 MEDIUM | **NEEDS DISCUSSION** |
| 0 HIGH, 3+ MEDIUM | **CHANGES REQUESTED** |
| Qualquer HIGH | **CHANGES REQUESTED** |

Definições:
- **HIGH**: Não negociável. Quebra de contrato, testes ausentes, vulnerabilidade. "Must fix" / blocking.
- **MEDIUM**: Requer julgamento. 3+ em um PR indica degradação. "Should fix" / non-blocking individual, blocking em volume.
- **LOW**: Informativo. Nunca afeta veredito. "Nit".

## Step 7 — Report & GitHub Integration

Gerar relatório em markdown:

```
## Code Review Report

**Tipo**: PR #XX / Branch feature/xyz
**Data**: YYYY-MM-DD
**Engine**: inspira:code-review v1.0
**Agentes ativados**: [lista]
**Agentes ignorados**: [lista com motivo]

---

### Veredito: [APPROVED / NEEDS DISCUSSION / CHANGES REQUESTED]

[Se drift detectado:]
> ⚠️ POSSIBLE DRIFT detectado no agente [X]: Y de Z arquivos com violações >= MEDIUM.
> Considere executar /inspira:code-review-update para revisar o guideline.

### Resumo
| Severidade | Quantidade |
|------------|-----------|
| HIGH | X |
| MEDIUM | Y |
| LOW | Z |

---

### Findings

#### HIGH
- **[RULE_ID]** `file:line` — descrição
  Sugestão: ...

#### MEDIUM
- **[RULE_ID]** `file:line` — descrição
  Sugestão: ...

#### LOW
- **[RULE_ID]** `file:line` — descrição

---

### Áreas Limpas
- [Domínio]: Todas as regras verificadas sem problemas ([IDs])

---

### Checklist
| Regra | Status |
|-------|--------|
| [ID] [título] | ✅ PASS / ❌ FAIL / ⊘ SKIP |
```

Após exibir o relatório:
- Se modo PR: perguntar "Deseja postar este relatório como comentário no PR?"
  - Se sim: usar `gh pr comment <number> --body "<report>"`
- Se modo branch: "Relatório gerado. Use-o como referência antes de abrir o PR."

## Execution Rules

1. SEMPRE ler CODE_REVIEW_GUIDE.md fresh — nunca cached
2. SEMPRE spawnar agentes em paralelo — nunca sequencial
3. NUNCA auto-aprovar — sempre mostrar relatório ao usuário
4. NUNCA modificar código — este skill é read-only
5. NUNCA postar no GitHub sem confirmação explícita do usuário
6. Se diff > 5000 linhas, avisar e perguntar se quer focar
7. Citar SEMPRE o ID da regra em cada finding
8. Incluir SEMPRE file:line em cada finding
9. Texto do relatório em português brasileiro, IDs e termos técnicos em inglês
