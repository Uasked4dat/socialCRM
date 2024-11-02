'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavBar from "@/components/NavBar";
import QuickAdd from "@/components/QuickAdd";
import ContactsTable from "@/components/ContactsTable";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen px-6 pb-12">
        <NavBar />
        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <ContactsTable />
          </div>
          <div className="flex-1">
            <QuickAdd />
          </div>
        </div>
      </main>
    </DndProvider>
  );
}
