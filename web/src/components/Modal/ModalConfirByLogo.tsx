import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { GrFormClose } from "react-icons/gr";
import { useTema } from "../../common/context/Tema";
import { RiMastercardLine } from "react-icons/ri";

interface PropsModal {
  open: boolean;
  onClose: () => void;
  data: string;
  preco: number;
  id: number;
  email: string;
  ong: {
    cnpj: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    redesSociais: string;
    aprovado: boolean;
    Logo: string;
  };
}

const ModalConfirByLogo: React.FC<PropsModal> = ({ open, onClose, data, preco, ong, id, email }) => {
  const url = data.slice(26);

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const notify = (message: string): void => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "✔" : "✔"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };


  const byLogo = async () => {
    const req = await axios.post('http://localhost:8080/byLogoDoacao', {
      idLogo: id,
      emailUser: email
    })
    notify(req.data.message)
  }

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-all duration-1000 scale-125 ${open ? "visible bg-black/20 " : "invisible "
        }`}
    >
      <div
         className={`bg-white w-[70%]  lg:w-[70%] h-[75%] lg:h-[70%] 2xl:w-[50%] rounded-xl shadow p-8 transition-all ${open ? "scale-100 opacity-100 " : "scale-125 opacity-0 "
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <GrFormClose size={32} />
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-center  2xl:px-10 2xl:py-4 w-full h-full">
          <div className=" h-full w-[100%] md:w-[50%]  flex flex-col items-center justify-center lg:gap-10 ">
            <div className=" invisible w-0 h-0 lg:visible  lg:flex lg:items-center lg:justify-center lg:gap-8 lg:w-full lg:h-full  lg:pt-10 text-black transition-all duration-1000">
              <div className="flex flex-col  justify-center md:justify-start  w-full items-center ">
                <h1 className=" text-sm md:text-3xl font-semibold md:mb-4 text-center">ONG</h1>
                <img
                  src={require(`../../uploads/${ong.Logo.slice(16)}`)}
                  alt=""
                  className="w-12 h-12  md:w-24  md:h-24  object-cover rounded-full mb-2"
                />
             
              <div className="flex flex-col text-left">
                <h2 className="text-sm md:text-xl font-semibold mb-2">{ong.nome}</h2>
                <p className="text-gray-500 mb-1 text-sm ">E-mail: {ong.email}</p>
                <p className="text-gray-500 mb-1 text-sm ">Telefone: {ong.telefone}</p>
              </div>
            </div>
            </div>

            <div className="lg:mt-8 flex gap-13 lg:gap-8 items-center justify-center    w-full   text-black">
              <div className="flex flex-col items-center  lg:gap-4  ">
                <h1 className="text-lg md:text-3xl font-semibold mb-4">Produto</h1>
                <img
                  src={require(`../../uploadsDoacaoImgs/${url}`)}
                  alt=""
                  className="w-12 h-12 sm:w-16 sm:h-16   lg:w-24 lg:h-24 object-cover rounded-full mb-2"
                />
                <div className="">
                  <p className="text-gray-500 text-md md:text-2xl">Preço: R$ {preco}</p>
                </div>
              </div>

            </div>
          </div>
          <div className="h-full w-[100%] lg:w-[50%] sm:gap-6 md:gap-5 lg:gap-2 flex flex-col justify-between items-center py-5 text-black  ">
            <h1 className="text-md md:text-2xl">Payment</h1>
            <div className="flex gap-2 flex-col  ">
              <label htmlFor="" className="text-sm">Name On Card</label>
              <div className="w-[100%] sm:w-[100%] lg:w-[40vh] border-zinc-400 border-[1px] flex items-center justify-center h-[5vh]  2xl:h-[6vh] rounded-2xl transition  shadow-md hover:shadow-lg ">
                <input
                  name="email"
                  type="text"
                  placeholder="name..."
                  className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-col ">
              <label htmlFor="" className="text-sm"><RiMastercardLine size={20} /> Credit Card Number </label>
              <div className="w-[100%]  sm:w-[100%] lg:w-[40vh] border-zinc-400 border-[1px] flex items-center justify-center h-[5vh]  2xl:h-[6vh] rounded-2xl transition  shadow-md hover:shadow-lg  ">
                <input
                  name="email"
                  type="text"

                  placeholder='number card...'
                  className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                />
              </div>
            </div>
            <div className="bg-blue-50 flex w-full gap-5 pt-4 sm:gap-5 lg:gap-16 px-6  lg:px-20  items-center justify-center">
              <div className="flex gap-2 flex-col w-full ">
                <label htmlFor="" className="text-sm">expiry date</label>
                <div className="w-[40%]  sm:w-[100%]  border-zinc-400 border-[1px] flex items-center justify-center h-[5vh]  2xl:h-[6vh] rounded-2xl transition  shadow-md hover:shadow-lg  ">
                  <input
                    name="email"
                    type="date"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col  w-full ">
                <label htmlFor="" className="text-sm">CVC</label>
                <div className="w-[100%]  sm:w-[100%] lg:w-[10vh]  border-zinc-400 border-[1px] flex items-center justify-center h-[5vh]  2xl:h-[6vh] rounded-2xl transition  shadow-md hover:shadow-lg  ">
                  <input
                    name="email"
                    type="number"
                    placeholder="390"
                    className="w-[100%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>
            </div>
            <div className="sm:pt-4 lg:pt-0">
              <button onClick={byLogo} className=" py-1 px-1 md:py-3 md:px-5 rounded-2xl border-[1px] border-black text-black">Comprar</button>

            </div>
            {/* o botao para comprar passa como children */}
          </div>
        </div>



      </div>
    </div>
  );
};

export default ModalConfirByLogo;
