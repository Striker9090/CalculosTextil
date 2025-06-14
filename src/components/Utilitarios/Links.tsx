import style from "./Links.module.css"

type Linksprops = {
    children: React.ReactNode,
}& React.HTMLAttributes<HTMLDivElement>;

export function Links({ children }: Linksprops) {
  return (
    <div className={style.link}>
      {children}
    </div>
  );
}