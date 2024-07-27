import { Suspense } from 'react'
import Header from "@/components/Header";
import Problem from "@/components/Problem";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ButtonLead from '@/components/ButtonLead';
import Pricing from '@/components/Pricing';
import Testimonials3 from '@/components/Testimonials3';
import Hero from '@/components/Hero';
import WithWithout from '@/components/WithWithout';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        <WithWithout />
        <FAQ />
      </main>
      <Testimonials3 />
      <Pricing />
      <Footer />
    </>
  );
}
