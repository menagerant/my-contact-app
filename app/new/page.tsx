// app/new/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveContact } from "../../lib/db";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NewContact() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [note, setNote] = useState("");

  // Essai d'ouverture automatique de la caméra
  useEffect(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageBlob(file);
    }
  };

  const handleSave = async () => {
    await saveContact({
      imageBlob,
      note,
      date: new Date().toISOString(),
    });
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New contact</h1>
      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
        className="hidden"
      />
      {!imageBlob && (
        <div className="mb-4">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-8"
          >
            Take a picture
          </Button>
        </div>
      )}
      {imageBlob && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(imageBlob)}
            alt="Contact"
            className="max-w-full h-auto mb-4"
          />
        </div>
      )}
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border p-2 mb-4"
        rows={5}
        placeholder="Type your notes here."
      ></Textarea>
      <Button onClick={handleSave} className="w-full p-8 bg-blue-500">
        Save contact
      </Button>
    </div>
  );
}
