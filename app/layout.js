import { currentUser } from "@clerk/nextjs/server";
import { ClerkProvider, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { Geist, Geist_Mono, Libertinus_Math } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libertinusMath = Libertinus_Math({
  variable: "--font-libertinus-math",
  subsets: [ "latin" ],
  weight: [ "400" ],
});

export const metadata = {
  title: "Paper Trail",
  description: "An app to store and share article links",
};

export default async function RootLayout({ children }) {
  const user = await currentUser() || null;

  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header>
            <nav className={"flex flex-row justify-between"}>
              <div className={"flex flex-row gap-[10px]"}>
                <Link href={"/"} className={"hover:underline"} title="About Paper Trail">About</Link>
                <Link href={"/latest"} className={"hover:underline"} title="Latest entries">Latest</Link>
              </div>
              <div className={"flex flex-row gap-[10px]"}>
                {
                  user ? (
                    <>
                      <Link href="/add" title="Add a new entry">New entry</Link>
                      <Link href={"/user"} className={"cursor-pointer hover:underline"} title="My entries">My entries</Link>
                      <SignOutButton className={"hover:underline cursor-pointer"} title="Sign out">Sign out</SignOutButton>
                    </>
                  ) : (
                    <>
                      <SignInButton className={"hover:underline cursor-pointer"} title="Sign in to Paper Trail">Sign in</SignInButton>
                      <SignUpButton className={"hover:underline cursor-pointer"} title="Sign up to Paper Trail">Sign up</SignUpButton>
                    </>
                  )
                }
              </div>
            </nav>
            <div className={"p-[5px] flex flex-col gap-[10px] justify-center items-center"}>
              <h1 className={`flex flex-row gap-[10px] w-[95%] ${libertinusMath.variable}`} style={{ textShadow: "3px 3px 0 black" }}>
                <Image src={"/paper-plane-icon.png"} alt={"Paper plane"} className={"invert"} width={50} height={50} />
                <p>Paper Trail</p>
              </h1>
              <h2 className={"ml-[60px] w-[95%]"} style={{ textShadow: "2px 2px 0 black" }}>&mdash; A tool to store and share article links</h2>
            </div>
          </header>
          <main className={"flex flex-col gap-[10px]"}>
            {
              children
            }
          </main>
          <footer>2025 No rights reserved</footer>
        </body>
      </ClerkProvider>
    </html>
  );
}
