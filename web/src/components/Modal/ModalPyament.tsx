import React from "react";

import { GrFormClose } from "react-icons/gr";
import { RiMastercardLine } from "react-icons/ri";

interface PropsModal {
  open: boolean;
  onClose: () => void;
  data: {
    img: string;
    preco: number;
    nome: string;
    id: number;
    descrcao: string;
  };
  children: React.ReactNode
}

const ModalPyament: React.FC<PropsModal> = ({ open, onClose, data, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20 " : "invisible "
        }`}
    >
      <div
        className={`bg-white w-[90%] h-[90%] xl:w-[60%] xl:h-[70%] rounded-xl shadow p-6 transition-all duration-1000 ${open ? "scale-100 opacity-100 " : "scale-125 opacity-0 "
          }`}
      >
        <button
          onClick={onClose}
          className=" cursor-pointer absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 "
        >
          <GrFormClose size={30} />
        </button>

        <div className="h-full w-full  flex  flex-col md:flex-row justify-center gap-3 sm:gap-5  lg:justify-between  items-center text-black">
          <div className="flex flex-col justify-center gap-4 sm:gap-6  md:gap-10 items-center w-full h-full md:w-[50%] md:h-full md:p-10 ">
            <img
              src={`https://bh2-upl7.onrender.com/uploadsImgRifas/${data.img.slice(16)}`}
              
              alt=""
              className="w-50 h-50 sm:w-full sm:h-52  md:h-62 md:w-62 2xl:w-full 2xl:h-full object-cover rounded-xl transition-all duration-1000 hover:scale-110"
            />
            <h1 className="text-black text-md sm:text-lg  md:text-2xl">Nome: {data.nome}</h1>
            <h1 className="text-black text-sm sm:text-lg  md:text-2xl">Preco: R${data.preco}</h1>
            <h1 className="text-black text-sm sm:text-lg  md:text-lg">descrição: {data.descrcao}</h1>

          </div>
          <div className="h-full w-[50%] flex flex-col justify-between items-center sm:gap-4  md:py-5  ">
            <h1 className=" text-xl md:text-2xl">Payment</h1>
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
            <div className="flex gap-16 items-center justify-center sm:justify-between ">
              <div className="flex gap-2 flex-col ">
                <label htmlFor="" className="text-sm xl:text-xl" >expiry date</label>
                <div className="w-[50%] sm:w-[100%] md:w-[10vh] border-zinc-400 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition  shadow-md hover:shadow-lg  ">
                  <input
                    name="email"
                    type="date"
                    placeholder="name@example.com.."
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-col ">
                <label htmlFor="" className="text-sm xl:text-xl">CVC</label>
                <div className="w-[100%] sm:w-[100%] md:w-[10vh] border-zinc-400 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition  shadow-md hover:shadow-lg  ">
                  <input
                    name="email"
                    type="number"
                    placeholder="390"
                    className="w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3"
                  />
                </div>
              </div>
            </div>
            <div >
              {children}
            </div>
            {/* o botao para comprar passa como children */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPyament;
