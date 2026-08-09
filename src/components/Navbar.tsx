import Link from "next/link";
import { getSession } from "@/lib/auth";
import { NileLogo } from "@/components/NileLogo";
import SettingsMenu from "@/components/SettingsMenu";

export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="border-b bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <NileLogo />
          <span className="text-xl font-bold">Nile</span>
        </Link>
        <ul className="flex items-center gap-2 text-sm font-medium">
          <li>
            <Link href="/curriculum" className="hover:text-primary">Curriculum</Link>
          </li>
          <li>
            <Link href="/agent" className="hover:text-primary">Ask Nile</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
              </li>
              <li>
                <SettingsMenu name={session.name} email={session.email} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-primary">Login</Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary-hover"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
