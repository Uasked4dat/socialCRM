import { Suspense } from 'react'
import Header from "@/components/Header";
import Problem from "@/components/Problem";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ButtonLead from '@/components/ButtonLead';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Problem />
        <FAQ />
      </main>
      <ButtonLead />
      <Footer />
    </>
  );
}
