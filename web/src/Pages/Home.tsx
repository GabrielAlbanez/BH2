import React, { useEffect, useState } from "react";
import { useTema } from "../common/context/Tema";
import { useAppSelector } from "../store/intex";
import { LogUser } from "../store/slices/AuthToken";
import { useDispatch } from "react-redux";

export default function Home() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const response = useAppSelector((state) => state.AuthToken.url);
  const token = useAppSelector((state) => state.AuthToken.token);
  const User = useAppSelector((state) => state.AuthToken.dataUser);
  const logedUser = useAppSelector((state) => state.AuthToken.isLoged);

  const dispacht = useDispatch();

  const [userLogado, setUserLogado] = useState<boolean>(logedUser);

  useEffect(() => {
    const interval = setInterval(() => {
      // Substitua a URL abaixo pela URL do seu endpoint GET
      fetch(`${response}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("A solicitação falhou");
          }
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData);
          if ("error" in responseData) {
            setUserLogado(false); // Armazena os dados da resposta no estado
          } else {
            dispacht(LogUser(true));
            setUserLogado(true)
          }
        })
        .catch((error) => {
          console.error("Erro na solicitação:", error);
        });
    }, 60); // Intervalo de 60 segundos (ajuste conforme necessário)

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado

  }, []);

  console.log(userLogado);
  console.log(response);
  console.log(token);
  console.log(User);

  return (
    <div
      className={` w-full h-screen transition-all duration-1000 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      {userLogado ? (<>
      <h1>cpf : {User}</h1>
      </>) : <><h1>vc preisa estar logado</h1></>}  
    </div>
  );
}
