import { CalculoTitulo } from "./Titulacao/CalculoTitulacao";
import style from "./index.module.css";

export function CalculosFiacao() {
  return (
    <>
      <div className={style.content}>
        <div className={style.bloco}>
          <CalculoTitulo />
        </div>
        
      </div>
    </>
  );
}
