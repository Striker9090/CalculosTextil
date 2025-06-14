import { Pause, Play, PlayCircleIcon, RefreshCcw, Trash2 } from "lucide-react";
import Cabecalho from "../../components/Cabecalho";
import { Inputs } from "../../components/Utilitarios/Inputs";
import { useRef, useState, useEffect } from "react";

export default function Cronometro() {
  const [type, setType] = useState("decimal");
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const registrationContainerRef = useRef<HTMLDivElement | null>(null);

  type Registro = {
    id: number; // pra travar por id único
    tempo: number; // tempo total
    diff: number; // diferença já calculada
  };
  const [registrationTime, setRegistrationTime] = useState<Registro[]>([]);
  const idCounter = useRef(0);

  const registration = () => {
    setRegistrationTime((prev) => {
      const lastTempo = prev.length > 0 ? prev[prev.length - 1].tempo : 0;
      const diff = time - lastTempo;

      const novoRegistro: Registro = {
        id: idCounter.current++, // id único
        tempo: time,
        diff: diff,
      };

      return [...prev, novoRegistro];
    });
  };

  const handleDelete = (indexToDelete: number) => {
    setRegistrationTime((prev) =>
      prev.filter((registro) => registro.id !== indexToDelete)
    );
  };

  useEffect(() => {
    if (registrationContainerRef.current) {
      const container = registrationContainerRef.current;
      container.scrollTop = 0;
    }
  }, [registrationTime]);

  const tradeStatus = {
    button1: () => {
      if (running) {
        clearInterval(intervalRef.current!);
        setRunning(false);
      } else {
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
        setRunning(true);
      }
    },

    button2: () => {
      if (running) {
        return;
      } else {
        setTime(0);
        setRegistrationTime([]);
      }
    },
  };

  const infbotao = {
    Infbutton1: () => {
      return running ? (
        <>
          <Pause /> Pausar
        </>
      ) : (
        <>
          <Play /> Iniciar
        </>
      );
    },

    Infbutton2: () => {
      return time === 0 ? null : running ? (
        <button
          onClick={() => registration()}
          className="flex justify-center cursor-pointer gap-3 items-center text-[20px] mb-7 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-[400px]"
        >
          <PlayCircleIcon /> Registro
        </button>
      ) : (
        <button
          onClick={tradeStatus.button2}
          className="flex justify-center cursor-pointer gap-3 items-center text-[20px] mb-7 py-3 bg-red-400 text-white rounded hover:bg-red-500 w-full max-w-[400px]"
          title="Reiniciar"
        >
          <RefreshCcw /> Reiniciar
        </button>
      );
    },
  };

  const registrationTimer = () => {
    return registrationTime
      .map((registro, index) => (
          <>
            {/* tempo calculado */}

            <span key={registro.id} className="flex text-gray-700 p-3">
              <span className="inline-block min-w-[30px]">#{index + 1} </span>:
              <span>
                {formatTime(registro.diff)} &nbsp; &nbsp; &nbsp; {formatTime(registro.tempo)}
              </span>
              <span
                onClick={() => handleDelete(registro.id)}
                className="ml-auto cursor-pointer text-red-500 hover:text-red-700"
              >
                <Trash2 />
              </span>
            </span>
            <hr className="border-gray-400 mt-2" />
          </>
        )
      ).reverse();
      
  };

  const formatTime = (ms: number) => {
    switch (type) {
      case "horas":
        const horas = Math.floor(ms / 3600000);
        const minutos = Math.floor((ms % 3600000) / 60000);
        const segundos = Math.floor((ms % 60000) / 1000);
        const milissegundos = ms % 1000;
        return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
          2,
          "0"
        )}:${String(segundos).padStart(2, "0")}.${String(
          milissegundos
        ).padStart(3, "0")}`;

      case "decimal":
        const totalMinutos = ms / 60000;
        return totalMinutos.toFixed(3).replace(".", ",");

      default:
        return `${ms} ms`;
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="flex justify-center align-center">
        <div className="flex flex-col items-center p-5 m-5 bg-white rounded-lg shadow-lg w-full max-w-[600px] min-w-[370px] max-h-[85vh] overflow-hidden">
          <form className="flex flex-row gap-10 mb-5 bg-gray-200 p-5 rounded-lg">
            <div className="flex gap-10 flex-col ">
              <Inputs
                id="horas"
                name="formatos"
                type="radio"
                value="horas"
                onChange={(e) => setType((e.target as HTMLInputElement).value)}
                className="mr-1"
              >
                HH:MM:SS
              </Inputs>
              {/* <Inputs
                id="centesimo"
                name="formatos"
                type="radio"
                value="centesimo"
                onChange={(e) => setType((e.target as HTMLInputElement).value)}
              >
                1/100 seg
              </Inputs> */}
            </div>
            <div className="flex items-center gap-5 flex-col">
              <Inputs
                id="decimal"
                name="formatos"
                type="radio"
                value="decimal"
                checked={type === "decimal"}
                onChange={(e) => setType((e.target as HTMLInputElement).value)}
                className="mr-1"
              >
                1/1.000 min
              </Inputs>
              {/* <Inputs
                id="centimilesimo"
                name="formatos"
                type="radio"
                value="centimilesimo"
                onChange={(e) => setType((e.target as HTMLInputElement).value)}
              >
                1/100.000 hr
              </Inputs> */}
            </div>
          </form>

          {/* botão para parar o cronometro */}
          <div className="text-gray-700 text-[50px] mb-10">
            {formatTime(time)}
          </div>
          <button
            onClick={tradeStatus.button1}
            className="flex justify-center cursor-pointer gap-3 items-center text-[20px] mb-7 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-[400px]"
          >
            {infbotao.Infbutton1()}
          </button>

          {/* botão para reiniciar o cronometro/registrar */}
          {infbotao.Infbutton2()}

          {/* container para os registros */}
          {registrationTime.length > 0 ? (
            <div className="flex gap-7 w-full max-w-[400px] justify-start ml-5 mb-2 text-gray-600">
              <div>ID</div>
              <div>DIF.</div>
              <div>TOTAL</div>
            </div>
          ) : null}
          <div
            ref={registrationContainerRef}
            className="flex flex-col cursor-pointer bg-gray-200 rounded-lg w-full max-w-[400px] scroll-auto overflow-auto"
          >
            {registrationTimer()}
          </div>
        </div>
      </div>
    </>
  );
}
