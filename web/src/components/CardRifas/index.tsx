import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTema } from "../../common/context/Tema";
import ModalTimerRIfa from "../Modal/ModalTimerRIfa";
import { useDispatch } from "react-redux";
import api from "../../lib/api";
import { ImSpinner2 } from "react-icons/im";

export default function CardRifas() {
  type dataOng = {
    imgRifa: string;
    nome: string;
    preco: number;
    descricao: string;
    NumeroComprado: Array<number>;
    id: number;
    sorteado: boolean;
  };

  const [dataRifa, setDataRifa] = useState<dataOng[]>([]);

  const [open, setOpen] = useState(false);






  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;

  const [dataRifaEnvio, setDataRifaEnvio] = useState({
    cnpjOng: localStorage.getItem("cnpjOng"),
  });

  const [selectedTime, setSelectedTime] = useState(0);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(parseInt(event.target.value) * 10);
  };

  const getRifasOng = async () => {
    const request = await axios.post(
      "https://bh2-upl7.onrender.com/rifa",
      dataRifaEnvio
    );

    const responseData = request.data;

    setDataRifa(responseData.rifas);
  };

  useEffect(() => {
    getRifasOng();
  }, [dataRifa]);


  const url = dataRifa.map((valor) => valor.imgRifa.slice(16));

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const notify = (message: string): void => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "❌" : "❌"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const sortRifa = async (id: number, timer: number) => {

    navigator.serviceWorker
      .register("service-worker.js")
      .then(async (serviceWorker) => {
        let subscription = await serviceWorker.pushManager.getSubscription();

        if (!subscription) {
          const publicKeyResponse = await api.get("/");

          subscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKeyResponse.data,
          });
        }


        await api.post("/push_register", {
          subscription,
        });

        await api.post('/send_notification', {
          subscription,
          text: 'nova rifa sorteada'
        })
      });





    const request = await axios.post("https://bh2-upl7.onrender.com/Drawlots", {
      idRifa: id,
      time: timer,

    });

    const response = await request.data;

    setOpen(false)

    if ("error" in response) {
      notify(`opss.. ${response.error}`);
      setOpen(true)
    }
  };

  return (
    <div>
      {dataRifa.length > 0 ? (<>
        {dataRifa.length || url.length !== 0 ? (
          <>
            <div
              className={`flex gap-16 flex-wrap h-full lg:h-[80vh] w-full   items-center justify-center `}
            >
              {dataRifa.map((rifa, index) => (
                <div
                  className={`${rifa.sorteado === true ? "opacity-60" : "opacity-100"
                    }`}
                >
                  <Card className="w-80 shadow-xl shadow-purple-500 transform transition-transform duration-[1500ms] hover:scale-125">
                    <Link to={`/UniqueRIfa/${rifa.id}`} key={index}>
                      <CardHeader shadow={false} floated={false} className="h-64">
                        {url && (
                          <img
                            src={`https://bh2-upl7.onrender.com/uploadsImgRifas/${url[index]}`}
                            alt="card-image"
                            className="h-full w-full object-cover transform transition-transform duration-[1500ms] hover:scale-125"
                          />
                        )}
                      </CardHeader>
                    </Link>
                    <CardBody className="text-black text-xl w-full">
                      <div className="mb-2 flex items-center justify-center">
                        <Typography color="blue-gray" className="font-medium">
                          {rifa.nome}
                        </Typography>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                      {rifa.sorteado === true && (
                        <h1 className="text-black text-center">
                          essa rifa ja foi sorteada
                        </h1>
                      )}
                      {rifa.sorteado === false && (
                        <div className="w-full flex justify-center items-center">
                          <button
                            onClick={() => {
                              setOpen(true);
                            }}
                            className="text-white hover:shadow-2xl bg-black rounded-2xl px-3 py-3  hover:shadow-fuchsia-500 hover:scale-110 transition-all duration-1000 "
                          >
                            sortear rifa
                          </button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                  <ModalTimerRIfa
                    open={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col gap-4 items-center justify-center">
                      <h1 className="text-black text-xl flex items-center justify-center px-10">vc tem certeza que deseja fazer o sorteio dessa rifa</h1>
                      <button
                        onClick={() => {
                          sortRifa(rifa.id, selectedTime);
                        }}
                        className="text-white hover:shadow-2xl bg-black rounded-2xl px-3 py-3  hover:shadow-fuchsia-500 hover:scale-110 transition-all duration-1000 "
                      >
                        sortear rifa
                      </button>
                    </div>
                  </ModalTimerRIfa>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className=" text-center text-2xl">Você ainda não tem nenhuma rifa criada</h1>
          </>
        )}
      </>) : (<div className="w-full h-[91vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl">Carregando Dados</h1>
        <div className="animate-spin h-5 mt-4">
          <ImSpinner2 />
        </div>
      </div>)}

    </div>
  );
}
