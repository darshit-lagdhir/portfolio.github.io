import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/ui/CustomCursor";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";

export const metadata = {
  title: "Darshit Lagdhir — Digital Architect",
  description:
    "Creative Developer Portfolio of Darshit Lagdhir. Systems engineering meets high-fidelity digital performance.",
  openGraph: {
    title: "Darshit Lagdhir — Digital Architect",
    description: "Systems engineering meets high-fidelity digital performance.",
    url: "https://darshitlagdhir.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="selection:bg-neutral-800 selection:text-white" suppressHydrationWarning>
      <body className="bg-[#050505] text-neutral-50 transition-colors duration-[1500ms] antialiased overflow-x-hidden snap-y snap-mandatory scroll-smooth" suppressHydrationWarning>
        <ThemeProvider>
          <BrutalistNavbar />
          <CustomCursor />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
