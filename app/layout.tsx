import "@/app/ui/global.css";
import { inter, comic_Neue } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
