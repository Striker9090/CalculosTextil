import style from "./utilitarios.module.css"

type Linksprops = {
    children: React.ReactNode,
};

export function Links({ children }: Linksprops) {
  return (
    <a className={style.link}>
      {children}
    </a>
  );
}