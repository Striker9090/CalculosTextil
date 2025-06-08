import { BadgeHelp, Bolt, FolderClosed, Home } from "lucide-react";
import { Links } from "../Utilitarios/Links";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import style from "./index.module.css";
import { SiWolframlanguage } from "react-icons/si";
import { RoutesLink } from "../../routes";

export default function Cabecalho() {
  const [smartphone, setSmarthfone] = useState(false);

  return (
    <>
      <div className="md:hidden text-[var(--tipografia-principal)]">
        <button onClick={() => setSmarthfone(!smartphone)}>
          {smartphone ? (
            <IoMdClose size={35} className="m-5" />
          ) : (
            <FiMenu size={35} className="m-5" />
          )}
        </button>
      </div>

      {/* DESKTOP */}
      <div className="flex justify-center">
        <div className="hidden md:flex gap-20 m-5 px-5 py-1 bg-gray-300 w-fit rounded-3xl">
          <RoutesLink to="/">
            <Links>
              <Home />
              Início
            </Links>
          </RoutesLink>
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
            <Bolt className="md:text-black text-(--tipografia-principal)" />
          </Links>
        </div>
      </div>

      {/* smartphone */}
      <SiWolframlanguage
        size={50}
        className="md:hidden absolute top-4 left-[45%] text-(--tipografia-principal)  "
      />
      {smartphone && (
        <div className={`${style.link} md:hidden`}>
          <RoutesLink to="/">
            <Links>
              <Home />
              Início
            </Links>
          </RoutesLink>
           <RoutesLink to="/">
          <Links>
            <FolderClosed />
            Geral
          </Links>
          </RoutesLink>
          <RoutesLink to="/">
          <Links>
            <BadgeHelp />
            Ajuda
          </Links>
          </RoutesLink>
        </div>
      )}
    </>
  );
}
