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
      "http://localhost:8080/rifa",
      dataRifaEnvio
    );

    const responseData = request.data;

    setDataRifa(responseData.rifas);
  };

  useEffect(() => {
    getRifasOng();
  }, []);

  console.log("dataRifa", dataRifa);

  const url = dataRifa.map((valor) => valor.imgRifa.slice(24));

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

  const sortRifa = async (id: number,timer : number) => {

  
    console.log('id timer',id,timer)
    
    const request = await axios.post("http://localhost:8080/Drawlots", {
      idRifa: id,
      time : timer
    });

    const response = await request.data;

    setOpen(false)

    if ("error" in response) {
      notify(`opss.. ${response.error}`);
      setOpen(true)
    }
  };

  return (
    <>
      {dataRifa.length || url.length !== 0 ? (
        <>
          <div
            className={`flex gap-16 flex-wrap h-full w-full items-center justify-center `}
          >
            {dataRifa.map((rifa, index) => (
              <div
                className={`${
                  rifa.sorteado === true ? "opacity-60" : "opacity-100"
                }`}
              >
                <Card className="w-80 shadow-xl shadow-purple-500 transform transition-transform duration-[1500ms] hover:scale-125">
                  <Link to={`/UniqueRIfa/${rifa.id}`} key={index}>
                    <CardHeader shadow={false} floated={false} className="h-64">
                      {url && (
                        <img
                          src={require(`../../uploadsImgRifas/${url[index]}`)}
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
                    <h1 className="text-2xl text-black">Timer</h1>
                    <select
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="px-4 py-2 border rounded-md bg-black text-white"
                    >
                      <option value={30}>5 minutes</option>
                      <option value={60}>10 minutes</option>
                      <option value={180}>30 minutes</option>
                      <option value={360}>1 hour</option>
                      <option value={720}>2 hours</option>
                      <option value={1080}>3 hours</option>
                      <option value={1440}>4 hours</option>
                      <option value={1800}>5 hours</option>
                      <option value={2160}>6 hours</option>
                      <option value={2520}>7 hours</option>
                      <option value={2880}>8 hours</option>
                      <option value={3240}>9 hours</option>
                      <option value={3600}>10 hours</option>
                    </select>
                    <button
                      onClick={() => {
                        setTimeout(()=>{
                          sortRifa(rifa.id,selectedTime);
                        },4000)
                       
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
          <h1 className="text-2xl">Você ainda não tem nenhuma rifa criada</h1>
        </>
      )}
    </>
  );
}
