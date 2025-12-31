import Link from "next/link";

const headers = [
  { title: "About", href: "/about" },
  { title: "History", href: "/history" },
  { title: "Contact Us", href: "/contact-us" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center bg-white px-16 sm:items-start dark:bg-black">
        <div>
          <ul className="flex items-center gap-4 text-2xl font-bold">
            {headers.map(({ href, title }) => (
              <li key={href} className="hover:text-red-400">
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full items-center justify-center text-xl font-bold">
          This is Main Page
        </div>
      </main>
    </div>
  );
}
