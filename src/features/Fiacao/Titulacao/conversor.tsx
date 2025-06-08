import { Repeat } from "lucide-react";
import style from "../calculo.module.css";
import { useEffect, useState } from "react";

type TipoTitulo = "NE" | "NM" | "TEX" | "DTEX" | "DENIER";

const fatoresParaTex: Record<TipoTitulo, number> = {
  NE: 590.541,
  NM: 1000,
  TEX: 1,
  DTEX: 10,
  DENIER: 9,
};

export default function ConversorTitulo() {
  const [tipoEntrada, setTipoEntrada] = useState<TipoTitulo>("NE");
  const [tipoSaida, setTipoSaida] = useState<TipoTitulo>("TEX");
  const [valorEntrada, setValorEntrada] = useState("");
  const [valorSaida, setValorSaida] = useState("");
  const [qtdCabos, setQtdCabos] = useState(1);
  const [tabelaValores, setTabelaValores] = useState<string[][]>([]);
  const [mostrarTabela, setMostrarTabela] = useState(false);

  useEffect(() => {
    calcular();
  }, [tipoEntrada, tipoSaida, valorEntrada, qtdCabos]);

  const calcular = () => {
    const raw = valorEntrada.replace(",", ".");
    const valor = parseFloat(raw);
    if (!valorEntrada.trim()) {
      setValorSaida("");
      setTabelaValores([]);
      return;
    }
    if (isNaN(valor) || valor <= 0) {
      setValorSaida("Inválido");
      setTabelaValores([]);
      return;
    }

    const valorTex =
      tipoEntrada === "NE" || tipoEntrada === "NM"
        ? fatoresParaTex[tipoEntrada] / valor
        : valor / fatoresParaTex[tipoEntrada];

    const resultado =
      tipoSaida === "NE" || tipoSaida === "NM"
        ? fatoresParaTex[tipoSaida] / valorTex
        : fatoresParaTex[tipoSaida] * valorTex;

    setValorSaida(resultado.toFixed(2));

    const tabela: string[][] = [];
    let mult = 2;
    let cabos = qtdCabos;

    while (cabos-- > 1) {
      const nm = `${mult}/${((1000 / valorTex) * mult).toFixed(2)}`;
      const ne = `${((590 / valorTex) * mult).toFixed(2)}/${mult}`;
      tabela.push([nm, ne]);
      mult++;
    }

    setTabelaValores(tabela);
  };

  const handleScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1 : -1;
    setQtdCabos((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="conversor-titulo">
      <div className="container">
        <div className="cabecalho">
          <h2 className={style.tittle}>
            <Repeat />
            Título para Título
          </h2>
        </div>

        <div className={style.blocoCtitulo}>
          <label htmlFor="tipo">Tipo</label>
          <select
            value={tipoEntrada}
            onChange={(e) => setTipoEntrada(e.target.value as TipoTitulo)}
          >
            <option value="NE">Ne</option>
            <option value="NM">Nm</option>
            <option value="TEX">Tex</option>
            <option value="DTEX">Dtex</option>
            <option value="DENIER">Denier</option>
          </select>
          <input
            id="tipo"
            className={style.input}
            placeholder="Valor"
            value={valorEntrada}
            onChange={(e) => setValorEntrada(e.target.value)}
          />
        </div>

        <div className={style.blocoCtitulo}>
          <label htmlFor="para">Para</label>
          <select
            value={tipoSaida}
            onChange={(e) => setTipoSaida(e.target.value as TipoTitulo)}
          >
            <option value="NE">Ne</option>
            <option value="NM">Nm</option>
            <option value="TEX">Tex</option>
            <option value="DTEX">Dtex</option>
            <option value="DENIER">Denier</option>
          </select>
          <input
            id="para"
            className={style.input}
            value={valorSaida}
            disabled
            placeholder="Resultado"
          />
        </div>

        <div className="campo">
          <label htmlFor="qtd_cabos">Qtd. Cabos</label>
          <input
            id="qtd_cabos"
            className={style.input}
            type="number"
            value={qtdCabos}
            onChange={(e) => setQtdCabos(Number(e.target.value))}
            onWheel={handleScroll}
          />
        </div>

        <div className="botao">
          {/* <button onClick={() => setMostrarTabela(true)}>Comparar</button> */}
        </div>

        {tabelaValores.length > 0 && (
          <table className="w-full mt-4 text-sm text-center border border-gray-300 shadow-md rounded-md overflow-hidden">
            <thead className="bg-[#32325e] text-white">
              <tr>
                <th className="px-4 py-2">Nm</th>
                <th className="px-4 py-2">Ne</th>
              </tr>
            </thead>
            <tbody>
              {tabelaValores.map(([nm, ne], i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-gray-600" : "bg-gray-600"}
                >
                  <td className="px-4 py-2 border-t text-white/70">{nm}</td>
                  <td className="px-4 py-2 border-t text-white/70">{ne}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {mostrarTabela && (
        <div className="tabela-compara">
          <div className="cabecalho">
            <h2>Compara Título</h2>
            <span className="fechar" onClick={() => setMostrarTabela(false)}>
              ❌
            </span>
          </div>

          <div className="campo">
            <label>Tipo</label>
            <input value={tipoEntrada} disabled />
            <input value={valorEntrada} disabled />
          </div>

          <div className="campo">
            <label>Para</label>
            <input value={tipoSaida} disabled />
            <input value={valorSaida} disabled />
          </div>

          <table className="table-titulo-parecido">
            <thead>
              <tr>
                <th>Nm</th>
                <th>Ne</th>
              </tr>
            </thead>
            <tbody>
              {tabelaValores.map(([nm, ne], i) => (
                <tr key={i}>
                  <td>{nm}</td>
                  <td>{ne}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
