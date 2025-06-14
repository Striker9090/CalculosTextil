import Cabecalho from "../../components/Cabecalho";
import Decoracoes from "../../components/background";
import { Tittle } from "../../components/Tittle";
import { Links } from "../../components/Utilitarios/Links";
import { ChevronRight } from "lucide-react";
import { RoutesLink } from "../../routes";

export default function Geral() {
  return (
    <>
      <Cabecalho />
      <Decoracoes />
      <Tittle>Geral</Tittle>
      <div className="flex max-w-[150px] p-2 mx-10 mt-5 items-center flex-col gap-2 text-gray-700 bg-gray-300">
        <RoutesLink to="/geral/cronometro"><Links><ChevronRight />Cronômetro</Links></RoutesLink>
      </div>
    </>
  );
}
