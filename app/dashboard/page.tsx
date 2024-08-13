import ButtonAccount from "@/components/ButtonAccount";
import Link from "next/link";
import Map from "@/components/Map";
import Calendar from "@/components/Calendar";
import ThemeController from "@/components/ThemeController";

export const dynamic = "force-dynamic";


// This is a private page: It's protected by the layout.tsx component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page


export default function Dashboard() {
  return (
    <main className="min-h-screen px-8 pb-24">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">Home</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <ThemeController />
            <ButtonAccount />
          </ul>
        </div>
      </div>
      <section className="h-[calc(100vh-5rem)] w-10/12 mx-auto">
        <Calendar />
        <Map />
      </section>
    </main>
  );
}
