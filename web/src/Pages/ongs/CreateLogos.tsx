import React, { useState } from "react";
import { useTema } from "../../common/context/Tema";
import axios from "axios";
import { useAppSelector } from "../../store/intex";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateLogos() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const [dataRegisterRifa, setDataRegisterRifa] = useState({

    preco: "0.00",

  });

  const [imgRifa, setImgRifa] = useState<File | null>(null);

  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;

  localStorage.setItem("cnpjOng", ong[0]?.cnpj);

  const navigator = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setDataRegisterRifa((rifas) => ({
      ...rifas,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgRifa(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const preco = parseFloat(dataRegisterRifa.preco);

    if (isNaN(preco)) {
      console.log(
        "Preço inválido. Por favor, insira um número válido."
      );
      return;
    }

    const formData = new FormData();


    formData.append("preco", dataRegisterRifa.preco);
    formData.append("idOng", ong[0]?.cnpj);

    if (imgRifa) {
      formData.append("imgRifa", imgRifa);
    }

    try {
      const request = await axios.post(
        `http://localhost:8080/createImgDoacoes`,
        formData
      );

      const responseData = request.data;

      if ("error" in responseData) {
        const notify = () => {
          toast(`${responseData.error}`, {
            icon: `${
              pegarTema === "dark" ? "🌑" : " 🌞"
            }`,
            style: {
              borderRadius: "10px",
              background: `${
                pegarTema === "dark" ? "#333" : "white"
              }`,
              color: `${
                pegarTema === "dark" ? "white" : "black"
              }`,
            },
          });
        };

        notify();
      } else {
        const notify = () => {
          toast(`Logo criada com sucesso`, {
            icon: `${
              pegarTema === "dark" ? "🌑" : " 🌞"
            }`,
            style: {
              borderRadius: "10px",
              background: `${
                pegarTema === "dark" ? "#333" : "white"
              }`,
              color: `${
                pegarTema === "dark" ? "white" : "black"
              }`,
            },
          });
        };
        setTimeout(() => {
          navigator("/HomeOng");
        }, 3000);

        notify();
      }
    } catch (error) {
      console.log("Falha ao criar uma logo", error);
    }
  };

  return (
    <div
      className={`w-full min-h-screen transition-all duration-1000 flex justify-center items-center flex-col gap-16 ${
        pegarTema === "dark"
          ? "bg-black text-white"
          : "bg-[#CEF3FF]"
      }`}
    >
      <h1 className="text-center text-4xl">Criar Logos</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full md:w-[70%] lg:w-[50%] xl:w-[40%] h-[80%] shadow-xl border-fuchsia-500 border-[1px] rounded-3xl flex-col items-center justify-center px-10 py-8 gap-8"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="logo">Imagem do Logo</label>
          <div className="w-full border-purple-500 border-[1px] flex items-center justify-center h-[8vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500">
            <input
              onChange={handleFileChange}
              type="file"
              id="imgRifa"
              name="imgRifa"
              accept="image/*"
              className="w-[93%] rounded-full h-[70%] border-white outline-0 bg-transparent p-3"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="nome">preço da logo</label>
          <div className="w-full border-purple-500 border-[1px] flex items-center justify-center h-[8vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500">
            <input
              name="preco"
              type="number"
              value={dataRegisterRifa.preco}
              onChange={handleInputChange}
              placeholder="Nome da Rifa"
              className="w-[93%] rounded-full h-[90%] border-white outline-0 bg-transparent p-3"
            />
          </div>
        </div>

       

      

        <div>
          <button
            type="submit"
            className="bg-fuchsia-400 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-full transition-all"
          >
            Criar Rifa
          </button>
        </div>
      </form>
    </div>
  );
}
