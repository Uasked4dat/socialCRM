'use client'
import Map from "@/components/Map";
import ButtonAdd from "@/components/ButtonAdd";
import NavBar from "@/components/NavBar";
import MyDatePicker from "@/components/MyDatePicker";

export const dynamic = "force-dynamic";


// This is a private page: It's protected by the layout.tsx component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page


export default function Dashboard() {
  return (
    <main className="min-h-screen px-8 pb-12">
      <NavBar />
      <section className="h-[calc(100vh-5rem)] w-10/12 mx-auto">
        <div className="flex justify-between">
          <ButtonAdd />
          <MyDatePicker />
        </div>
        <Map />
      </section>
    </main>
  );
}
