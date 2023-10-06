import React, { useEffect, useState } from "react";
import { useTypeUser } from "../common/context/typeUserCadastro";
import Button from "../components/Button";
import { useTema } from "../common/context/Tema";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { pegarTypeUser, setPegarTypeUser } = useTypeUser() as {
    setPegarTypeUser: (value: string) => void;
    pegarTypeUser: string;
  };

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const [dataOngRegister, setDataOngRegister] = useState({
    cnpj: "",
    email: "",
    nome: "",
    senha: "",
    endereco: "",
    telefone: "",
    redesSociais: "",
  });

  const [dataUserRegister, setDataUserRegister] = useState({
    cpf: "",
    nome: "",
    email: "",
    senha: "",
    sexo: "",
    endereco: "",
    type: "",
    telefone: "",
  });


  const navigator = useNavigate()

  const hanleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDataUserRegister((dados) => ({
      ...dados,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(dataUserRegister);
      const request = await axios.post(
        "http://10.112.240.175:8080/createUser",
        dataUserRegister
      );
      const responseData = request.data;

      console.log(responseData);

      if ("error" in responseData) {
        const notify = () => {
          toast(`${responseData.error}`, {
            icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
            style: {
              borderRadius: "10px",
              background: `${pegarTema === "dark" ? "#333" : "white"}`,
              color: `${pegarTema === "dark" ? "white" : "black"}`,
            },
          });
        };


        notify();
      }
      else {

        const notify = () => {
          toast(`${responseData.user}`, {
            icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
            style: {
              borderRadius: "10px",
              background: `${pegarTema === "dark" ? "#333" : "white"}`,
              color: `${pegarTema === "dark" ? "white" : "black"}`,
            },
          });
        };


        notify();
        navigator('/Login')
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  };

  return (
    <>
      {pegarTypeUser === "Ong" ? (
        <>
          <form
            className={`transition-all duration-1000  w-full h-[100vh]  sm:h-[91vh] lg:h-[100%] xl:h-[100%] 2xl:h-[91vh]  flex flex-col items-center justify-center gap-3  sm:gap-9 
        ${pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"} 
        `}
          >
            <div>
              <p className="text-2xl sm:text-4xl">Cadastro Ong</p>
            </div>
            <div className="flex flex-col gap-3 sm:gap-2  w-[80%] justify-center items-center sm:w-[100%] ">
              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Nome</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataOngRegister.nome}
                    onChange={hanleInputChange}
                    name="nome"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">email</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataOngRegister.email}
                    onChange={hanleInputChange}
                    name="email"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Cnpj</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataOngRegister.cnpj}
                    onChange={hanleInputChange}
                    name="cnpj"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Senha</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataOngRegister.senha}
                    onChange={hanleInputChange}
                    name="senha"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Endereco</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.endereco}
                    onChange={hanleInputChange}
                    name="enderco"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Telefone</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataOngRegister.telefone}
                    onChange={hanleInputChange}
                    name="telefone"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Redes Sociais</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataOngRegister.redesSociais}
                    onChange={hanleInputChange}
                    name="redesSociais"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>
            </div>

            <div className=" bg flex items-center justify-center w-[80%] sm:w-[50%] xl:w-[30%] ">
              <Button type="submit">Enivar</Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className={`transition-all duration-1000  w-full h-[100vh]  sm:h-[91vh] lg:h-[100%] xl:h-[100%] 2xl:h-[91vh]   flex flex-col items-center justify-center gap-3  sm:gap-9 
           ${pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"}
           `}
          >
            <div>
              <p className="text-2xl sm:text-4xl">Cadastro</p>
            </div>
            <div className="flex flex-col gap-3 sm:gap-2  w-[80%] justify-center items-center sm:w-[100%] ">
              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Cpf</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.cpf}
                    onChange={hanleInputChange}
                    name="cpf"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Email</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.email}
                    onChange={hanleInputChange}
                    name="email"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Endereco</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.endereco}
                    onChange={hanleInputChange}
                    name="endereco"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Nome</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.nome}
                    onChange={hanleInputChange}
                    name="nome"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Senha</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.senha}
                    onChange={hanleInputChange}
                    name="senha"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Sexo</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.sexo}
                    onChange={hanleInputChange}
                    name="sexo"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="">Telefone</label>
                <div className="w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 ">
                  <input
                    value={dataUserRegister.telefone}
                    onChange={hanleInputChange}
                    name="telefone"
                    type="text"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>
            </div>

            <div className=" bg flex items-center justify-center w-[80%] sm:w-[50%] xl:w-[30%] ">
              <Button type="submit">Enivar</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
