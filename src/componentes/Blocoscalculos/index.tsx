import style from "../Blocoscalculos/index.module.css";
import { CalculoTitulo } from "./Titulacao/CalculoTitulacao";

export default function Bloco() {
  return (
    <div className={style.content}>
      <div className={style.bloco}>
        <CalculoTitulo />
      </div>
   
    
    </div>
  );
}
