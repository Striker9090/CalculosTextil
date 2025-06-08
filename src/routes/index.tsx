import { Routes, Route, Link } from "react-router-dom";
import { Fiacao } from "../pages/01_fiacao"; // ou o caminho correto
import App from "../pages/00_index";
import { Tecelagem } from "../pages/02_tecelagem";
import { Malharia } from "../pages/03_malharia";
import { Beneficiamento } from "../pages/04_beneficiamento";

export default function Router() {
  return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/fiacao" element={<Fiacao />} />
        <Route path="/tecelagem" element={<Tecelagem />} />
        <Route path="/malharia" element={<Malharia />} />
        <Route path="/beneficiamento" element={<Beneficiamento />} />
      </Routes>
  );
}

type RoutesLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function RoutesLink({ to, children }: RoutesLinkProps) {
  return (
    <>
      <Link to={to}>{children}</Link>
    </>
  );
}
