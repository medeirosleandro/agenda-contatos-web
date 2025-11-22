import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Save, Camera, Check, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  img?: string;
}

interface ContactPageProps {
  contact?: Contact;
  onSave: (contact: Contact) => void;
  onBack: () => void;
}

export function ContactPage({ contact, onSave, onBack }: ContactPageProps) {
  const [editedContact, setEditedContact] = useState<Contact>({
    id: contact?.id || Date.now().toString(),
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    img: contact?.img || "",
  });
  const [userEdited, setUserEdited] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    if (userEdited) {
      setShowDiscardDialog(true);
    } else {
      onBack();
    }
  };

  const handleSave = () => {
    if (editedContact.name && editedContact.name.trim()) {
      onSave(editedContact);
      onBack();
    } else {
      nameInputRef.current?.focus();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedContact({ ...editedContact, img: reader.result as string });
        setUserEdited(true);
      };
      reader.readAsDataURL(file);
    }
    setShowImageDialog(false);
  };

  const handleImageClick = () => {
    setShowImageDialog(true);
  };

  const openFileInput = () => {
    fileInputRef.current?.click();
    setShowImageDialog(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* AppBar */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/20"
          onClick={onBack}
        >
          <ArrowLeft className="size-6" />
        </Button>
        <h1 className="text-primary-foreground flex-1">
          {contact ? "Editar Contato" : "Novo Contato"}
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/20"
          onClick={handleSave}
        >
          <Check className="size-6" />
        </Button>
      </div>

      {/* Photo Section */}
      <div className="bg-primary p-8 flex justify-center">
        <div className="relative">
          {editedContact.img ? (
            <img
              src={editedContact.img}
              alt="Contact"
              className="size-32 rounded-full object-cover border-4 border-primary-foreground/20"
            />
          ) : (
            <div className="size-32 rounded-full bg-primary-foreground/20 flex items-center justify-center border-4 border-primary-foreground/20">
              <User className="size-16 text-primary-foreground" />
            </div>
          )}
          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            onClick={() => setShowImageDialog(true)}
          >
            <Camera className="size-5" />
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-6 max-w-2xl mx-auto w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Nome completo"
              value={editedContact.name}
              onChange={(e) => {
                setEditedContact({ ...editedContact, name: e.target.value });
                setUserEdited(true);
              }}
              className="bg-input-background border-border rounded-[var(--radius)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={editedContact.email}
              onChange={(e) => {
                setEditedContact({ ...editedContact, email: e.target.value });
                setUserEdited(true);
              }}
              className="bg-input-background border-border rounded-[var(--radius)]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={editedContact.phone}
              onChange={(e) => {
                setEditedContact({ ...editedContact, phone: e.target.value });
                setUserEdited(true);
              }}
              className="bg-input-background border-border rounded-[var(--radius)]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleBack}
              style={{
                borderRadius: 'var(--radius-button)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-family-poppins)',
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={handleSave}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                borderRadius: 'var(--radius-button)',
                fontFamily: 'var(--font-family-poppins)',
              }}
            >
              <Save className="size-5 mr-2" />
              Salvar Contato
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Discard Changes Dialog */}
      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent className="rounded-[var(--radius-card)]">
          <AlertDialogHeader>
            <AlertDialogTitle>Descartar Alterações</AlertDialogTitle>
            <AlertDialogDescription>
              Ao sair as alterações serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[var(--radius-button)]">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onBack} className="rounded-[var(--radius-button)]">Sim</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image Options Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-md rounded-[var(--radius-card)]">
          <DialogHeader>
            <DialogTitle>Escolher foto</DialogTitle>
            <DialogDescription>
              Selecione uma imagem da galeria para o contato
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              variant="ghost"
              className="justify-start rounded-[var(--radius-button)]"
              onClick={openFileInput}
            >
              <Camera className="size-5 mr-2" />
              Select from gallery
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}