import PointerWrapper from "@/components/core/PointerWrapper";
import Hero from "@/pages/Hero";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import SideNav from "@/components/core/SideNav";
import Projects from "@/pages/Projects";
import GithubActivity from "@/pages/GithubActivity";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/core/BackToTop";

const Page = () => {
  return (
    <>
      <PointerWrapper />
      <SideNav />
      <BackToTop />
      <main className="w-full md:w-11/12 lg:w-4/5 mx-auto selection:text-rose-500">
        <Hero />

        <About />

        <Experience />

        <Projects />

        <GithubActivity />

        <Blog />

        <Contact />

        <Footer />
      </main>
    </>
  );
};

export default Page;
