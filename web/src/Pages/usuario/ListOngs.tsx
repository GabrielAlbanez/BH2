import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";
import { useTema } from "../../common/context/Tema";
import CardAllOngs from "../../components/CardAllOngs/CardAllOngs";
import ButtonTradeTheme from "../../components/ButtonTradeTheme";
import toast from "react-hot-toast";
import sockett from "../../common/io/io";
import ModaWinOrLoseRifa from "../../components/Modal/ModaWinOrLoseRifa";

export default function ListOngs() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const navigator = useNavigate();
  const typeUser = User[0]?.tipo;

  type resultadoSorteio = {
    dadosGanhador: {
      nome: string;
      email: string;
      cpf: string;
    };
    ganhador: {
      numero: number;
      rifa: {
        imgRifa: string;
        idOng: string;
        nome: string;
        preco: string;
      };
    } | null;
  };

  const [resultadoSorteio, setResultadoSorteio] = useState<resultadoSorteio[]>(
    []
  );
  const [open, setOpen] = useState<boolean>(false);

  const [time, setTime] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const logedUser = localStorage.getItem("isLoged");
  const logedUserr = useAppSelector((state) => state.AuthToken.isLoged);

  const notify = (message: string) => {
    toast(message, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  useEffect(() => {

    if (logedUser === "false") {
      notify("Você precisa estar logado para acessar esta página");
      navigator("/");
    }





   
  }, []);

  useEffect(() => {
    if (typeUser === "admin") {
      navigator("/DashBoarddUsuarios");
    }
  }, [typeUser]);

  const cpf = User[0]?.cpf;




 

  return (
    <>
      <div
        className={`w-full min-h-[100vh] sm:min-h-[91vh] transition-all duration-1000 flex flex-col items-center justify-center  gap-5 py-5 ${
          pegarTema === "dark" ? "bg-black text-white" : "bg-[#CEF3FF]"
        }`}
      >
        <div className="w-full min-h-[100%]">
          <CardAllOngs />
        </div>
      </div>
    </>
  );
}
