import ButtonAccount from "@/components/ButtonAccount";
import Link from "next/link";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
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
      <section className="max-w-xl mx-auto space-y-8">
        
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
      </section>
    </main>
  );
}
