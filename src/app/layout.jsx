import "../styles/globals.css"; // Asegúrate de que la ruta sea correcta

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
