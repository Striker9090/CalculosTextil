import { Calculator } from "lucide-react";
import style from "../index.module.css";
import { useEffect, useState } from "react";

export function CalculoTitulo() {
  const [tipo, setTipo] = useState<"titulo" | "peso" | "comprimento">("titulo");

  return (
    <>
      <div className={style.tittle}>
        <Calculator />
        Conversões
      </div>
      <div className={style.blocoCtitulo}>
        Tipo
        
        <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
          <option value="titulo">Título</option>
          <option value="peso">Peso</option>
          <option value="comprimento">Comprimento</option>
        </select>
        <hr></hr>
      </div>
      {/* Irá mostrar os campos de label/input */}
      <CalculadoraGenerica tipo={tipo} />
      </>
  );
}

function CalculadoraGenerica({
  tipo,
}: {
  tipo: "titulo" | "peso" | "comprimento";
}) {
  const [peso, setPeso] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [comprimento, setMetragem] = useState<string>("");

  useEffect(() => {
    setPeso("");
    setTitulo("");
    setMetragem("");
  }, [tipo]);

  const K = 0.59;

  const getResultado = () => {
    const pesoNum = parseFloat(peso);
    const tituloNum = parseFloat(titulo);
    const comprimentoNum = parseFloat(comprimento);

    switch (tipo) {
      case "titulo":
        if (isNaN(pesoNum) || isNaN(comprimentoNum)) return "";
        return pesoNum > 0 && comprimentoNum > 0 ? ((comprimentoNum * K) / pesoNum).toFixed(2) : "";
      case "peso":
        if (isNaN(tituloNum) && isNaN(comprimentoNum)) return "";
        return tituloNum > 0 && comprimentoNum > 0
          ? ((comprimentoNum * K) / tituloNum).toFixed(2)
          : "";
      case "comprimento":
        if (isNaN(pesoNum) && isNaN(tituloNum)) return "";
        return pesoNum > 0 && tituloNum > 0
          ? ((pesoNum * tituloNum) / K).toFixed(2)
          : "";
      default:
        return "";
    }
  };

  const resultado = getResultado();

  // monta os dois campos editáveis + 1 campo resultado no final
  const campos = {
    peso: (
      <InputConversoes
        id="peso"
        type="number"
        value={peso}
        placeholder="Digite um valor"
        onChange={(e) => setPeso(e.target.value)}
      >
        Peso (g)
      </InputConversoes>
    ),
    titulo: (
      <InputConversoes
        id="titulo"
        type="number"
        value={titulo}
        placeholder="Digite um valor"
        onChange={(e) => setTitulo(e.target.value)}
      >
        Título (ne)
      </InputConversoes>
    ),
    comprimento: (
      <InputConversoes
        id="comprimento"
        type="number"
        value={comprimento}
        placeholder="Digite um valor"
        onChange={(e) => setMetragem(e.target.value)}
      >
        Comprimento (m)
      </InputConversoes>
    ),
  };

  // Array para saber qual a sequência o .map deve percorrer e mostrar, de acordo com o "tipo" ele irá mostrar os "campos"
  const ordemCampos = {
    titulo: ["peso", "comprimento", "titulo"],
    peso: ["titulo", "comprimento", "peso"],
    comprimento: ["peso", "titulo", "comprimento"],
  }[tipo];

  return (
    <div className={style.parametros}>
      {/* Renderiza os dois campos editáveis percorrendo somente os campos 0, 1 de acordo com o slice, depois mostra com o .map*/}
      {ordemCampos.slice(0, 2).map((key) => campos[key as keyof typeof campos])}

      {/* Renderiza o campo calculado no final */}
      <InputConversoes id="resultado" value={resultado} disabled>
        {/* Mostra no label qual é o resultado de acordo com o "tipo"*/}
        {tipo === "peso"
          ? "Peso (g)"
          : tipo === "titulo"
          ? "Título (ne)"
          : "Comprimento (m)"}
      </InputConversoes>
    </div>
  );
}

type PropsInputconversoes = {
  children: React.ReactNode;
  id: string;
} & React.ComponentProps<"input">;

export function InputConversoes({
  children,
  id,
  ...rest
}: PropsInputconversoes) {
  return (
    <div>
      <label htmlFor={id} className={style.label}>
        {children}
      </label>
      <input id={id} className={style.input} {...rest}></input>
    </div>
  );
}
