// components/ContactCard.tsx
import React, { useMemo } from "react";
import { Contact } from "../lib/db";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Badge } from "./ui/badge";

type ContactCardProps = {
  contact: Contact;
  onDelete: (id: number) => void;
};

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  const imageUrl = useMemo(() => {
    if (contact.imageBlob) {
      return URL.createObjectURL(contact.imageBlob);
    }
    return null;
  }, [contact.imageBlob]);

  return (
    <div className="border rounded-lg shadow overflow-hidden">
      <div>
        <Button
          onClick={() => contact.id && onDelete(contact.id)}
          size="icon"
          className="absolute m-4 bg-red-500"
        >
          <Trash />
        </Button>
        <Badge variant="secondary" className="absolute m-4 right-4">
          {new Date(contact.date).toLocaleString()}
        </Badge>
        {imageUrl ? (
          <img src={imageUrl} alt="Contact" className="max-w-full h-auto" />
        ) : (
          <div className="bg-black h-18" />
        )}
      </div>
      {contact.note ? (
        <p className="p-4">{contact.note}</p>
      ) : (
        <p className="p-4 text-gray-500">Empty note.</p>
      )}
    </div>
  );
}
