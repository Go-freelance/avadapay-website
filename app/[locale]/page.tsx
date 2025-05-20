import { Suspense } from "react";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Solutions from "@/components/sections/solutions";
import Benefits from "@/components/sections/benefits";
import Partners from "@/components/sections/partners";
// import Testimonials from "@/components/sections/testimonials"
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <Partners />
        <Features />
        <Solutions />
        <Benefits />
        {/* <Testimonials /> */}
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
