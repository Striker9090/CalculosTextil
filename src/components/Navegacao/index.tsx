import type React from "react";
import style from "./index.module.css";
import { RoutesLink } from "../../routes";

export default function Navegacao() {
  return (
    <>
      <div className="flex items-center text-(--tipografia-principal) text-5xl font-[600] justify-center text-center mt-15 mb-5">
        <div>Calculadora Têxtil</div>
      </div>
      <div className="flex justify-center">
        <p className="text-(--tipografia-principal) text-xl text-center w-fit">
          Calculadora têxtil para calculos técnicos para todos os processos.
        </p>
      </div>
    </>
  );
}

export function BlocosNavegacao() {
  const ImageCard = ({ src, alt, title }: React.ComponentProps<"img">) => {
    return (
      <a className={`${style.container}`}>
        <img src={src} alt={alt}/>
        <div className={`${style.overlay}`}>{title}</div>
      </a>
    );
  };

  return (
    <div className={style.Blocos}>

      <RoutesLink to="/fiacao"><ImageCard  src="./Fiacao.png" alt="Fiação" title="Fiação"/></RoutesLink>
      <RoutesLink to="/tecelagem"><ImageCard src="./Tecelagem.png" alt="Tecelagem" title="Tecelagem"/></RoutesLink>
      <RoutesLink to="/malharia"><ImageCard src="./Malharia.png" alt="Malharia" title="Malharia"/></RoutesLink>
      <RoutesLink to="/beneficiamento"><ImageCard src="./Beneficiamento.png" alt="Beneficiamento" title="Beneficiamento"/></RoutesLink>
    </div>
  );
}
