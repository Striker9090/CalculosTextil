import type React from "react";
import style from "./index.module.css";
import { ChevronRight } from "lucide-react";

type LinksFiacaoProps = {
  children: React.ReactNode;
};

export function LinksFiacao({ children }: LinksFiacaoProps) {
  return (
    <>
      
      <div className={style.content}>
        {children}
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
        <Link to="">Teste</Link>
      </div>
    </>
  );
}

type LinkProps = {
  children: React.ReactNode;
  to: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function Link({ children, to, ...rest }: LinkProps) {
  return (
    <>
      <span className={style.contentLink}>
        <a href={to} className={style.linknav} {...rest}>
          <ChevronRight /> {children}
        </a>
      </span>
    </>
  );
}
