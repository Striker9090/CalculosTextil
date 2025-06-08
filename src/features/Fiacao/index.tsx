import { CalculoTitulo } from "./Titulacao/calculo";
import ConversorTitulo from "./Titulacao/conversor";
import style from "./calculo.module.css";

export function CalculosFiacao() {
  return (
    <>
      <div className={style.content}>
        <div className={style.bloco}>
          <CalculoTitulo />
        </div>
        <div className={style.bloco}>
          <ConversorTitulo />
        </div>
        
      </div>
    </>
  );
}
