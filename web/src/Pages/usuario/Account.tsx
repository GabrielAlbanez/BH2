import React, { useEffect, useState } from "react";
import { useTema } from "../../common/context/Tema";
import { useAppSelector } from "../../store/intex";
import { LogUser, saveDataUser } from "../../store/slices/AuthToken";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import sockett from "../../common/io/io";
import defaulImg from "../../assets/imgs/img avatar.png";
import Button from "../../components/Button";

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
    nome: string;
  }>;

  console.log(User)

  const logedUser = useAppSelector((state) => state.AuthToken.isLoged);

  const notify = () => {
    toast(`${"usuario Deslogado"}`, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const navigator = useNavigate();

  const logOut = () => {
    notify();
    setTimeout(() => {
      localStorage.setItem("token", "");
      localStorage.setItem("isLoged", "false");
      navigator("/");
      sockett.disconnect();
      window.location.reload();
    }, 1000);
  };

  type dataNuemerosComprados = {
    id: Number;
    numero: number;
    rifaId: Number;
    usuarioCpf: string;
  };

  return (
    <div
      className={` w-full h-[91vh] transition-all duration-1000 flex items-center justify-center flex-col gap-10 ${
        pegarTema === "dark" ? "bg-black text-white" : "bg-[#CEF3FF] text-black"
      }`}
    >
      <div className="text-4xl pt-10">Account</div>
      {logedUser === "true" ? (
        <>
          {logedUser === "true" || User.length > 0 ? (
            <div className="flex   items-center justify-center gap-32 h-[100%] w-[100%] rounded-2xl  text-lg ">
              <div className="w-full h-full   text-white flex items-center justify-center">
                <figure className="border-[3px] border-black rounded-full bg-white px-5 py-5">
                  <img
                    src={defaulImg}
                    alt=""
                    className="rounded-full w-80 h-80 object-cover transition-all duration-1000 hover:scale-150  hover:overflow-hidden"
                  />
                </figure>
              </div>

              <form
                className={`w-full h-full  text-white flex justify-center gap-10 items-center flex-col ${
                  pegarTema === "dark" ? "text-white" : "text-black"
                }`}
              >
                <div
                  className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">nome</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                    <input
                      name="nome"
                      type="text"
                      defaultValue={User[0]?.nome}
                      className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>
                <div   className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">cpf</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                    <input
                      name="cpf"
                      defaultValue={User[0]?.cpf}
                      type="text"
                      className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>
                <div   className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">email</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                    <input
                      name="email"
                      type="text"
                      defaultValue={User[0]?.email}
                      placeholder="name@example.com.."
                      className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>

                <div   className={`flex gap-2 flex-col  ${
                    pegarTema === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <label htmlFor="">sexo</label>
                  <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                    <input
                      name="sexo"
                      type="text"
                      defaultValue={User[0]?.sexo}
                      placeholder="name@example.com.."
                      className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                    />
                  </div>
                </div>

                <button className={`p-6 border-[2px] border-fuchsia-500 rounded-full px-5 py-2 ${pegarTema === 'dark' ? "text-white" : "text-black"}`}>
                  update profile
                </button>
              </form>
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
