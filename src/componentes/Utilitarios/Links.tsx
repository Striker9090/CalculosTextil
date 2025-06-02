import style from "./utililitarios.module.css"

type Linksprops = {
    children: React.ReactNode
}

export function Links({children}:Linksprops){
    return(
        <div className={style.link}>
            <a href="#" >{children}</a>
        </div>
    )
}