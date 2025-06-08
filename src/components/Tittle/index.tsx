import style from "./index.module.css"

type TittleProps = {
  children: React.ReactNode
}

export function Tittle({children}: TittleProps){
  return(
    <>
      <div className={style.tittle}>{children}</div>
    </>
  )
}