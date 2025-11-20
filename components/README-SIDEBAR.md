# Componentes do Menu Hamburger

Este documento descreve os componentes do menu hamburger (sidebar) implementados na aplicação.

## Componentes

### 1. **Sidebar** (`/components/Sidebar.tsx`)

Menu lateral deslizante que aparece ao clicar no botão hamburger.

#### Props

```typescript
interface SidebarProps {
  open: boolean;           // Controla se o menu está aberto
  onOpenChange: (open: boolean) => void;  // Callback quando o estado muda
}
```

#### Características

- **Slide-in da esquerda**: Animação suave ao abrir/fechar
- **Design System**: Usa todas as variáveis CSS do design system
- **Seções**:
  - Header com avatar e título "Agenda"
  - Itens de menu (Contatos, Configurações, Sobre)
  - Footer com versão da aplicação

#### Cores do Design System

- Background do header: `var(--sidebar)` - rgba(11, 73, 135, 1.00)
- Texto do header: `var(--sidebar-foreground)` - rgba(255, 255, 255, 1.00)
- Background dos itens: `var(--card)` - rgba(255, 255, 255, 1.00)
- Hover: `rgba(var(--color-accent), 0.1)` - Accent com 10% de opacidade

#### Tipografia

- **Título "Agenda"**: Poppins, semibold (600), 24px
- **Subtítulo "Meus Contatos"**: Source Sans Pro, regular (400), 13px
- **Itens do menu**: Source Sans Pro, regular (400), 16px
- **Versão (footer)**: Poppins, regular (400), 11px (classe `.caption`)

#### Exemplo de Uso

```tsx
import { Sidebar } from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <button onClick={() => setShowSidebar(true)}>
        Abrir Menu
      </button>
      
      <Sidebar 
        open={showSidebar} 
        onOpenChange={setShowSidebar} 
      />
    </div>
  );
}
```

---

### 2. **HamburgerButton** (`/components/HamburgerButton.tsx`)

Botão para abrir o menu lateral.

#### Props

```typescript
interface HamburgerButtonProps {
  onClick: () => void;     // Callback ao clicar
  className?: string;      // Classes CSS adicionais (opcional)
}
```

#### Características

- **Ícone**: Usa `Menu` do lucide-react
- **Acessibilidade**: `aria-label="Abrir menu"`
- **Border Radius**: `var(--radius-button)` (8px)
- **Cor**: `var(--primary-foreground)` (branco)

#### Exemplo de Uso

```tsx
import { HamburgerButton } from "./components/HamburgerButton";

function Header() {
  return (
    <header className="bg-primary p-4">
      <HamburgerButton
        className="text-primary-foreground hover:bg-primary-foreground/20"
        onClick={() => setShowSidebar(true)}
      />
    </header>
  );
}
```

---

## Integração no App

O menu hamburger está integrado no `App.tsx` da seguinte forma:

```tsx
export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header com botão hamburger */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <HamburgerButton
          className="text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setShowSidebar(true)}
        />
        <h1 className="text-primary-foreground text-center flex-1">Contatos</h1>
        {/* ... outros elementos do header ... */}
      </div>

      {/* Sidebar */}
      <Sidebar open={showSidebar} onOpenChange={setShowSidebar} />

      {/* ... resto do conteúdo ... */}
    </div>
  );
}
```

---

## Customização

### Adicionar Novos Itens ao Menu

Para adicionar novos itens ao menu, edite o arquivo `/components/Sidebar.tsx`:

```tsx
<Button
  variant="ghost"
  className="w-full justify-start px-6 py-3 h-auto"
  style={{
    borderRadius: 0,
    transition: 'background-color 0.2s',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(var(--color-accent), 0.1)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  }}
>
  <IconName className="size-5 mr-3" style={{ color: 'var(--foreground)' }} />
  <span style={{
    fontFamily: 'var(--font-family-source-sans)',
    fontSize: 'var(--text-base)',
    color: 'var(--foreground)',
  }}>
    Nome do Item
  </span>
</Button>
```

### Alterar Cores

Todas as cores do sidebar são controladas pelas variáveis CSS em `/styles/globals.css`:

```css
/* Cores do sidebar */
--sidebar: rgba(11, 73, 135, 1.00);
--sidebar-foreground: rgba(255, 255, 255, 1.00);
--sidebar-accent: rgba(19, 171, 245, 1.00);
--sidebar-border: rgba(24, 87, 150, 1.00);
```

Basta alterar essas variáveis para mudar as cores do sidebar em toda a aplicação.

---

## Acessibilidade

- ✅ Botão com `aria-label` descritivo
- ✅ Navegação por teclado suportada (Tab, Enter, Escape)
- ✅ Foco visível nos itens do menu
- ✅ Contraste adequado (WCAG AAA)
- ✅ Ícones com significado semântico
- ✅ SheetTitle e SheetDescription para leitores de tela

---

## Responsividade

O sidebar é totalmente responsivo:

- **Mobile**: Largura de 280px, overlay sobre o conteúdo
- **Desktop**: Mesmo comportamento, pode ser adaptado para ficar fixo se desejado
- **Animações**: Suaves em todos os dispositivos

---

## Tecnologias Utilizadas

- **React**: Componentes funcionais com hooks
- **Shadcn/ui**: Componente `Sheet` como base
- **Lucide React**: Ícones (Menu, User, Phone, Settings, Info)
- **Tailwind CSS v4**: Estilização com variáveis CSS
- **Design System**: Variáveis CSS customizadas (cores, tipografia, espaçamentos)
