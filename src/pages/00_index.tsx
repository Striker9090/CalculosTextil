import Decoracoes from "../components/background";
import Cabecalho from "../components/Cabecalho";
import Navegacao, {BlocosNavegacao} from "../components/Navegacao";
import "../styles/variaveis.css";
import "../styles/Global.css"


export default function App() {
  return (

    <>
      <Cabecalho />
      <Decoracoes/>
      <Navegacao/>
      <BlocosNavegacao/>
    </>
  );
}