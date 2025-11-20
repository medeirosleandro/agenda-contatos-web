import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { User, Phone, Settings, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-[280px] p-0 bg-card border-border"
        style={{
          borderRadius: 'var(--radius-card)',
        }}
      >
        {/* Hidden title and description for accessibility */}
        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
        <SheetDescription className="sr-only">
          Menu principal com opções de navegação da aplicação
        </SheetDescription>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div 
            className="text-sidebar-foreground p-6"
            style={{
              backgroundColor: 'var(--sidebar)',
              borderTopLeftRadius: 'var(--radius-card)',
              borderTopRightRadius: 'var(--radius-card)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-16 h-16 flex items-center justify-center"
                style={{
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <User className="size-8" style={{ color: 'var(--sidebar-foreground)' }} />
              </div>
              <div>
                <h2 
                  style={{
                    color: 'var(--sidebar-foreground)',
                    fontFamily: 'var(--font-family-poppins)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Agenda
                </h2>
                <p 
                  style={{
                    color: 'var(--sidebar-foreground)',
                    opacity: 0.8,
                    fontFamily: 'var(--font-family-source-sans)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Meus Contatos
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4">
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
              <Phone className="size-5 mr-3" style={{ color: 'var(--foreground)' }} />
              <span style={{
                fontFamily: 'var(--font-family-source-sans)',
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
              }}>
                Contatos
              </span>
            </Button>
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
              <Settings className="size-5 mr-3" style={{ color: 'var(--foreground)' }} />
              <span style={{
                fontFamily: 'var(--font-family-source-sans)',
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
              }}>
                Configurações
              </span>
            </Button>
            <Separator className="my-2" style={{ backgroundColor: 'var(--border)' }} />
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
              <Info className="size-5 mr-3" style={{ color: 'var(--foreground)' }} />
              <span style={{
                fontFamily: 'var(--font-family-source-sans)',
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
              }}>
                Sobre
              </span>
            </Button>
          </div>

          {/* Footer */}
          <div 
            className="p-4 text-center"
            style={{
              borderTop: '1px solid var(--border)',
            }}
          >
            <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
              Versão 1.0.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}