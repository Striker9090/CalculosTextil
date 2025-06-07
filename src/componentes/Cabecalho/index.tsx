import { BadgeHelp, Bolt, Calculator, FolderClosed, Home } from "lucide-react";
import { Links } from "../Utilitarios/Links";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import style from "./index.module.css";
import { DiReact } from "react-icons/di";
import { SiWolframlanguage } from "react-icons/si";

export default function Cabecalho() {
  const [smarthfone, setSmarthfone] = useState(false);

  return (
    <>
      <div className="md:hidden text-(--tipografia-principal)">
        <button onClick={() => setSmarthfone(!smarthfone)}>
          {smarthfone ? (
            <IoMdClose size={40} className="m-5" />
          ) : (
            <FiMenu size={40} className="m-5" />
          )}
        </button>
      </div>

      {/* DESKTOP */}
      <div className="flex justify-center">
        <div className="hidden md:flex gap-20 m-5 px-5 py-1 bg-gray-300 w-fit rounded-3xl">
          <Links>
            <Home />
            Início
          </Links>
          <Links>
            <FolderClosed />
            Geral
          </Links>
          <Links>
            <BadgeHelp />
            Ajuda
          </Links>
        </div>
        <div className="absolute right-5 top-4 md:bg-gray-300 rounded-3xl">
          <Links>
            <Bolt className="md:text-black text-(--tipografia-principal)"/>
          </Links>
        </div>
      </div>


      <SiWolframlanguage size={35} className="md:hidden absolute top-5 left-[50%] text-(--tipografia-principal)  "/>
      {smarthfone && (
        <div className={`${style.link} md:hidden`}>
          <Links>
            <Home />
            Início
          </Links>
          <Links>
            <FolderClosed />
            Geral
          </Links>
          <Links>
            <BadgeHelp />
            Ajuda
          </Links>
        </div>
      )}
    </>
  );
}
