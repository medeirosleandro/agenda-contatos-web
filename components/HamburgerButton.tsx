import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface HamburgerButtonProps {
  onClick: () => void;
  className?: string;
}

export function HamburgerButton({ onClick, className = "" }: HamburgerButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`hover:bg-transparent ${className}`}
      style={{
        borderRadius: 'var(--radius-button)',
      }}
      aria-label="Abrir menu"
    >
      <Menu 
        className="size-6" 
        style={{ color: 'var(--primary-foreground)' }} 
      />
    </Button>
  );
}
