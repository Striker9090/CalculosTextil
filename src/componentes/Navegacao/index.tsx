import type React from "react";
import style from "./index.module.css";

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
      <div className={`${style.container}`}>
        <img src={src} alt={alt}/>
        <div className={`${style.overlay}`}>{title}</div>
      </div>
    );
  };

  return (
    <div className={style.Blocos}>
      <ImageCard src="./Fiacao.png" alt="Fiação" title="Fiação"/>
      <ImageCard src="./Tecelagem.png" alt="Tecelagem" title="Tecelagem"/>
      <ImageCard src="./Malharia.png" alt="Malharia" title="Malharia"/>
      <ImageCard src="./Beneficiamento.png" alt="Beneficiamento" title="Beneficiamento"/>
    </div>
  );
}
