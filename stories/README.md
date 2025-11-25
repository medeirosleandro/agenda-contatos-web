# 📚 Storybook - Agenda de Contatos Web

Documentação completa de todos os componentes da aplicação de gerenciamento de contatos.

---

## 🎯 Visão Geral

Este Storybook contém:
- **17 stories** documentadas (10 FAQPage + 7 Collapsible)
- **Design System** completo com cores, tipografia e espaçamentos
- **Componentes UI** reutilizáveis
- **Componentes de Aplicação** específicos
- **Páginas Completas** incluindo FAQ

---

## 🗂️ Estrutura

### Design System
- **Cores**: Paleta completa baseada em variáveis CSS
- **Tipografia**: Poppins + Source Sans Pro

### UI Components
- Button (6 variantes)
- Input
- Card
- Dialog
- Avatar
- **Collapsible** ⭐ NOVO - Accordion expansível

### Application Components
- ContactCard
- ContactPage
- Sidebar
- HamburgerButton

### Pages ⭐ NOVO
- **FAQPage**: Página completa de FAQ com busca, top 5 e accordion

---

## 🚀 Como Usar

### Rodar Storybook
```bash
npm run storybook
```

### Build Storybook
```bash
npm run build-storybook
```

---

## 🎉 Novidades - FAQ Feature (v1.1.0)

### ✨ O Que Foi Adicionado

#### FAQPage Component
- 🔍 Busca em tempo real
- 🏆 Top 5 tópicos mais pesquisados
- 📑 12 perguntas pré-carregadas em 5 categorias
- 🎨 100% design system compliant
- ♿ WCAG AA acessível
- 📱 Responsivo (mobile, tablet, desktop)

#### Collapsible Component
- Accordion flexível
- Múltiplos itens abertos
- Animações suaves
- Customizável

### 📊 Stories Criadas

**FAQPage (10 stories):**
1. Default
2. Mobile View
3. Tablet View
4. Desktop View
5. Interactive ⭐ RECOMENDADO
6. Design System Colors
7. Typography Showcase
8. Accessibility
9. Empty Search Results
10. Documentação (FAQ.mdx)
11. Guia de Implementação (FAQGuide.mdx)

**Collapsible (7 stories):**
1. Basic
2. Multiple
3. With Accent Color
4. Simple Button
5. Initially Open
6. Mobile Optimized
7. Interactive

---

## 📖 Documentação Adicional

### Para a FAQ Feature

Consulte **[README-FAQ.md](./README-FAQ.md)** para:
- Guia rápido de referência
- Documentação técnica completa
- Guia de implementação prático
- Changelog detalhado
- Troubleshooting

### Links Úteis
- [FAQ.mdx](/story/pages-faqpage-documentação--page) - Docs técnica
- [FAQGuide.mdx](/story/pages-faqpage-guia-de-implementação--page) - Guia prático
- [FAQ-QUICK-REFERENCE.md](/FAQ-QUICK-REFERENCE.md) - Referência rápida
- [STORYBOOK-FAQ-UPDATE.md](/STORYBOOK-FAQ-UPDATE.md) - Resumo completo
- [CHANGELOG-FAQ.md](/CHANGELOG-FAQ.md) - Changelog

---

## 🎯 Próximos Passos

### Para Desenvolvedores
1. Explore as stories interativas
2. Leia a documentação MDX
3. Teste acessibilidade com o painel A11y
4. Use os controles para experimentar props

### Para Designers
1. Veja **Design System** → **Cores**
2. Explore **Design System** → **Tipografia**
3. Teste **FAQPage** → **Design System Colors**
4. Verifique **FAQPage** → **Typography Showcase**

### Para QA/Testers
1. Teste **FAQPage** → **Accessibility**
2. Verifique responsividade em **Mobile/Tablet/Desktop** stories
3. Teste **Interactive** stories
4. Use painel A11y para validações

---

## ✅ Compliance

- ✅ 100% Design System compliant
- ✅ Todas variáveis CSS de `/styles/globals.css`
- ✅ Zero hard-coded values
- ✅ WCAG AA acessibilidade
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Responsivo mobile/tablet/desktop

---

## 📞 Suporte

**Dúvidas sobre:**
- Componentes → Veja stories específicas
- FAQ Feature → Consulte [README-FAQ.md](./README-FAQ.md)
- Design System → Veja seção Design System no Storybook
- Implementação → Leia [FAQGuide.mdx](/story/pages-faqpage-guia-de-implementação--page)

---

**Versão:** 1.1.0  
**Data:** 25/11/2025  
**Status:** ✅ Production Ready

---

Feito com ❤️ usando React, TypeScript, Tailwind CSS v4, Shadcn/ui e Storybook
