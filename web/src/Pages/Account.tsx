import React, { useEffect, useState } from "react";
import { useTema } from "../common/context/Tema";
import { useAppSelector } from "../store/intex";
import { LogUser, saveDataUser } from "../store/slices/AuthToken";
import { useDispatch } from "react-redux";

export default function Account() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;
  const logedUser = useAppSelector((state) => state.AuthToken.isLoged);



  return (
    <div
      className={` w-full h-[91vh] transition-all duration-1000 flex items-center justify-center flex-col gap-10 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      <div className="text-4xl">Account</div>
      {logedUser ? (
        <>
          {logedUser ? (
            <div className="flex flex-col gap-5 items-center justify-center h-[50%] w-[90%] rounded-2xl shadow-lg text-lg ">
              <p>Cpf : {User[0]?.cpf}</p>
              <p>Email : {User[0]?.email}</p>
              <p>NumerosComprados : {User[0]?.numerosComprados}</p>
              <p>Sexo : {User[0]?.sexo}</p>
            </div>
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
