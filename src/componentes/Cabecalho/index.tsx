import { BadgeHelp, FolderClosed, Home } from "lucide-react";
import { Links } from "../Utilitarios/Links";
import style from "./index.module.css";

export default function Cabecalho() {
  return (
    <>
      <div className={style.background} ></div>
      <div className={style.navegacao}>
        <a className={style.title}>
          <img src="/src/imagens/Logo.svg"></img>Têxtil
        </a>
        <div className={style.elements}>
          <Links><Home/>Home</Links>
          <Links><FolderClosed/>Geral</Links>
          <Links><BadgeHelp/>Ajuda</Links>
        </div>
      </div>
    </>
  );
}
