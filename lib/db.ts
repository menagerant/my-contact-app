// lib/db.ts
import { openDB, IDBPDatabase } from 'idb';

export interface Contact {
  id?: number;
  imageBlob: Blob | null;
  note: string;
  date: string;
}

const DB_NAME = 'contacts-db';
const STORE_NAME = 'contacts';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase>;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      },
    });
  }
  return dbPromise;
}

export async function saveContact(contact: Contact): Promise<number> {
  const db = await getDB();
  const id = await db.add(STORE_NAME, contact);
  return id as number;
}

export async function getAllContacts(): Promise<Contact[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

// Fonction pour supprimer un contact par son id
export async function deleteContact(id: number): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}