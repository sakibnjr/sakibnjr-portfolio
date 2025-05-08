import Link from "next/link";
const page = () => {
  return (
    <main>
      <header>
        <nav>
          <ul>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Project</Link>
            <Link>Blog</Link>
            <Link>Contact</Link>
          </ul>
        </nav>
      </header>
    </main>
  );
};

export default page;
