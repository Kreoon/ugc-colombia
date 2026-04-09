import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problema } from "@/components/sections/Problema";
import { Solucion } from "@/components/sections/Solucion";
import { Casos } from "@/components/sections/Casos";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Solucion />
        <Casos />
      </main>
    </>
  );
}
