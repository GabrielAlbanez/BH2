import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { GrFormClose } from "react-icons/gr";
import { useTema } from "../../common/context/Tema";

interface PropsModal {
  open: boolean;
  onClose: () => void;
  data: string;
  preco: number;
  id : number;
  email : string;
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

const ModalConfirByLogo: React.FC<PropsModal> = ({ open, onClose, data, preco, ong,id,email }) => {
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


  const byLogo = async()=>{
    const req =  await axios.post('http://localhost:8080/byLogoDoacao',{
        idLogo : id,
        emailUser : email
    })
    notify(req.data.message)
  }

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-all duration-1000 scale-125 ${
        open ? "visible bg-black/20 " : "invisible "
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow p-8 transition-all ${
          open ? "scale-100 opacity-100 " : "scale-125 opacity-0 "
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <GrFormClose size={32} />
        </button>

        <div className="flex items-center justify-center gap-8 text-black transition-all duration-1000">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-4">ONG</h1>
            <img
              src={require(`../../uploads/${ong.Logo.slice(16)}`)}
              alt=""
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-semibold mb-2">{ong.nome}</h2>
            <p className="text-gray-500 mb-1">CNPJ: {ong.cnpj}</p>
            <p className="text-gray-500 mb-1">E-mail: {ong.email}</p>
            <p className="text-gray-500 mb-1">Telefone: {ong.telefone}</p>
            <p className="text-gray-500 mb-1">Endereço: {ong.endereco}</p>
            <p className="text-gray-500 mb-1">Redes Sociais: {ong.redesSociais}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-10 items-center  text-black">
            <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl font-semibold mb-4">Produto</h1>
          <img
            src={require(`../../uploadsDoacaoImgs/${url}`)}
            alt=""
            className="w-24 h-24 object-cover rounded-full mb-2"
          />
          </div>
          <div className="flex flex-col items-center gap-3">
          <p className="text-gray-500">Preço: R$ {preco}</p>
          <button onClick={byLogo} className="py-3 px-5 rounded-2xl border-[1px] border-black text-black">Comprar</button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ModalConfirByLogo;
