import "./globals.css";
import BrutalistNavbar from "@/components/brutalist/BrutalistNavbar";

export const metadata = {
  title: "Darshit Lagdhir — Digital Architect",
  description:
    "Systems-focused developer portfolio. Modular logistics, advisory intelligence, and cross-language contract verification.",
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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased overflow-x-hidden selection:bg-foreground selection:text-background" suppressHydrationWarning>
        <div className="atmospheric-drift" />

        <BrutalistNavbar />
        <main className="relative z-10 w-full">{children}</main>
      </body>
    </html>
  );
}
