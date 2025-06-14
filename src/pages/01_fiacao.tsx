import Decoracoes from "../components/background";
import Cabecalho from "../components/Cabecalho";
import "../styles/variaveis.css";
import "../styles/Global.css";
import { Tittle } from "../components/Tittle";
import { CalculosFiacao } from "../features/Fiacao";

export function Fiacao() {
  return (
    <>
      <Cabecalho />
      <Decoracoes />
        <Tittle>Fiação</Tittle>
      <CalculosFiacao />
    </>
  );
}
