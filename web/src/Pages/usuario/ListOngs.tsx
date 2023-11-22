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
    console.log(logedUser);

    if (logedUser === "false") {
      notify("Você precisa estar logado para acessar esta página");
      navigator("/");
    }

    const cpf = User[0]?.cpf;

    sockett.emit("authenticate", cpf);
    sockett.on("avisotTimeSorteio", (dados: any) => {
      console.log(dados.tempo.timer);
      let timePego = dados.tempo.timer;
      setTime(timePego);
    });

    sockett.on("sorteioConcluido", (dados: any) => {
      console.log("Recebeu sorteioConcluido:", dados);
      setResultadoSorteio([dados]);
    });

    if (
      resultadoSorteio.length > 0 &&
      resultadoSorteio[0]?.dadosGanhador.cpf.length > 0
    ) {
      if (resultadoSorteio[0]?.dadosGanhador.cpf === cpf) {
        console.log("Você ganhou");
      } else {
        console.log("Você perdeu");
      }

      setOpen(true);
    }
  }, [resultadoSorteio]);

  useEffect(() => {
    if (typeUser === "admin") {
      navigator("/DashBoarddUsuarios");
    }
  }, [typeUser]);

  const cpf = User[0]?.cpf;

  const url = resultadoSorteio.map((valor) =>
    valor.ganhador?.rifa.imgRifa.slice(24)
  );


  console.log('ganhador',resultadoSorteio)

  console.log("time state", time);

  return (
    <>
      <div
        className={`w-full min-h-[100vh] sm:min-h-[91vh] transition-all duration-1000 flex flex-col items-center justify-center  gap-5 py-5 ${
          pegarTema === "dark" ? "bg-black text-white" : "bg-[#CEF3FF]"
        }`}
      >
        <div className="w-full min-h-[100%]">
          <ModaWinOrLoseRifa open={open} onClose={handleClose}>
            <div
              className="text-black w-full h-full flex flex-col gap-3"
              key={resultadoSorteio[0]?.dadosGanhador.cpf}
            >
              <div className="flex items-center justify-center gap-3">
                <h1>Rifa:</h1>
                <h1>{resultadoSorteio[0]?.ganhador?.rifa.nome}</h1>
              </div>
              <h1 className="text-center text-3xl">
                {resultadoSorteio[0]?.dadosGanhador.cpf === cpf
                  ? "Você ganhou!"
                  : "Você perdeu"}
              </h1>
              {url.length > 0 && (
                <img
                  src={require(`../../uploadsImgRifas/${url}`)}
                  alt=""
                  className="w-full h-auto max-h-96 rounded-xl"
                />
              )}
              <p>
                Número da rifa sorteado: {resultadoSorteio[0]?.ganhador?.numero}
              </p>
              <p>Nome do ganhador: {resultadoSorteio[0]?.dadosGanhador.nome}</p>
            </div>
          </ModaWinOrLoseRifa>
          <CardAllOngs />
        </div>
      </div>
    </>
  );
}
