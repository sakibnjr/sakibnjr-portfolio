import PointerWrapper from "@/components/core/PointerWrapper";
import Hero from "@/pages/Hero";
import About from "@/pages/About";
import SideNav from "@/components/core/SideNav";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <>
      <PointerWrapper />
      <SideNav />
      <main className="w-4/5 mx-auto selection:text-rose-500">
        <Hero />

        <About />

        <Projects />

        <Contact />

        <Footer />
      </main>
    </>
  );
};

export default Page;
