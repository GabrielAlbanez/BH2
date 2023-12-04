import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useTema } from "../../common/context/Tema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function AccountOng() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const navigator = useNavigate();

  const notify = () => {
    toast(`${"Ong Deslogado"}`, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const handleLogoutOng = () => {
    notify();
    setTimeout(() => {
      localStorage.setItem("logoOng", "");
      localStorage.setItem("token", "");
      localStorage.setItem("isLoged", "");
      localStorage.setItem('isLoged', 'false')
      localStorage.setItem('cnpjOng', "")
      navigator("/");
      window.location.reload();
    }, 1500);
  };


  const Ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
    email: string;
    endereco: string;
    nome: string;
    telefone: string;
    redesSociais: string;
    Logo : string 
  }>;

  const logo = Ong[0]?.Logo.slice(8);





  const [saldoOng, setSaldoOng] = useState(0)

  const getSaldoOng = async () => {


    try {
      const req = await axios.post('https://bh2-upl7.onrender.com/getSaldoFornCnpjOng', {
        cnpj: Ong[0]?.cnpj
      })

      setSaldoOng(req.data.total)
    } catch (error) {
      console.log(`erro ao pegar saldo ong,${error}`)
    }
  }



  useEffect(() => {
    getSaldoOng()
  }, [Ong[0]?.cnpj, saldoOng])

  console.log(saldoOng)

  return (
    <div className={`bg-${pegarTema === "dark" ? "black" : "[#CEF3FF]"} transition-all duration-1000 min-h-screen flex items-center justify-center`}>
      <div className={`${pegarTema === 'dark' ? "shadow-2xl shadow-fuchsia-500 text-white border-black " : "  shadow-2xl shadow-fuchsia-500 text-black"} border-2 rounded-xl  p-8 max-w-4xl w-full`}>
        <div className="flex flex-col items-center mb-8">
          <img
            src={`https://bh2-upl7.onrender.com/uploadImgOng/${logo}`}

            alt="" className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 object-cover border-gray-300 p-3 mb-4" />
          <h1 className="text-3xl font-semibold ">{Ong[0]?.nome}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-12 text-center ">
          <div>
            <p className="text-lg font-semibold">CNPJ:</p>
            <p className="text-base">{Ong[0]?.cnpj}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">E-mail:</p>
            <p className="text-base">{Ong[0]?.email}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Endereço:</p>
            <p className="text-base">{Ong[0]?.endereco}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Redes Sociais:</p>
            <p className="text-base">{Ong[0]?.redesSociais}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Telefone:</p>
            <p className="text-base">{Ong[0]?.telefone}</p>
          </div>

          <div>
            <p className="text-lg font-semibold">Saldo Acumulado:</p>
            <p className="text-base">R$:{saldoOng ? saldoOng : 0}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleLogoutOng}
            className="mt-8 px-6 py-3  bg-red-500 hover:bg-red-600 rounded-full text-white text-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
