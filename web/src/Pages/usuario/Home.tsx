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


  type resultadoSorteio = {
    dadosGanhador : {
      nome : string;
      email : string;
      cpf : string
    },
    ganhador : {
      numero : number;
      rifa : {
        imgRifa : string;
        idOng : string;
        nome : string ;
        preco : string
      }
    } | null

  }

  const [resultadoSorteio, setResultadoSorteio] = useState<resultadoSorteio[]>([]);

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };



  const logedUser = localStorage.getItem('isLoged')

  const logedUserr = useAppSelector((state) => state.AuthToken.isLoged);

  console.log(logedUser)




  const notify = (message : string) => {
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
    if (typeUser === "admin") {
      navigator("/DashBoarddUsuarios");
    }

    console.log(logedUser);

    if(logedUser === 'false' ){
      notify('vc precisa estar logado para acessar essa pagina')
      navigator('/')

    }
     const cpf = User[0]?.cpf
    setTimeout(()=>{
      sockett.emit('authenticate', cpf);
      sockett.on('sorteioConcluido', (dados : any) => {
        console.log('Recebeu sorteioConcluido:', dados);
  
   
        setResultadoSorteio([dados]);
        
      });

    },3000)

  
    




  }, [typeUser,logedUser]);


 console.log('sorteio',resultadoSorteio)

 const cpf = User[0]?.cpf

 if(resultadoSorteio.length > 0){
  if(resultadoSorteio[0]?.dadosGanhador.cpf === cpf){
    notify('voce ganhou')
   } else {
    notify('voce perdeu')
   }
 }



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
