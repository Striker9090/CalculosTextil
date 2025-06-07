import { BadgeHelp, FolderClosed, Home } from "lucide-react";
import { Links } from "../Utilitarios/Links";
import { FiMenu } from "react-icons/fi"; // ícone dos 3 pontinhos
import { useState } from "react";

export default function Cabecalho() {
  const [smarthfone, setSmarthfone] = useState(false);

  return (
    <>
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
        <div className="md:hidden flex gap-20">
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
      <div className="md:hidden text-(--tipografia-principal)">
        <button onClick={() => setSmarthfone(!smarthfone)}>
          <FiMenu size={40} className="m-10" />
        </button>
      </div>
     
      
    </>
  );
}
