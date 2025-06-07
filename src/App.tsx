import Decoracoes from "./componentes/Fundo";
import Cabecalho from "./componentes/Cabecalho";
import Navegacao, {BlocosNavegacao} from "./componentes/Navegacao";
import "./estilos/variaveis.css";

function App() {
  return (
    <>
      <Cabecalho />
      <Decoracoes/>
      <Navegacao/>
      <BlocosNavegacao/>
    </>
  );
}

export default App;
