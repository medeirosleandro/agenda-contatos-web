# Code Review Guide — agenda-contatos-web

> **Última atualização**: 2026-03-04
> **Gerado por**: inspira:code-review-setup
> **Stack**: React 18.3 + TypeScript 5.7 + Vite 6 + Tailwind 4 + Radix UI + Storybook 8.5

---

## Propósito

Este documento define as regras de code review para o repositório **agenda-contatos-web**. Ele serve como:

1. **Referência pré-PR**: Desenvolvedores consultam antes de abrir PRs para garantir conformidade
2. **Base para review automatizado**: A skill `inspira:code-review` usa este guia para executar reviews com subagents paralelos
3. **Fonte de verdade**: Todas as convenções do repositório estão documentadas aqui com evidências

---

## Severidades

| Nível | Significado | Impacto no Review |
|-------|-------------|-------------------|
| **HIGH** | Não negociável. Quebra de contrato, testes ausentes, vulnerabilidade de segurança | Veredito: CHANGES REQUESTED |
| **MEDIUM** | Requer julgamento. Individualmente aceitável, mas 3+ em um PR indica degradação | 1-2: NEEDS DISCUSSION / 3+: CHANGES REQUESTED |
| **LOW** | Informativo. Sugestão de melhoria, nit | Nunca afeta veredito |

---

## Pre-PR Checklist

Antes de abrir um PR, verifique:

1. ✅ **Tests**: Framework de testes configurado (Jest/Vitest) e testes passam
2. ✅ **Linting**: ESLint configurado e `npm run lint` passa sem erros
3. ✅ **Formatting**: Prettier configurado e código está formatado
4. ✅ **Commits**: Seguem Conventional Commits em English com scopes quando aplicável
5. ✅ **Type Safety**: TypeScript compila sem erros (`tsc --noEmit`)
6. ✅ **Input Validation**: Todos os inputs de usuário são validados (Zod/Yup)
7. ✅ **Error Handling**: Error boundaries implementados para componentes principais
8. ✅ **Security**: UUIDs para IDs, validação de arquivos antes de upload
9. ✅ **Component Props**: Todas as props têm interfaces TypeScript
10. ✅ **Pre-commit Hooks**: Husky/lint-staged configurado e funcionando

---

## Regras por Severidade

### HIGH

| ID | Título | Agente |
|----|--------|--------|
| CMT-001 | Conventional Commits format required | Commits |
| CMT-003 | Commit messages in English | Commits |
| PAT-001 | PascalCase for component filenames | Patterns |
| PAT-002 | camelCase for variables and functions | Patterns |
| PAT-003 | Named exports for all components | Patterns |
| PAT-005 | 2-space indentation | Patterns |
| PAT-006 | Interfaces for component props | Patterns |
| PAT-008 | Tailwind CSS with CSS variables | Patterns |
| PAT-010 | Functional components with React hooks | Patterns |
| TST-001 | Test framework required | Tests |
| SEC-001 | Input validation and sanitization | Security |
| SEC-002 | Error boundaries for React components | Security |
| SEC-003 | Secure ID generation (UUID) | Security |
| SEC-004 | File validation before processing | Security |
| QUA-001 | ESLint configuration required | Quality |
| QUA-002 | Prettier formatting configured | Quality |
| QUA-003 | Pre-commit hooks for quality checks | Quality |

#### CMT-001 — Conventional Commits format required
- **Agente**: Commits
- **Severidade**: HIGH
- **Descrição**: Todos os commits devem seguir o formato Conventional Commits: `type(scope): description`
- **Evidência**: 96% dos commits já seguem este padrão (25/26 commits)
- **Faça**:
```
feat(sidebar): add FAQ navigation menu
fix(contact): resolve phone validation issue
docs(storybook): add component documentation
```
- **Evite**:
```
initial commit
updated stuff
fixed bug
```

#### CMT-003 — Commit messages in English
- **Agente**: Commits
- **Severidade**: HIGH
- **Descrição**: Mensagens de commit devem ser em inglês para consistência e colaboração internacional
- **Evidência**: Commits recentes misturam "add" e "Adiciona" - padrão precisa ser enforçado
- **Faça**:
```
feat(app): add contact deletion feature
fix: add SheetTitle for accessibility
```
- **Evite**:
```
feat: Adiciona componente HamburgerButton
fix: Adiciona SheetTitle e SheetDescription
```

#### PAT-001 — PascalCase for component filenames
- **Agente**: Patterns
- **Severidade**: HIGH
- **Descrição**: Arquivos de componentes React devem usar PascalCase
- **Evidência**: 100% dos componentes seguem este padrão (ContactPage.tsx, FAQPage.tsx, HamburgerButton.tsx, Sidebar.tsx)
- **Faça**:
```
components/ContactPage.tsx
components/HamburgerButton.tsx
components/ui/Sheet.tsx
```
- **Evite**:
```
components/contact-page.tsx
components/hamburger_button.tsx
components/ui/sheet.tsx
```

#### PAT-002 — camelCase for variables and functions
- **Agente**: Patterns
- **Severidade**: HIGH
- **Descrição**: Todas as variáveis, funções e constantes devem usar camelCase
- **Evidência**: 100% do código segue camelCase (handleContactClick, setContacts, loadContacts)
- **Faça**:
```typescript
const loadContacts = () => { ... };
const handleSave = () => { ... };
const editedContact = { ... };
```
- **Evite**:
```typescript
const LoadContacts = () => { ... };
const handle_save = () => { ... };
const edited_contact = { ... };
```

#### PAT-003 — Named exports for all components
- **Agente**: Patterns
- **Severidade**: HIGH
- **Descrição**: Componentes devem usar named exports para melhor tree-shaking e imports explícitos
- **Evidência**: 100% dos componentes usam `export function ComponentName()`
- **Faça**:
```typescript
export function ContactPage({ contact, onSave, onBack }: ContactPageProps) {
  // ...
}
```
- **Evite**:
```typescript
function ContactPage({ contact, onSave, onBack }: ContactPageProps) {
  // ...
}
export default ContactPage;
```

#### PAT-005 — 2-space indentation
- **Agente**: Patterns
- **Severidade**: HIGH
- **Descrição**: Todo o código deve usar 2 espaços para indentação (sem tabs)
- **Evidência**: 100% dos arquivos TypeScript/TSX usam 2 espaços
- **Faça**:
```typescript
export function Component() {
  const [state, setState] = useState(false);

  useEffect(() => {
    // 2 espaços por nível
  }, []);
}
```
- **Evite**:
```typescript
export function Component() {
    const [state, setState] = useState(false); // 4 espaços

    useEffect(() => {
        // tabs ou 4 espaços
    }, []);
}
```

#### PAT-006 — Interfaces for component props
- **Agente**: Patterns
- **Severidade**: HIGH
- **Descrição**: Todas as props de componentes devem ter interfaces TypeScript definidas
- **Evidência**: 100% dos componentes definem interfaces (ContactPageProps, FAQPageProps, SidebarProps, HamburgerButtonProps)
- **Faça**:
```typescript
interface ContactPageProps {
  contact?: Contact;
  onSave: (contact: Contact) => void;
  onBack: () => void;
}

export function ContactPage({ contact, onSave, onBack }: ContactPageProps) {
  // ...
}
```
- **Evite**:
```typescript
export function ContactPage({ contact, onSave, onBack }: { contact?: any, onSave: Function, onBack: Function }) {
  // Inline types, uso de any
}
```

#### PAT-008 — Tailwind CSS with CSS variables
- **Agente**: Patterns
- **Severidade**: HIGH
- **Descrição**: Styling deve usar Tailwind classes combinado com CSS variables para design tokens
- **Evidência**: 100% dos componentes usam `className` + `var(--primary)`, `var(--radius)`, etc.
- **Faça**:
```typescript
<div className="min-h-screen bg-background flex flex-col">
  <Button className="bg-primary text-primary-foreground" />
  <Input className="rounded-[var(--radius)]" />
</div>
```
- **Evite**:
```typescript
<div style={{ minHeight: "100vh", background: "#fff" }}>
  <Button style={{ backgroundColor: "blue", color: "white" }} />
</div>
```

#### PAT-010 — Functional components with React hooks
- **Agente**: Patterns
- **Severidade**: HIGH
- **Descrição**: Todos os componentes devem ser funcionais usando React hooks (useState, useEffect, useRef)
- **Evidência**: 100% dos componentes são funcionais com hooks, 0 class components
- **Faça**:
```typescript
export function ContactPage({ contact }: ContactPageProps) {
  const [editedContact, setEditedContact] = useState<Contact>(contact);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);
}
```
- **Evite**:
```typescript
class ContactPage extends React.Component {
  state = { ... };
  componentDidMount() { ... }
}
```

#### TST-001 — Test framework required
- **Agente**: Tests
- **Severidade**: HIGH
- **Descrição**: Projeto deve ter framework de testes configurado (Jest, Vitest, ou React Testing Library)
- **Evidência**: **MISSING** - package.json não inclui dependências de teste, nenhum arquivo *.test.tsx encontrado
- **Faça**:
```json
// package.json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```
- **Evite**:
```
// Nenhuma dependência de teste
// Sem arquivos *.test.tsx ou *.spec.tsx
```

#### SEC-001 — Input validation and sanitization
- **Agente**: Security
- **Severidade**: HIGH
- **Descrição**: Todos os inputs de usuário devem ser validados com schemas (Zod, Yup, ou class-validator)
- **Evidência**: Apenas `name.trim()` - sem validação de formato de email, phone, etc.
- **Faça**:
```typescript
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Nome obrigatório").trim(),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^\d{10,11}$/, "Telefone inválido"),
  img: z.string().optional(),
});

const handleSave = () => {
  const result = contactSchema.safeParse(editedContact);
  if (result.success) {
    onSave(result.data);
  }
};
```
- **Evite**:
```typescript
// Validação básica sem schema
if (editedContact.name && editedContact.name.trim()) {
  onSave(editedContact);  // Email e phone não validados
}
```

#### SEC-002 — Error boundaries for React components
- **Agente**: Security
- **Severidade**: HIGH
- **Descrição**: Componentes principais devem ter error boundaries para isolar falhas e evitar crash da aplicação
- **Evidência**: **MISSING** - Nenhum error boundary detectado no código
- **Faça**:
```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Algo deu errado. Tente recarregar a página.</div>;
    }
    return this.props.children;
  }
}

// App.tsx
<ErrorBoundary>
  <ContactPage />
</ErrorBoundary>
```
- **Evite**:
```typescript
// Componentes sem proteção contra crashes
<ContactPage />  // Se crashar, toda a app quebra
```

#### SEC-003 — Secure ID generation (UUID)
- **Agente**: Security
- **Severidade**: HIGH
- **Descrição**: IDs devem ser gerados com UUIDs (crypto.randomUUID() ou biblioteca uuid) ao invés de timestamps
- **Evidência**: Código atual usa `Date.now().toString()` que é previsível
- **Faça**:
```typescript
// Opção 1: Native crypto API (Node 15+, browsers modernos)
const newContact = {
  id: crypto.randomUUID(),  // "a3bb189e-8bf9-3888-9912-ace4e6543002"
  name: "...",
};

// Opção 2: Biblioteca uuid
import { v4 as uuidv4 } from "uuid";
const newContact = {
  id: uuidv4(),
  name: "...",
};
```
- **Evite**:
```typescript
const newContact = {
  id: Date.now().toString(),  // "1735545600000" - previsível, colisões possíveis
  name: "...",
};
```

#### SEC-004 — File validation before processing
- **Agente**: Security
- **Severidade**: HIGH
- **Descrição**: Arquivos de upload devem ser validados (tipo MIME, tamanho máximo, extensões permitidas) antes de processar
- **Evidência**: FileReader processa arquivos sem validação de size/type
- **Faça**:
```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validação de tipo
  if (!ALLOWED_TYPES.includes(file.type)) {
    alert("Apenas imagens JPEG, PNG e WebP são permitidas");
    return;
  }

  // Validação de tamanho
  if (file.size > MAX_FILE_SIZE) {
    alert("Arquivo muito grande. Máximo: 5MB");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setEditedContact({ ...editedContact, img: reader.result as string });
  };
  reader.readAsDataURL(file);
};
```
- **Evite**:
```typescript
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);  // Sem validação - aceita qualquer arquivo
  }
};
```

#### QUA-001 — ESLint configuration required
- **Agente**: Quality
- **Severidade**: HIGH
- **Descrição**: ESLint deve estar configurado para detectar problemas de código automaticamente
- **Evidência**: **MISSING** - package.json sem ESLint, sem .eslintrc
- **Faça**:
```json
// package.json
{
  "devDependencies": {
    "eslint": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0"
  },
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix"
  }
}
```
- **Evite**:
```
// Sem configuração de linting
// Problemas de código só detectados manualmente
```

#### QUA-002 — Prettier formatting configured
- **Agente**: Quality
- **Severidade**: HIGH
- **Descrição**: Prettier deve estar configurado para garantir formatação consistente automaticamente
- **Evidência**: Formatação manual consistente mas sem ferramenta automatizada
- **Faça**:
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}

// package.json
{
  "devDependencies": {
    "prettier": "^3.0.0"
  },
  "scripts": {
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,json,md}\""
  }
}
```
- **Evite**:
```
// Formatação manual inconsistente
// Cada desenvolvedor com estilo diferente
```

#### QUA-003 — Pre-commit hooks for quality checks
- **Agente**: Quality
- **Severidade**: HIGH
- **Descrição**: Pre-commit hooks devem rodar lint, format e type-check antes de cada commit
- **Evidência**: **MISSING** - Sem Husky, sem lint-staged
- **Faça**:
```json
// package.json
{
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0"
  },
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "tsc --noEmit"
    ]
  }
}

// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged
```
- **Evite**:
```
// Commits diretos sem validação
// Problemas de lint/formatação só detectados no PR
```

### MEDIUM

| ID | Título | Agente |
|----|--------|--------|
| CMT-002 | Use scopes when applicable | Commits |
| PAT-004 | Double quotes for strings | Patterns |
| PAT-007 | Event handlers use "handle" prefix | Patterns |
| TST-002 | Storybook stories for components | Tests |
| DOC-001 | Components documented in Storybook | Documentation |

#### CMT-002 — Use scopes when applicable
- **Agente**: Commits
- **Severidade**: MEDIUM
- **Descrição**: Commits devem incluir scopes quando a mudança se limita a um módulo/feature específico
- **Evidência**: 65% dos commits incluem scopes como (storybook), (stories), (sidebar), (app)
- **Faça**:
```
feat(contact): add phone number validation
fix(sidebar): resolve navigation bug
docs(storybook): update component documentation
chore(deps): upgrade React to 18.3.1
```
- **Evite**:
```
feat: add validation
fix: resolve bug
docs: update docs
```

#### PAT-004 — Double quotes for strings
- **Agente**: Patterns
- **Severidade**: MEDIUM
- **Descrição**: Strings devem usar aspas duplas para consistência
- **Evidência**: 100% do código usa double quotes em imports, classNames, literals
- **Faça**:
```typescript
import { useState } from "react";
const name = "John Doe";
<Button className="bg-primary" />
```
- **Evite**:
```typescript
import { useState } from 'react';
const name = 'John Doe';
<Button className='bg-primary' />
```

#### PAT-007 — Event handlers use "handle" prefix
- **Agente**: Patterns
- **Severidade**: MEDIUM
- **Descrição**: Funções de event handler devem usar prefixo "handle" para clareza
- **Evidência**: 100% dos handlers seguem padrão: handleSave, handleEdit, handleDelete, handleContactClick
- **Faça**:
```typescript
const handleSubmit = () => { ... };
const handleChange = (e: ChangeEvent) => { ... };
const handleClick = () => { ... };
```
- **Evite**:
```typescript
const onSubmit = () => { ... };
const changeHandler = () => { ... };
const clicked = () => { ... };
```

#### TST-002 — Storybook stories for components
- **Agente**: Tests
- **Severidade**: MEDIUM
- **Descrição**: Componentes visuais devem ter stories no Storybook para documentação e teste visual
- **Evidência**: 2 story files existem: Collapsible.stories.tsx, FAQPage.stories.tsx
- **Faça**:
```typescript
// components/ContactCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ContactCard } from "./ContactCard";

const meta: Meta<typeof ContactCard> = {
  title: "Components/ContactCard",
  component: ContactCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ContactCard>;

export const Default: Story = {
  args: {
    contact: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    },
  },
};
```
- **Evite**:
```
// Componentes sem documentação visual
// Sem stories para testar variações
```

#### DOC-001 — Components documented in Storybook
- **Agente**: Documentation
- **Severidade**: MEDIUM
- **Descrição**: Componentes principais devem ter documentação em Storybook com descrição, props e exemplos
- **Evidência**: Collapsible e FAQPage têm stories com documentação
- **Faça**:
```typescript
/**
 * ContactCard Component
 *
 * Displays contact information with avatar, name, email and phone.
 * Supports click interaction for contact details.
 *
 * Design System Compliance:
 * - Uses CSS variables for colors and spacing
 * - Tailwind utility classes for layout
 */
```
- **Evite**:
```typescript
// Componente sem documentação
function ContactCard() { ... }
```

### LOW

| ID | Título | Agente |
|----|--------|--------|
| PAT-009 | Direct imports (no barrel exports) | Patterns |
| DOC-002 | Feature documentation in markdown | Documentation |

#### PAT-009 — Direct imports (no barrel exports)
- **Agente**: Patterns
- **Severidade**: LOW
- **Descrição**: Imports devem ser diretos do arquivo específico ao invés de index.ts barrel exports
- **Evidência**: 100% dos imports são diretos, sem index.ts re-exports
- **Faça**:
```typescript
import { Button } from "./ui/button";
import { ContactPage } from "./ContactPage";
```
- **Evite**:
```typescript
// components/ui/index.ts
export * from "./button";
export * from "./input";

// Uso
import { Button } from "./ui";  // Evitar barrel exports
```

#### DOC-002 — Feature documentation in markdown
- **Agente**: Documentation
- **Severidade**: LOW
- **Descrição**: Features e mudanças significativas devem ser documentadas em arquivos markdown
- **Evidência**: 8 arquivos markdown existem: FAQ, CHANGELOG, guides, README
- **Faça**:
```markdown
// FEATURE-SIDEBAR.md
# Sidebar Navigation Feature

## Overview
Responsive sidebar with FAQ navigation and hamburger menu.

## Usage
...
```
- **Evite**:
```
// Features sem documentação
// Apenas código sem contexto
```

---

## Agentes de Review

Este repositório usa os seguintes agentes para review automatizado:

### Agentes Universais

#### Commits
- **Tipo**: Universal
- **Ativação**: Sempre ativo (analisa mensagens de commit, não arquivos)
- **Regras**: CMT-001, CMT-002, CMT-003
- **Descrição**: Valida formato de commits, uso de scopes e idioma das mensagens

#### Patterns
- **Tipo**: Universal
- **Ativação**: Qualquer arquivo TypeScript/TSX (*.ts, *.tsx)
- **Regras**: PAT-001, PAT-002, PAT-003, PAT-004, PAT-005, PAT-006, PAT-007, PAT-008, PAT-009, PAT-010
- **Descrição**: Valida convenções de código, naming, formatting, e padrões arquiteturais

#### Tests
- **Tipo**: Universal
- **Ativação**: Arquivos de código (*.ts, *.tsx) e testes (*.test.tsx, *.spec.tsx)
- **Regras**: TST-001, TST-002
- **Descrição**: Valida presença de testes e cobertura de componentes com Storybook

#### Security
- **Tipo**: Universal
- **Ativação**: Arquivos de código com inputs de usuário, file handling, ou geração de IDs
- **Regras**: SEC-001, SEC-002, SEC-003, SEC-004
- **Descrição**: Valida validação de inputs, error boundaries, geração segura de IDs e validação de arquivos

#### Quality
- **Tipo**: Universal
- **Ativação**: Arquivos de configuração (package.json, .eslintrc, .prettierrc) ou quando configuração está ausente
- **Regras**: QUA-001, QUA-002, QUA-003
- **Descrição**: Valida presença e configuração de ferramentas de qualidade (ESLint, Prettier, pre-commit hooks)

#### Documentation
- **Tipo**: Universal
- **Ativação**: Componentes (*.tsx) e arquivos markdown (*.md)
- **Regras**: DOC-001, DOC-002
- **Descrição**: Valida presença de documentação em Storybook e markdown para features

---

## Categorização de Arquivos

O engine de review classifica cada arquivo alterado em categorias para determinar quais agentes ativar:

| Categoria | Patterns | Exemplos |
|-----------|----------|----------|
| `react_component` | `*.tsx` em `components/`, `App.tsx` (exceto *.stories.tsx) | `components/ContactPage.tsx`, `App.tsx` |
| `ui_component` | `*.tsx` em `components/ui/` | `components/ui/sheet.tsx`, `components/ui/button.tsx` |
| `storybook_story` | `*.stories.tsx`, `*.stories.mdx` | `stories/Collapsible.stories.tsx`, `stories/FAQPage.stories.tsx` |
| `test` | `*.test.tsx`, `*.spec.tsx`, `__tests__/**/*.tsx` | `components/ContactPage.test.tsx` |
| `config` | `package.json`, `.eslintrc.*`, `.prettierrc`, `tsconfig.json`, `vite.config.ts` | `package.json`, `.eslintrc.json` |
| `docs` | `*.md`, `*.mdx` (exceto stories) | `README.md`, `CHANGELOG.md`, `FAQ.md` |
| `storybook_config` | `.storybook/*.ts` | `.storybook/main.ts`, `.storybook/preview.ts` |
| `flutter` | `*.dart`, `pubspec.yaml` em `agenda/` | `agenda/lib/main.dart`, `agenda/pubspec.yaml` |

---

## Matriz de Ativação

| Agente | Categorias Trigger | Sempre Ativo | Skip Quando |
|--------|--------------------|--------------|-------------|
| Commits | — | Sim | Nunca |
| Patterns | `react_component`, `ui_component`, `test` | Não | Apenas `docs`, `config`, `storybook_config`, `flutter` |
| Tests | `react_component`, `ui_component`, `test` | Não | Apenas `docs`, `config`, `storybook_config`, `storybook_story`, `flutter` |
| Security | `react_component`, `ui_component` | Não | `docs`, `config`, `storybook_config`, `storybook_story`, `test`, `flutter` |
| Quality | `config`, ou QUALQUER se QUA-001/QUA-002/QUA-003 ausentes | Sim se config ausente | `docs`, `storybook_story` se config OK |
| Documentation | `react_component`, `ui_component`, `storybook_story`, `docs` | Não | `config`, `test`, `flutter` |

---

## Padrões do Repositório

### Commits

**Format**: Conventional Commits `type(scope): description`

**Valid types**: feat, fix, docs, chore, refactor, test, style, perf, ci

**Scopes**: storybook, stories, sidebar, app, contact, ui (quando aplicável)

**Language**: English

**Examples**:
- `feat(contact): add phone number validation`
- `fix(sidebar): resolve navigation menu overlap`
- `docs(storybook): add ContactCard component story`
- `chore(deps): upgrade Tailwind to 4.0.0`

### Organização de Código

**Architecture**: Feature-based component organization

**Layers**:
- `/components` - Feature components (ContactPage, FAQPage, Sidebar)
- `/components/ui` - Reusable UI primitives (Button, Input, Sheet)
- `/stories` - Storybook story files
- `/.storybook` - Storybook configuration

**Naming**:
- Components: PascalCase (ContactPage.tsx)
- Variables/Functions: camelCase (handleSave, loadContacts)
- Event handlers: "handle" prefix (handleClick, handleSubmit)
- Interfaces: ComponentNameProps (ContactPageProps)

**Exports**: Named exports only (`export function ComponentName()`)

**Imports**: Direct imports from specific files (no barrel exports)

### Testes

**Framework**: Jest/Vitest + React Testing Library (a configurar)

**Patterns**:
- Test files: `*.test.tsx` ou `*.spec.tsx`
- Co-located with components ou em `__tests__/`
- Storybook stories for visual testing and documentation

**Coverage target**: >80% para componentes de negócio

### Styling

**Framework**: Tailwind CSS 4.0

**Pattern**: Utility classes + CSS variables

**Design tokens**:
- Colors: `--primary`, `--accent`, `--background`, `--foreground`, `--border`, `--muted`, `--card`
- Radius: `--radius`, `--radius-card`
- Typography: `--font-family-poppins`, `--text-2xl`, `--font-weight-semibold`

**Example**:
```tsx
<div className="min-h-screen bg-background flex flex-col">
  <Button className="bg-primary text-primary-foreground rounded-[var(--radius)]" />
</div>
```

### Error Handling

**Pattern**: Error boundaries for component isolation

**Error Boundary**: Implementar ErrorBoundary component wrapper

**Validation**: Zod ou Yup schemas para validação de inputs

**File uploads**: Validar tipo MIME, tamanho máximo, extensões permitidas

### Segurança

**Auth**: Frontend-only app, sem autenticação (local storage)

**Input Validation**: Zod schemas para todos os inputs de usuário

**ID Generation**: `crypto.randomUUID()` ou biblioteca `uuid`

**File Validation**: Validar tipo, tamanho e extensão antes de FileReader

---

## Arquivos de Referência

Arquivos canônicos que exemplificam os padrões deste repositório:

| Padrão | Arquivo Referência | Descrição |
|--------|--------------------|-----------|
| React functional component | `components/ContactPage.tsx` | Componente com useState, useEffect, useRef, interfaces |
| Event handlers | `App.tsx` | handleContactClick, handleSave, handleDelete com prefixo "handle" |
| Tailwind + CSS variables | `components/FAQPage.tsx` | className com utilities + inline style com var(--primary) |
| Storybook story | `stories/Collapsible.stories.tsx` | Story com Meta, StoryObj, args |
| Component with props interface | `components/Sidebar.tsx` | SidebarProps interface com todas as props tipadas |
| UI primitive wrapper | `components/ui/sheet.tsx` | Radix UI wrapper com Tailwind styling |

---

## Histórico de Alterações

| Data | Tipo | Descrição |
|------|------|-----------|
| 2026-03-04 | Criação | Guia gerado pelo inspira:code-review-setup com 24 regras (17 HIGH, 5 MEDIUM, 2 LOW) |
