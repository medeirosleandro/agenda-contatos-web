# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**agenda-contatos-web** is a contact management web application built with React 18 + TypeScript + Vite. The project includes both a web interface (React) and a mobile application (Flutter).

## Technology Stack

- **Frontend**: React 18.3.1, TypeScript 5.7.2, Vite 6.0.7
- **Styling**: Tailwind CSS 4.0.0 with CSS variables design tokens
- **UI Components**: Radix UI primitives with custom wrappers (shadcn/ui style)
- **Icons**: Lucide React 0.487.0
- **Component Documentation**: Storybook 8.5.0
- **Mobile**: Flutter (Dart) in `/agenda` directory

## Code Review

@skills/code-review/SKILL.md

## Development Guidelines

### Code Conventions

1. **File Naming**: PascalCase for components (`ContactPage.tsx`, `FAQPage.tsx`)
2. **Variables/Functions**: camelCase (`handleSave`, `loadContacts`)
3. **Event Handlers**: Use "handle" prefix (`handleClick`, `handleSubmit`)
4. **Exports**: Named exports only (`export function ComponentName()`)
5. **Props**: TypeScript interfaces for all component props (`ContactPageProps`)
6. **Indentation**: 2 spaces (no tabs)
7. **Quotes**: Double quotes for strings
8. **Components**: Functional components with React hooks only

### Commit Messages

Follow Conventional Commits format in English:
- Format: `type(scope): description`
- Types: feat, fix, docs, chore, refactor, test, style, perf, ci
- Scopes: storybook, stories, sidebar, app, contact, ui
- Example: `feat(contact): add phone number validation`

### Styling

- Use Tailwind CSS utility classes combined with CSS variables
- Design tokens: `--primary`, `--accent`, `--background`, `--foreground`, `--border`, `--radius`
- Example: `className="bg-primary text-primary-foreground rounded-[var(--radius)]"`

### Quality Tools (To Configure)

- **ESLint**: Required for code quality checks
- **Prettier**: Required for consistent formatting
- **Pre-commit Hooks**: Husky + lint-staged for automated validation
- **Tests**: Jest/Vitest + React Testing Library (to be configured)

### Security Requirements

- **Input Validation**: Use Zod or Yup schemas for all user inputs
- **Error Boundaries**: Implement for component isolation
- **ID Generation**: Use `crypto.randomUUID()` instead of timestamps
- **File Uploads**: Validate type, size, and extensions before processing

## Repository Structure

```
/components          # Feature components
  /ui               # Reusable UI primitives
/stories            # Storybook story files
/.storybook         # Storybook configuration
/agenda             # Flutter mobile app
  /lib              # Dart source files
  /ui               # Flutter UI pages
```

## Before Opening a PR

1. ✅ Run code review: Use `inspira:code-review` skill
2. ✅ Check CODE_REVIEW_GUIDE.md for all rules
3. ✅ Ensure commits follow Conventional Commits format in English
4. ✅ Add tests for new components (when test framework configured)
5. ✅ Add Storybook stories for visual components
6. ✅ Validate inputs with Zod/Yup schemas
7. ✅ Use UUIDs for ID generation
8. ✅ Validate file uploads

## Reference Files

- **Component Pattern**: `components/ContactPage.tsx` - Functional component with hooks, interfaces, event handlers
- **Styling Pattern**: `components/FAQPage.tsx` - Tailwind + CSS variables usage
- **Storybook Story**: `stories/Collapsible.stories.tsx` - Component documentation
- **UI Primitive**: `components/ui/sheet.tsx` - Radix UI wrapper pattern
