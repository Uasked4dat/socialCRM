'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavBar from "@/components/NavBar";
import ContactsPage from '@/components/CRM';

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen bg-base-200">
        <NavBar />
        <div className="container mx-auto">
          <ContactsPage />
        </div>
      </main>
    </DndProvider>
  );
}
