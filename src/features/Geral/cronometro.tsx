import {
  Download,
  Edit2,
  Pause,
  Play,
  PlayCircleIcon,
  RefreshCcw,
  Trash2,
  X,
} from "lucide-react";
import Cabecalho from "../../components/Cabecalho";
import { Inputs } from "../../components/Utilitarios/Inputs";
import { useRef, useState, useEffect } from "react";
/* import { CgOptions } from "react-icons/cg"; */
import { CSVLink } from "react-csv";

export default function Cronometro() {
  const [type, setType] = useState("decimal");
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const registrationContainerRef = useRef<HTMLDivElement | null>(null);
  const [editRegistro, setEditRegistro] = useState<number | null>(null);
  const [registrationTime, setRegistrationTime] = useState<Registro[]>([]);
  const idCounter = useRef(0);
  const [configElements, setConfigElements] = useState(false);

  type Registro = {
    id: number; // pra travar por id único
    tempo: number; // tempo total
    diff: number; // diferença já calculada
  };

  const saveExcel = () => {
    const registros = registrationTime.map((registo) => ({
      tempo: parseFloat(formatTime(registo.tempo).replace(",", ".")),
      diferenca: parseFloat(formatTime(registo.diff).replace(",", ".")),
    }));

    const headers = [
      { label: "Tempo", key: "tempo" },
      { label: "Diferença", key: "diferenca" },
    ];

    return (
      <CSVLink
        data={registros}
        headers={headers}
        filename={"registros " + new Date().toLocaleString()}
        separator=";"
      >
        <Download />
      </CSVLink>
    );
  };

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

  useEffect(() => {
    if (registrationContainerRef.current) {
      const container = registrationContainerRef.current;
      container.scrollTop = 0;
    }
  }, [registrationTime]);

  const handleDelete = (indexToDelete: number) => {
    setRegistrationTime((prev) =>
      prev.filter((registro) => registro.id !== indexToDelete)
    );
  };

  const TypeRegister = () => {
    const [items, setItems] = useState([
      { color: "#FF00FF", element: "" },
      { color: "#00FF00", element: "" },
      { color: "#008080", element: "" },
    ]);

    const reset = () => {
      const defaultItems = [
        { color: "#FF00FF", element: "" },
        { color: "#00FF00", element: "" },
        { color: "#008080", element: "" },
      ];
      setItems(defaultItems);
      saveToLocalStorage(defaultItems);
    };

    useEffect(() => {
      const storedItems: { color: string; element: string }[] = [];
      for (let i = 0; i < 3; i++) {
        const item = localStorage.getItem(`color-element-${i}`);
        if (item) {
          storedItems.push(JSON.parse(item));
        } else {
          storedItems.push({ color: "#FFFFFF", element: "" });
        }
      }
      setItems(storedItems);
    }, []);

    const handleColorChange =
      (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newItems = [...items];
        newItems[index].color = e.target.value;
        setItems(newItems);
        saveToLocalStorage(newItems);
      };

    const handleElementChange =
      (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newItems = [...items];
        newItems[index].element = e.target.value;
        setItems(newItems);
        saveToLocalStorage(newItems);
      };

    const saveToLocalStorage = (data: { color: string; element: string }[]) => {
      data.forEach((item, i) => {
        localStorage.setItem(`color-element-${i}`, JSON.stringify(item));
      });
    };
    return (
      <>
        <div className="absolute top-0 left-0 w-dvw h-dvh bg-black/30 flex justify-center items-center z-50">
          <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-lg">
            <div className="mx-auto max-w-[400px] h-auto p-4 flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between">
                  Escolha as cores e nomeie os elementos:
                </div>
                <button
                  className="relative left-[25px] bottom-[25px] bg-gray-500 w-fit text-white rounded hover:bg-gray-600 cursor-pointer"
                  onClick={() => setConfigElements(false)}
                >
                  <X />
                </button>
              </div>
              {items.map((item, index) => (
                <div key={index} className="flex flex-row gap-1">
                  <Inputs
                    value={item.color}
                    type="color"
                    id={`color${index}`}
                    name={`color${index}`}
                    className="rounded-full "
                    onChange={handleColorChange(index)}
                  >
                    Cor {index + 1}:
                  </Inputs>
                  <input
                    type="text"
                    value={item.element}
                    placeholder="Nome do elemento"
                    onChange={handleElementChange(index)}
                    className="border-b-1 px-2 py-1 text-sm focus:border-b-1 focus:bg-gray-400"
                  />
                </div>
              ))}
              <button
                type="reset"
                onClick={() => {
                  reset();
                }}
                className="flex justify-center gap-2 p-5 cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <RefreshCcw />
                Resetar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

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
          className="flex justify-center cursor-pointer gap-3 items-center text-[20px] mb-7 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-[400px] active:bg-blue-600"
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

          <span
            key={registro.id}
            className="flex justify-center items-center text-gray-700 p-3"
          >
            <span className="inline-block min-w-[30px]">#{index + 1} </span>:
            <span>
              {formatTime(registro.diff)} &nbsp; &nbsp; &nbsp;{" "}
              {formatTime(registro.tempo)}
            </span>
            {/* <input
              type="color"
              disabled
              readOnly
              value={
                JSON.parse(
                  localStorage.getItem("color-element-0") ||
                    '{"color":"#FFFFFF"}'
                ).color
              }
              className="appearance-none ml-auto w-[30px] h-[30px] rounded-full mr-3 border-none"
            /> */}
            <span
              onClick={() => EditRegistro(registro.id)}
              className="cursor-pointer ml-auto text-gray-600 hover:text-gray-800"
            >
              <Edit2 />
            </span>
          </span>
          <hr className="border-gray-400 mt-2" />

          {editRegistro === registro.id ? (
            <div className="absolute top-0 left-0 w-dvw h-dvh bg-black/70 flex justify-center items-center z-50">
              <div className="flex flex-col gap-5 bg-amber-50 items-center w-[400px] mx-auto rounded-lg p-5">
                <div className="flex flex-row items-center w-full justify-center">
                  <p className="block text-gray-500 text-2xl ml-auto">
                    Editar Registro <b>#{index + 1}</b>
                  </p>
                  <button
                    onClick={() => setEditRegistro(null)}
                    className="bg-gray-500 w-fit text-white rounded ml-auto hover:bg-gray-600"
                  >
                    <X />
                  </button>
                </div>
                {/* <div className="mx-auto max-w-[400px] h-auto p-4 flex flex-col gap-4">
                    <div className="bg-gray-300 p-2 rounded-md">
                      Escolha as cores e nomeie os elementos:
                    </div>

                    {items.map((item, index) => (
                      <div key={index} className="flex flex-row gap-1">
                        <Inputs
                          value={item.color}
                          type="color"
                          id={`color${index}`}
                          name={`color${index}`}
                          className="rounded-full"
                          onChange={handleColorChange(index)}
                        >
                          Cor {index + 1}:
                        </Inputs>
                        <input
                          type="text"
                          value={item.element}
                          placeholder="Nome do elemento"
                          onChange={handleElementChange(index)}
                          className="border px-2 py-1 rounded text-sm"
                        />
                      </div>
                    ))}
                </div> */}

                <button
                  onClick={() => handleDelete(registro.id)}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  <Trash2 size={20} /> Excluir
                </button>
              </div>
            </div>
          ) : null}
        </>
      ))
      .reverse();
  };

  const EditRegistro = (id: number) => {
    setEditRegistro((prev) => (prev === id ? null : id));
  };

  const formatTime = (ms: number) => {
    switch (type) {
      case "horas": {
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
      }
      case "decimal": {
        const totalMinutos = ms / 60000;
        return totalMinutos.toFixed(3).replace(".", ",");
      }
      default:
        return `${ms} ms`;
    }
  };

  return (
    <>
      <Cabecalho />
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center p-5 m-5 bg-white rounded-lg shadow-lg w-full max-w-[600px] min-w-[370px] max-h-[83vh] overflow-hidden">
          <div className="flex flex-row w-full mb-5">
            <div className="flex items-center gap-5 w-full justify-space-between">
              <form className="flex flex-row gap-5 bg-gray-200 p-5 rounded-lg m-auto">
                <div className="flex gap-5 flex-col">
                  <Inputs
                    id="horas"
                    name="formatos"
                    type="radio"
                    value="horas"
                    onChange={(e) =>
                      setType((e.target as HTMLInputElement).value)
                    }
                    className="mr-1 cursor-pointer"
                  >
                    HH:MM:SS
                  </Inputs>
                </div>
                <div className="flex items-center gap-5 flex-col">
                  <Inputs
                    id="decimal"
                    name="formatos"
                    type="radio"
                    value="decimal"
                    checked={type === "decimal"}
                    onChange={(e) =>
                      setType((e.target as HTMLInputElement).value)
                    }
                    className="mr-1 cursor-pointer"
                  >
                    1/1.000 min
                  </Inputs>
                </div>
              </form>
            </div>
            <div className="absolute">{running ? null : saveExcel()}</div>
            <div className="">
              {/* <div
                className="bg-gray-200 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
                onClick={() => setConfigElements(!configElements)}
              >
                <CgOptions />
              </div> */}
            </div>
          </div>

          {/* Cronômetro */}
          <div className="text-gray-700 text-[50px] mb-10">
            {formatTime(time)}
          </div>

          {/* Botões */}
          <button
            onClick={tradeStatus.button1}
            className="flex justify-center cursor-pointer gap-3 items-center text-[20px] mb-7 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-[400px] active:bg-blue-600"
          >
            {infbotao.Infbutton1()}
          </button>
          {infbotao.Infbutton2()}

          {/* Registros */}
          {registrationTime.length > 0 && (
            <div className="flex gap-7 w-full max-w-[400px] justify-start ml-5 mb-2 text-gray-600">
              <div>ID</div>
              <div>DIF.</div>
              <div>TOTAL</div>
            </div>
          )}

          {/* Configuração dos elementos */}
          {running ? null : configElements && <TypeRegister />}

          {/* Container de registros */}
          <div
            ref={registrationContainerRef}
            className="flex flex-col bg-gray-200 rounded-lg w-full max-w-[400px] scroll-auto overflow-auto"
          >
            {registrationTimer()}
          </div>
        </div>
      </div>
    </>
  );
}
