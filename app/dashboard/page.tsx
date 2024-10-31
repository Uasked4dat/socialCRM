'use client'
import Map from "@/components/Map";
import ButtonAdd from "@/components/ButtonAdd";
import NavBar from "@/components/NavBar";
import MyDatePicker from "@/components/MyDatePicker";
import JournalPage from "@/components/Dashboard";

export const dynamic = "force-dynamic";


// This is a private page: It's protected by the layout.tsx component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page


export default function Dashboard() {
  return (
    <main className="min-h-screen px-6 pb-12">
      <NavBar />
      <JournalPage />
      
    </main>
  );
}
