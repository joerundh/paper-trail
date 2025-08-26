import { currentUser } from "@clerk/nextjs/server";
import { ClerkProvider, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Paper Trail",
  description: "An app to store articles",
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
                <Link href={"/"} className={"hover:underline"}>About</Link>
                <Link href={"/latest"} className={"hover:underline"}>Latest</Link>
              </div>
              <div className={"flex flex-row gap-[10px]"}>
                {
                  user ? (
                    <>
                      <p>Welcome, <b>{}</b>!</p>
                      <SignOutButton>Sign out</SignOutButton>
                    </>
                  ) : (
                    <>
                      <SignInButton className={"hover:underline cursor-pointer"}>Sign in</SignInButton>
                      <SignUpButton className={"hover:underline cursor-pointer"}>Sign up</SignUpButton>
                    </>
                  )
                }
              </div>
            </nav>
            <div className={"p-[5px] flex flex-col gap-[10px] justify-center items-center"}>
              <h1 className={"flex flex-row gap-[10px] w-[95%]"}><Image src={"/paper-plane-icon.png"} alt={"Paper plane"} className={"invert"} width={50} height={50} /><p>Paper trail</p></h1>
              <h2 className={"w-[95%]"}>-- A tool to store article references</h2>
            </div>
          </header>
          <main>
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
