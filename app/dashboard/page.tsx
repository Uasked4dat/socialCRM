import ButtonAccount from "@/components/ButtonAccount";
import Link from "next/link";
import Map from "@/components/Map";

export const dynamic = "force-dynamic";


// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page

// Requirements
// Side bar, able to add profiles
// Name, email, phone, instagram handle.
// Location city where they are in 
// Have snapshots of dates where you can show where everyone will be during that time.
// Have a way to add a new date and location.
// Have a way to add a new profile.
// Focus on the map feature, maybe look into mapbox.

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">Home</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <ButtonAccount />
          </ul>
        </div>
      </div>
      <section className="h-screen w-full">
        <Map />
      </section>
    </main>
  );
}
