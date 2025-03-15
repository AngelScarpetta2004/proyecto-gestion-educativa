import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import "../styles/global.css"; // Importa estilos globales

export default function RootLayout({ children }) {
  return <div className="layout">{children}</div>;
}


export function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
