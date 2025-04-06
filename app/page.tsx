// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ContactCard from "../components/ContactCard";
import { getAllContacts, deleteContact, Contact } from "../lib/db";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    const allContacts = await getAllContacts();
    setContacts(allContacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Fonction pour supprimer un contact et rafraîchir la liste
  const handleDelete = async (id: number) => {
    await deleteContact(id);
    fetchContacts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts history</h1>
      {contacts.length === 0 ? (
        <p>No contact saved.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <Link href="/new">
        <Button
          size="icon"
          className="fixed bottom-6 right-6 p-8 bg-blue-500 rounded-full shadow-xl"
        >
          <Plus />
        </Button>
      </Link>
      <p className="my-4 text-gray-500">Made with ❤️ by Antoine M.</p>
    </div>
  );
}
