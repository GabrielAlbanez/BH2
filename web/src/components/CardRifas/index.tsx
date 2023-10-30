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

export default function CardRifas() {
  type dataOng = {
    imgRifa: string;
    nome: string;
    preco: number;
    descricao: string;
    NumeroComprado: Array<number>;
  };

  const [dataRifa, setDataRifa] = useState<dataOng[]>([]);

  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;

  const [dataRifaEnvio, setDataRifaEnvio] = useState({
    cnpjOng: localStorage.getItem("cnpjOng"),
  });

  const getRifasOng = async () => {
    console.log("esse é o cnpj que tem que ser enviado", dataRifaEnvio);

    // setDataRifaEnvio({
    //   cnpjOng: ong[0]?.cnpj,
    // });

    const request = await axios.post(
      "http://localhost:8080/rifa",
      dataRifaEnvio
    );

    const responseData = request.data;

    console.log(responseData);

    setDataRifa(responseData.rifas);
  };

  useEffect(() => {
    setTimeout(() => {
      getRifasOng();
    }, 1000);
  }, []);

  console.log("data rifa ", dataRifa);

  const url = dataRifa.map((valor) => valor.imgRifa.slice(24));

  console.log(url);

  return (
    <>
      {dataRifa.length > 0 ? (
        <>
          <div className="flex gap-16  flex-wrap h-full w-full items-center justify-center ">
            {dataRifa.map((rifa, index) => (
              <div key={index}>
                <Card className="w-80 shadow-xl shadow-purple-500">
                  <CardHeader shadow={false} floated={false} className="h-64">
                    <img
                      src={require(`../../uploadsImgRifas/${url[index]}`)}
                      alt="card-image"
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="text-black  text-xl w-full">
                    <div className="mb-2 flex items-center justify-center">
                      <Typography color="blue-gray" className="font-medium">
                        {rifa.nome}
                      </Typography>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      ripple={false}
                      fullWidth={true}
                      className="bg-blue-gray-900/10 text-black shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                      Ver mais...
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl">vc ainda não tem nehuma rifa criada</h1>
        </>
      )}
    </>
  );
}
