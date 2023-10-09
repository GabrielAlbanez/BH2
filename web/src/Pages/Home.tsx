import React, { useEffect, useState } from "react";
import { useTema } from "../common/context/Tema";
import { useAppSelector } from "../store/intex";
import { LogUser } from "../store/slices/AuthToken";
import { useDispatch } from "react-redux";

export default function Home() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const responsee = useAppSelector((state) => state.AuthToken.url);
  const token = useAppSelector((state) => state.AuthToken.token);
  const token2 = localStorage.getItem('token');
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
  }>;
  const logedUser = useAppSelector((state) => state.AuthToken.isLoged);

  const dispacht = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(`${responsee}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
  
        if (!request.ok) {
          throw new Error("A solicitação falhou");
        }
  
        const responseData = await request.json();
  
        console.log(responseData);
  
        if ("error" in responseData) {
          dispacht(LogUser(false));
        } else {
          dispacht(LogUser(true));
        }
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };
  
    // Execute a função fetchData inicialmente e, em seguida, a cada 60 segundos
    fetchData();
  
    const interval = setInterval(fetchData, 60000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  

  console.log(logedUser)


  return (
    <div
      className={` w-full h-screen transition-all duration-1000 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      {logedUser ? (
        <>
          {logedUser ? (
            <h1>cpf : {User[0].cpf}</h1>
          ) : (
            <h1>Carregando dados do usuário...</h1>
          )}
        </>
      ) : (
        <h1>Você precisa estar logado</h1>
      )}
    </div>
  );
}
