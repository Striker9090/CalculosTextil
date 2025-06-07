import { BadgeHelp, FolderClosed, Home } from "lucide-react";
import { Links } from "../Utilitarios/Links";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import style from "./index.module.css"

export default function Cabecalho() {
  const [smarthfone, setSmarthfone] = useState(false);

  return (
    <>
      <div className="md:hidden text-(--tipografia-principal)">
        <button onClick={() => setSmarthfone(!smarthfone)}>

          {smarthfone?<IoMdClose size={40} className="m-5"/>:<FiMenu size={40} className="m-5" />}
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
      </div>

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
