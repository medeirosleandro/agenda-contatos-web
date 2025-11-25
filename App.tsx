import { useState, useEffect } from "react";
import { Plus, MoreVertical, User } from "lucide-react";
import { Button } from "./components/ui/button";
import { ContactCard } from "./components/ContactCard";
import { ContactOptionsSheet } from "./components/ContactOptionsSheet";
import { ContactPage } from "./components/ContactPage";
import { FAQPage } from "./components/FAQPage";
import { Sidebar } from "./components/Sidebar";
import { HamburgerButton } from "./components/HamburgerButton";
import { contactStorage, Contact } from "./lib/contactStorage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./components/ui/alert-dialog";

type OrderOptions = "orderAZ" | "orderZA";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showOptionsSheet, setShowOptionsSheet] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showFAQPage, setShowFAQPage] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const allContacts = contactStorage.getAll();
    setContacts(allContacts);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowOptionsSheet(true);
  };

  const handleCall = () => {
    if (selectedContact?.phone) {
      window.location.href = `tel:${selectedContact.phone}`;
    }
    setShowOptionsSheet(false);
  };

  const handleEdit = () => {
    setEditingContact(selectedContact || undefined);
    setShowOptionsSheet(false);
    setShowContactPage(true);
  };

  const handleDeleteClick = () => {
    setShowOptionsSheet(false);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedContact) {
      contactStorage.delete(selectedContact.id);
      loadContacts();
      setSelectedContact(null);
    }
    setShowDeleteDialog(false);
  };

  const handleAddNew = () => {
    setEditingContact(undefined);
    setShowContactPage(true);
  };

  const handleSaveContact = (contact: Contact) => {
    contactStorage.save(contact);
    loadContacts();
  };

  const handleOrder = (option: OrderOptions) => {
    const sorted = [...contacts];
    if (option === "orderAZ") {
      sorted.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    } else {
      sorted.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    }
    setContacts(sorted);
  };

  if (showContactPage) {
    return (
      <ContactPage
        contact={editingContact}
        onSave={handleSaveContact}
        onBack={() => setShowContactPage(false)}
      />
    );
  }

  if (showFAQPage) {
    return <FAQPage onBack={() => setShowFAQPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* AppBar */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <HamburgerButton
          className="text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setShowSidebar(true)}
        />
        <h1 className="text-primary-foreground text-center flex-1">Contatos</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <MoreVertical className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleOrder("orderAZ")}>
              Ordenar A-Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOrder("orderZA")}>
              Ordenar Z-A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Sidebar open={showSidebar} onOpenChange={setShowSidebar} onNavigateToFAQ={() => setShowFAQPage(true)} />

      {/* Content */}
      <div className="flex-1 p-4">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <User className="size-16 mb-4" />
            <p>Nenhum contato adicionado</p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-2">
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onClick={() => handleContactClick(contact)}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground"
        onClick={handleAddNew}
      >
        <Plus className="size-6" />
      </Button>

      {/* Contact Options Sheet */}
      <ContactOptionsSheet
        open={showOptionsSheet}
        onOpenChange={setShowOptionsSheet}
        contact={selectedContact}
        onCall={handleCall}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-[var(--radius-card)]">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Contato</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir {selectedContact?.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[var(--radius-button)]">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[var(--radius-button)]"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}