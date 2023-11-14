import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";
import { useTema } from "../../common/context/Tema";
import CardAllOngs from "../../components/CardAllOngs/CardAllOngs";
import ButtonTradeTheme from "../../components/ButtonTradeTheme";
import toast from "react-hot-toast";
import sockett from "../../common/io/io";



export default function Home() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const navigator = useNavigate();
  const typeUser = User[0]?.tipo;
  const [resultadoSorteio, setResultadoSorteio] = useState(null);

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };



  const logedUser = localStorage.getItem('isLoged')

  const logedUserr = useAppSelector((state) => state.AuthToken.isLoged);

  console.log(logedUser)




  const notify = () => {
    toast('vc precisa estar logado para acessar essa pagina', {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  useEffect(() => {
    if (typeUser === "admin") {
      navigator("/DashBoarddUsuarios");
    }

    console.log(logedUser);

    if(logedUser === 'false' ){
      notify()
      navigator('/')

    }
     const cpf = User[0]?.cpf
    setTimeout(()=>{
      sockett.emit('authenticate', cpf);
      sockett.on('sorteioConcluido', (dados) => {
        console.log('Recebeu sorteioConcluido:', dados);
  
        // Faça o que precisar com os dados recebidos do servidor
        setResultadoSorteio(dados); // Atualiza o estado com os dados do sorteio
      });

    },3000)

  
    




  }, [typeUser,logedUser]);




  return (
    <div
      className={` w-full h-[100%] sm:h-[91vh] transition-all duration-1000 flex items-center justify-center flex-col gap-12 py-5 sm:py-0 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      <div>
        <h1 className="text-4xl ">Ongs</h1>
      </div>
      <div className="w-full h-[100%]">
             <CardAllOngs/>
      </div>
    </div>
  );
}
