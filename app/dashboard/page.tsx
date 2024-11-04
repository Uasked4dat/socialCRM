'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavBar from "@/components/NavBar";
import QuickAdd from "@/components/QuickAdd";
import ContactsTable from "@/components/ContactsTable";
import ContactsPage from '@/components/ContactsPage';

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen px-6 pb-12">
        <NavBar />
        <ContactsPage />
      </main>
    </DndProvider>
  );
}
