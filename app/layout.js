import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/sessionWraper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Me A Chai-One Chai Please",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
  },
  description: "This website is crowdfunding platform for Chai creaters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>

          <div className=" relative min-h-screen bg-slate-950 text-white">
            <div className=" absolute z-0 inset-0 pointer-events-none bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[10px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="relative z-10">
              <Navbar />
              {children}
            </div>
          </div>
              <Footer />
        </SessionProvider>
      </body>

    </html>
  );
}
