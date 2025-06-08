import { Routes, Route, Link } from 'react-router-dom';
import {Fiacao} from '../pages/01_fiacao'; // ou o caminho correto
import App from '../pages/00_index'
import { Tecelagem } from '../pages/02_tecelagem';
import { Malharia } from '../pages/03_malharia';
import { Beneficiamento } from '../pages/04_beneficiamento';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path="/fiacao" element={<Fiacao />} /> {/* <-- Aqui está sua rota */}
      <Route path="/tecelagem" element={<Tecelagem />} /> {/* <-- Aqui está sua rota */}
      <Route path="/malharia" element={<Malharia />} /> {/* <-- Aqui está sua rota */}
      <Route path="/beneficiamento" element={<Beneficiamento />} /> {/* <-- Aqui está sua rota */}
    </Routes>
  );
}

type RoutesLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function RoutesLink({to, children}: RoutesLinkProps){
    return(
        <>
            <Link to={to}>{children}</Link>
        </>
    )
}