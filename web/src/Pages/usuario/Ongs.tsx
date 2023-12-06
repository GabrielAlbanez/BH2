import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useParams } from "react-router-dom";
import { useTema } from "../../common/context/Tema";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/intex";
import ModalPyament from "../../components/Modal/ModalPyament";

export default function Ongs() {
  const { cnpj } = useParams();

  const cnpjFormatado =
    cnpj?.slice(0, 2) +
    "." +
    cnpj?.slice(2, 5) +
    "." +
    cnpj?.slice(5, 8) +
    "/" +
    cnpj?.slice(8, 12) +
    "-" +
    cnpj?.slice(12);

  type dataOng = {
    nome: string;
    Logo: string;
    trabalhos: [];
    Voluntarios: [];
    rifas: [
      {
        descricao: string;
        idOng: number;
        imgRifa: string;
        nome: string;
        preco: string;
        id: number;
        sorteado: boolean;
      }
    ];
    endereco: string;
    redesSociais: string;
    telefone: string;
  };
  const [dataReq, setDataReq] = useState({
    cnpjOng: cnpjFormatado,
  });
  const [dataOng, setDataOng] = useState<dataOng[]>([]);

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

  const getByDataOngsForCnpj = async () => {
    const request = await axios.post(
      "https://bh2-upl7.onrender.com/getByRifaForCnpjOng",
      dataReq
    );
    setDataOng(request.data.dataOng);
  };

  useEffect(() => {
    getByDataOngsForCnpj();
  }, [cnpj]);

  const url = dataOng[0]?.Logo.slice(8);



  const urlsImgRifas = dataOng[0]?.rifas.map((data) => data.imgRifa.slice(16));


  const notify = (message: string) => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "✔" : " ✔"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const SaveNumberRifa = async (idRifa: number) => {

    const req = await axios.post("https://bh2-upl7.onrender.com/byRifas", {
      cpf: User[0]?.cpf,
      id: idRifa,
      numero: Math.floor(Math.random() * 131312321),
    });

    notify(req.data.message);
    setOpen(false)
  };

  const verySortRifa = (sorteado: boolean) => {
    if (sorteado === true) {
      notify("essa rifa ja foi sorteada");
    } else {
      notify("essa rifa ainda n foi sorteada");
    }
  };

  const [open, setOpen] = useState<boolean>(false);

  type selecRifa = {
    id: number;
    imgRifa: string;
    nome: string;
    preco: string;
    descricao: string;
  };

  const [rifaSelecionada, setRifaSelecionada] = useState<selecRifa | null>(
    null
  );

  const selecRifa = (data: selecRifa) => {
    setOpen(true);
    setRifaSelecionada(data);
  };

  return (
    <div
      className={`bg-${pegarTema === "dark" ? "black" : "[#CEF3FF]"
        } min-h-screen text-${pegarTema === "dark" ? "white" : "black"}`}
    >
      {dataOng.length > 0 ? (
        <div className="container mx-auto p-4">
          <section className="flex flex-col items-center justify-center pt-7">
            <img
              src={`https://bh2-upl7.onrender.com/uploadImgOng/${url}`}
              alt=""
              className="w-36 h-36 object-cover rounded-full mb-4 shadow-md "
            />
            <p className="text-2xl font-bold">{dataOng[0].nome}</p>
          </section>
          <section className="flex flex-col md:flex-row mt-8 gap-4">
            <div className="md:w-1/2">
              <h2 className="text-xl md:text-4xl font-bold mb-4 text-center md:text-start">
                Informações da Ong
              </h2>
              <div className="text-sm md:text-md text-center md:text-start flex flex-col gap-5 pt-4">
                <p className="mb-2">
                  <span className="font-bold">Nome:</span> {dataOng[0].nome}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Endereço:</span>{" "}
                  {dataOng[0].endereco}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Redes Sociais:</span>{" "}
                  {dataOng[0].redesSociais}
                </p>
                <p>
                  <span className="font-bold">Telefone:</span>{" "}
                  {dataOng[0].telefone}
                </p>
              </div>
            </div>
            <div className=" pt-12 md:pt-0 md:w-1/2">
              <h1 className="text-xl md:text-2xl font-bold mb-4  md:text-center text-center">
                Rifas
              </h1>
              <div className="flex flex-wrap gap-4 justify-center">
               {dataOng[0]?.rifas.length > 0 ? (
                 <>
                  {dataOng[0]?.rifas.map((data, index) => (
                  <div
                    key={index}

                    className={`max-w-sm rounded-lg overflow-hidden w-full md:w-[48%] p-4 transition-all duration-300 cursor-pointer hover:shadow-md ${data.sorteado ? "opacity-50" : "opacity-100"
                      }`}
                  >
                    <img
                      src={`https://bh2-upl7.onrender.com/uploadsImgRifas/${urlsImgRifas[index]}`}
                      alt=""
                      className="w-full h-32 object-cover mb-4 rounded-md transform transition-transform duration-[1500ms] hover:scale-110"
                    />
                    <div className="text-sm md:text-md">
                      <p className="font-bold mb-2">{data.nome}</p>
                      <p>{data.descricao}</p>
                      <p className="font-bold mt-2">
                        Valor da Rifa: {data.preco}
                      </p>
                    </div>
                    {!data.sorteado && (
                      <button
                        onClick={() => {
                          selecRifa(data);
                        }}
                        className="block w-full bg-fuchsia-500 text-white rounded-md py-2 mt-4 hover:bg-fuchsia-600 transition duration-300"
                      >
                        Comprar Rifa
                      </button>
                    )}
                    {rifaSelecionada && (
                      <ModalPyament
                        open={open}
                        onClose={() => {
                          setOpen(false);
                        }}
                        data={{
                          id: rifaSelecionada.id,
                          img: rifaSelecionada.imgRifa,
                          nome: rifaSelecionada.nome,
                          preco: parseFloat(rifaSelecionada.preco),
                          descrcao: rifaSelecionada.descricao,
                        }}
                      >
                        <button onClick={() => { SaveNumberRifa(data.id) }} className="border-[1px] border-black rounded-full px-1 py-1 xl:px-3 xl:py-3">
                          Comprar Rifa
                        </button>
                      </ModalPyament>
                    )}
                  </div>
                ))}
                 </>
               ) : (<div className=""> <h1 className="text-md sm:text-lg md:text-xl text-center ">Não a rifas criada por essa ong..</h1> </div>)}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="h-[91vh] w-full flex flex-col items-center justify-center">
 <h1 className="text-md sm:text-lg md:text-xl text-center ">Não a rifas criada por essa ong..</h1>
          
        </div>
      )}
    </div>
  );
}
