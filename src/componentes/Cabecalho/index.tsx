import { BadgeHelp, FolderClosed, Home } from "lucide-react";
import { Links } from "../Utilitarios/Links";
import style from "./index.module.css";
import { FiMenu } from 'react-icons/fi'; // ícone dos 3 pontinhos



export default function Cabecalho() {
  return (
    <>
      <div className={style.background} ></div>
      <div className={style.navegacao}>
        <a className={style.title}>
          <img src="/Logo.svg"></img>Têxtil
        </a>
        <div className="hidden md:flex gap-20">
          <Links><Home/>Início</Links>
          <Links><FolderClosed/>Geral</Links>
          <Links><BadgeHelp/>Ajuda</Links>
        </div>
        <div className="md:hidden">
        <button>
          <FiMenu size={40} className="m-10" />
        </button>
      </div>
      </div>
    </>
  );
}
