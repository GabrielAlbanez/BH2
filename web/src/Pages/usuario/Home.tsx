import React, { useEffect } from "react";
import { useTema } from "../../common/context/Tema";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/intex";
import Logo from "../../assets/imgs/Logo.png";
import { FaInstagram } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs"
import sockett from "../../common/io/io";
export default function Home() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
    nome: string;
  }>;

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

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

  const cpf = User[0]?.cpf

  useEffect(()=>{

    sockett.emit('authenticate', cpf);

  },[])

  return (
    <div
      className={`w-full h-[100vh] backdrop-blur-2xl sm:h-[91vh] transition-all duration-1000 flex flex-col items-center justify-between gap-5  ${pegarTema === "dark" ? "bg-black   text-white" : "bg-[#CEF3FF]"} relative`}

    >
      <div className="flex  flex-col gap-5 items-center h-[100%] w-full justify-center">

       {User[0]?.tipo === 'admin' ? (<>
        
          <h1 className=" text-center text-xl sm:text-2xl md:text-4xl">Bem vindo Administrador!</h1>

       </>) : (<>
        <h1 className="text-4xl font-bold mb-4">Bem-vindo, {User[0]?.nome}!</h1>
        <p className="text-lg text-center">
          A BH Human é um software desenvolvido para facilitar o trabalho das ONGs.
        </p>
        <p className="text-lg text-center">
          O principal metodo de ajuda, é atraves das Rifas
        </p>
</>)}
        
      </div>

      <div className="h-[15%] w-full flex flex-col items-end justify-end ">
        <div className="w-full h-full flex items-center justify-between px-10">
        <h1 className="flex items-center gap-2"><FaInstagram size={20}/> : @beHuman</h1>
        <h1 className="flex imte"><BsFillTelephoneFill size={20}/>: 19995901910</h1>
        </div>
        
      </div>

    </div>
  );
}
