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

export default function CardRifas() {
  type dataOng =

    {
      imgRifa: string;
      nome: string;
      preco: number;
      descricao: string;
      NumeroComprado: Array<number>;
      id: number;
      sorteado: boolean
    }



  const [dataRifa, setDataRifa] = useState<dataOng[]>([]);

  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;

  const [dataRifaEnvio, setDataRifaEnvio] = useState({
    cnpjOng: localStorage.getItem("cnpjOng"),
  });

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
  }, [dataRifa]);



  console.log('dataRifa', dataRifa)


  const url = dataRifa.map((valor) => valor.imgRifa.slice(24));


  const sortRifa = async (id: number) => {
    axios.post('http://localhost:8080/Drawlots', {
      idRifa : id
    })
  }



  return (
    <>
      {dataRifa.length || url.length !== 0 ? (
        <>
          <div className={`flex gap-16 flex-wrap h-full w-full items-center justify-center `}>
            {dataRifa.map((rifa, index) => (

              <div className={`${rifa.sorteado === true ? 'opacity-60' : 'opacity-100'}`}>
                <Card className="w-80 shadow-xl shadow-purple-500">
                  <Link to={`/UniqueRIfa/${rifa.id}`} key={index}>
                    <CardHeader shadow={false} floated={false} className="h-64">
                      {url && (
                        <img
                          src={require(`../../uploadsImgRifas/${url[index]}`)}
                          alt="card-image"
                          className="h-full w-full object-cover"
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
                    {rifa.sorteado === true && (<h1 className="text-black text-center">essa rifa ja foi sorteada</h1>)}
                    {rifa.sorteado === false && (
                      <div className="w-full flex justify-center items-center">
                        <button onClick={() => { sortRifa(rifa.id) }} className="text-white hover:shadow-2xl bg-black rounded-2xl px-3 py-3  hover:shadow-fuchsia-500 hover:scale-110 transition-all duration-1000 ">sortear rifa
                        </button>
                      </div>)}
                  </CardFooter>
                </Card>
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
