import React, { useEffect, useState } from "react";
import Button from "../Button";
import Logo from "../../assets/imgs/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPerson, BsTelephone } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LiaDonateSolid } from "react-icons/lia";
import { TbPigMoney } from "react-icons/tb";
import MyDrawer from "../MyDrawer";
import ButtonTradeTheme from "../ButtonTradeTheme";
import { useTema } from "../../common/context/Tema";
import ModalConfirm from "../Modal/ModalConfirm";
import { useTypeUser } from "../../common/context/typeUserCadastro";
import { useAppSelector } from "../../store/intex";
import AvatarImg from "../AvatarImg/AvatarImg";
import toast from "react-hot-toast";
import sockett from "../../common/io/io";
import "./animationNavbar.css"
import api from "../../lib/api";


export default function Navbar() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const [open, setOpen] = useState(false);

  const [openModalAuxiliarLogin, setOpenModalAuxiliarLogin] = useState(false);

  const { setPegarTypeUser } = useTypeUser() as {
    setPegarTypeUser: (value: string) => void;
  };

  const navigatorr = useNavigate();

  const isLoged = useAppSelector((state) => state.AuthToken.isLoged);

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
    imgPerfilAbsolute: string;
  }>;

  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    Logo: string;
  }>;

  const typeUser = User[0]?.tipo;


  const notify = (message: string): void => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "❌" : "❌"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const verifyLogin = (namePagina: string) => {
    isLoged === "false"
      ? notify("voce precisa estar logado para acessar essa pagina")
      : navigatorr(`/${namePagina}`);
  };

  const handleTypeRegister = (name: string) => {
    setPegarTypeUser(name);
    navigatorr("/Register");
  };

  const handleTypeLogin = (name: string) => {
    setPegarTypeUser(name);
    navigatorr("/Login");
  };

  const local = useLocation();

  const pageHome = local.pathname == "/" ? true : false;


  type resultadoSorteio = {
    sorteio: {
      sorteioRealizado: boolean;
    };
  };

  const [resultadoSorteio, setResultadoSorteio] = useState<boolean>();

  const cpf = User[0]?.cpf;

  useEffect(() => {
    sockett.emit("authenticate", cpf);
    sockett.on("sorteioConcluido", (dados: resultadoSorteio) => {
      setResultadoSorteio(dados.sorteio.sorteioRealizado);
    });

    
  }, []);


if(resultadoSorteio){
  navigator.serviceWorker
    .register("service-worker.js")
    .then(async (serviceWorker) => {
      let subscription = await serviceWorker.pushManager.getSubscription();
  
      if (!subscription) {
        const publicKeyResponse = await api.get("/");
  
        subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKeyResponse.data,
        });
      }
  
  
      await api.post("/push_register", {
        subscription,
      });
  
      await api.post('/send_notification',{
        subscription,
        text : 'uma nova rifa foi sorteada'
      })
    });
}

  const Local = useLocation();


 const img = User[0]?.imgPerfilAbsolute


  return (
    <header
      className={`  transition-all duration-1000  ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      } w-[100%] h-[9vh]  flex items-center justify-between px-3 sm:px-8 xl:px-1 2xl:px-0 `}
    >
      {typeUser !== "admin" ? (
        <>
          <ul className="flex md:text-lg lg:text-xl 2xl:text-xl gap-7 items-center overflow-hidden w-[0%] sm:w-[0%] md:w-[100%] md:overflow-visible">
            <img
              onClick={() => navigatorr(`${isLoged === "true" ? "/Home" : "/"}`)}
              src={Logo}
              alt=""
              height={40}
              width={40}
              className="cursor-pointer"
            />

            <li
              className="cursor-pointer"
              onClick={() => {
                verifyLogin("ongs");
              }}
            >
              Ongs
            </li>

            <li
              className="cursor-pointer"
              onClick={() => {
                verifyLogin("Rifas");
              }}
            >
              Minhas Rifas
            </li>

            <li
              className={`cursor-pointer ${
                resultadoSorteio && Local.pathname !== '/Sorteio' ? "animate-pulse-10s" : ""
              }`}
              onClick={() => {
                verifyLogin("Sorteio");
              }}
            >
              Sorteios das Rifas
            </li>
          </ul>

          <ul className="flex gap-7 items-center  w-[40%] overflow-visible sm:w-[80%] md:w-[0%]  md:overflow-hidden ">
            <MyDrawer
              inten1={<BsPerson size={25} />}
              textoI1={"Sorteios"}
              inten2={<LiaDonateSolid size={25} />}
              textoI2={"ongs"}
              inten4={<TbPigMoney size={25} />}
              textoI4={"Rifas"}
              coteudo={<RxHamburgerMenu size={30} />}
            />
          </ul>
        </>
      ) : (
        <>
          <ul className="flex md:text-lg lg:text-xl 2xl:text-xl gap-7 items-center overflow-hidden w-[0%] sm:w-[0%] md:w-[100%] md:overflow-visible">
      
              <img
              onClick={() => navigatorr(`${isLoged === "true" ? "/Home" : "/"}`)}
              src={Logo}
              alt=""
              height={40}
              width={40}
              className="cursor-pointer"
            />
      

            <li
              className="cursor-pointer"
              onClick={() => {
                navigatorr("/DashBoarddUsuarios");
              }}
            >
              Usuarios
            </li>

            <li
              className="cursor-pointer"
              onClick={() => {
                navigatorr("/DasBoarddOngs");
              }}
            >
              Ongs
            </li>

            <li
              className="cursor-pointer"
              onClick={() => {
                navigatorr("/RifasDashboard");
              }}
            >
              Rifas
            </li>
          </ul>

          <ul className="flex gap-7 items-center  w-[40%] overflow-visible sm:w-[80%] md:w-[0%]  md:overflow-hidden ">
            <MyDrawer
              inten1={<BsPerson size={25} />}
              textoI1={"Usuarios"}
              inten2={<LiaDonateSolid size={25} />}
              textoI2={"ongs"}
              inten4={<TbPigMoney size={25} />}
              textoI4={"Rifas"}
              coteudo={<RxHamburgerMenu size={30} />}
            />
          </ul>
        </>
      )}

      <div
        className={`flex h-[60%] gap-5 sm:gap-12  justify-end items-center  sm:items-center  w-[60%] xl:w-[23%] 2xl:w-[31%] xl:h-[100%]  2xl:px-4  sm:w-[28%]  transition-all duration-1000 ${
          pegarTema === "dark" ? "bg-[#202020]" : "bg-[#CEF3FF] "
        }`}
      >
        {isLoged === "true" ? (
          <div className="flex items-center  gap-4">
            <Link to={"/Account"}>
            {img ? (
              <img
              onClick={() => navigatorr(`${isLoged === "true" ? "/Home" : "/"}`)}
              src={`https://bh2-upl7.onrender.com/uploadsDoacaoImgs/${img}`}
              alt=""
              height={40}
              width={40}
              className="cursor-pointer rounded-full object-cover h-12 w-12"
            />
            ) : (
             <AvatarImg/>
            )}
            </Link>
            {pageHome ? "" : <ButtonTradeTheme />}
          </div>
        ) : (
          <>
            <Button
              isBorder={true}
              onClick={() => {
                setOpen(true);
              }}
            >
              Cadastrar
            </Button>
            <Button
              onClick={() => {
                setOpenModalAuxiliarLogin(true);
              }}
            >
              Entrar
            </Button>
          </>
        )}
      </div>
      <ModalConfirm
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="text-center w-56">
          <div className="mx-auto my-7 w-48">
            <h3 className="text-lg text-gray-800">
              Como vc deseja se Cadastrar como...
            </h3>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                handleTypeRegister("Ong");
              }}
              className="bg-emerald-400 w-full rounded-lg py-3"
            >
              Ong
            </button>
            <button
              onClick={() => {
                handleTypeRegister("Usario");
              }}
              className="bg-indigo-400 w-full rounded-lg"
            >
              Usario
            </button>
          </div>
        </div>
      </ModalConfirm>

      <ModalConfirm
        open={openModalAuxiliarLogin}
        onClose={() => {
          setOpenModalAuxiliarLogin(false);
        }}
      >
        <div className="text-center w-56">
          <div className="mx-auto my-7 w-48">
            <h3 className="text-lg text-gray-800">
              Como vc deseja Logar, como...
            </h3>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                handleTypeLogin("Ong");
              }}
              className="bg-emerald-400 w-full rounded-lg py-3"
            >
              Ong
            </button>
            <button
              onClick={() => {
                handleTypeLogin("Usario");
              }}
              className="bg-indigo-400 w-full rounded-lg"
            >
              Usario
            </button>
          </div>
        </div>
      </ModalConfirm>
    </header>
  );
}
