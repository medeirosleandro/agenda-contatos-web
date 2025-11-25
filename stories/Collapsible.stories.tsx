import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { Button } from "../components/ui/button";

/**
 * Collapsible Component
 * 
 * An interactive component that can hide and show content. Used extensively
 * in the FAQ page for expandable question/answer sections.
 * 
 * Design System Compliance:
 * - Uses CSS variables for colors and spacing
 * - Typography follows Poppins/Source Sans Pro standards
 * - Border radius and shadows from design tokens
 * - Fully accessible with keyboard navigation
 */
const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Collapsible component is a flexible container that can expand and collapse content. It's perfect for FAQs, accordions, and any content that needs to be optionally hidden.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic Collapsible
 * 
 * A simple collapsible with a button trigger and expandable content.
 * Uses design system colors and typography.
 */
export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[400px]">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <CollapsibleTrigger asChild>
              <button
                className="w-full p-4 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors"
              >
                <span
                  style={{
                    fontFamily: "var(--font-family-poppins)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--foreground)",
                  }}
                >
                  Como adicionar um novo contato?
                </span>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {isOpen ? (
                    <ChevronUp className="size-5" />
                  ) : (
                    <ChevronDown className="size-5" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div
                className="px-4 pb-4 pt-2"
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-family-source-sans)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--card-foreground)",
                    lineHeight: "1.6",
                  }}
                >
                  Para adicionar um novo contato, clique no botão de adicionar (+) localizado
                  no canto inferior direito da tela. Preencha as informações solicitadas como
                  nome, telefone e email, e depois clique em salvar.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    );
  },
};

/**
 * Multiple Collapsibles
 * 
 * Shows how multiple collapsible components work together.
 * This pattern is used in the FAQ page where multiple items
 * can be expanded simultaneously.
 */
export const Multiple: Story = {
  render: () => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const faqs = [
      {
        id: "1",
        question: "Como adicionar um novo contato?",
        answer: "Para adicionar um novo contato, clique no botão de adicionar (+) localizado no canto inferior direito da tela.",
      },
      {
        id: "2",
        question: "Como editar informações de um contato?",
        answer: "Toque no contato que deseja editar para abrir suas opções. Em seguida, selecione 'Editar' no menu que aparece.",
      },
      {
        id: "3",
        question: "Como excluir um contato?",
        answer: "Para excluir um contato, toque nele para abrir o menu de opções e selecione 'Excluir'. Uma confirmação será solicitada.",
      },
    ];

    const toggleItem = (id: string) => {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <div className="w-[500px] space-y-3">
        {faqs.map((faq) => (
          <Collapsible
            key={faq.id}
            open={openItems.includes(faq.id)}
            onOpenChange={() => toggleItem(faq.id)}
          >
            <div
              style={{
                backgroundColor: "var(--card)",
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full p-4 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors">
                  <span
                    style={{
                      fontFamily: "var(--font-family-poppins)",
                      fontSize: "var(--text-base)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--foreground)",
                    }}
                  >
                    {faq.question}
                  </span>
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: "var(--muted)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="size-5" />
                    ) : (
                      <ChevronDown className="size-5" />
                    )}
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div
                  className="px-4 pb-4 pt-2"
                  style={{
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-family-source-sans)",
                      fontSize: "var(--text-base)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--card-foreground)",
                      lineHeight: "1.6",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    );
  },
};

/**
 * With Custom Styling
 * 
 * Demonstrates how the collapsible can be styled with accent colors
 * and different visual treatments while maintaining design system compliance.
 */
export const WithAccentColor: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[400px]">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "var(--radius-card)",
              border: `2px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}
          >
            <CollapsibleTrigger asChild>
              <button
                className="w-full p-4 flex items-center justify-between gap-3 transition-colors"
                style={{
                  backgroundColor: isOpen ? "var(--accent)" : "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-family-poppins)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: isOpen ? "var(--accent-foreground)" : "var(--foreground)",
                  }}
                >
                  Pergunta com destaque
                </span>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: isOpen ? "rgba(255, 255, 255, 0.2)" : "var(--muted)",
                    color: isOpen ? "var(--accent-foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {isOpen ? (
                    <ChevronUp className="size-5" />
                  ) : (
                    <ChevronDown className="size-5" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div
                className="px-4 pb-4 pt-2"
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-family-source-sans)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--card-foreground)",
                    lineHeight: "1.6",
                  }}
                >
                  Este exemplo mostra como o collapsible pode ser estilizado com cores
                  de destaque quando expandido, mantendo a consistência com o design system.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    );
  },
};

/**
 * Simple Button Trigger
 * 
 * A minimal example using a simple button as the trigger.
 * Perfect for less complex use cases.
 */
export const SimpleButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[350px] space-y-2">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between"
              style={{
                borderRadius: "var(--radius-button)",
              }}
            >
              <span>Mostrar mais informações</span>
              {isOpen ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div
              className="p-4 mt-2"
              style={{
                backgroundColor: "var(--muted)",
                borderRadius: "var(--radius)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-family-source-sans)",
                  fontSize: "var(--text-sm)",
                  color: "var(--foreground)",
                }}
              >
                Conteúdo adicional que pode ser mostrado ou oculto conforme necessário.
                Ideal para informações complementares ou detalhes extras.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

/**
 * Initially Open
 * 
 * Demonstrates a collapsible that starts in the open state.
 * Useful when you want to draw attention to important content initially.
 */
export const InitiallyOpen: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="w-[400px]">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full p-4 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors">
                <span
                  style={{
                    fontFamily: "var(--font-family-poppins)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--foreground)",
                  }}
                >
                  ⭐ Pergunta Importante
                </span>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {isOpen ? (
                    <ChevronUp className="size-5" />
                  ) : (
                    <ChevronDown className="size-5" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div
                className="px-4 pb-4 pt-2"
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-family-source-sans)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--card-foreground)",
                    lineHeight: "1.6",
                  }}
                >
                  Este collapsible começa aberto para destacar conteúdo importante que
                  os usuários devem ver imediatamente.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    );
  },
};

/**
 * Mobile Optimized
 * 
 * Shows the collapsible optimized for mobile devices with
 * appropriate touch targets and spacing.
 */
export const MobileOptimized: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[320px]">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div
            style={{
              backgroundColor: "var(--card)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full p-5 flex items-center justify-between gap-3 active:bg-muted/70 transition-colors">
                <span
                  style={{
                    fontFamily: "var(--font-family-poppins)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--foreground)",
                    textAlign: "left",
                  }}
                >
                  Pergunta para mobile
                </span>
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {isOpen ? (
                    <ChevronUp className="size-6" />
                  ) : (
                    <ChevronDown className="size-6" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div
                className="px-5 pb-5 pt-3"
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-family-source-sans)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--card-foreground)",
                    lineHeight: "1.6",
                  }}
                >
                  Touch targets maiores (44px min) e espaçamento generoso para
                  melhor usabilidade em dispositivos móveis.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
