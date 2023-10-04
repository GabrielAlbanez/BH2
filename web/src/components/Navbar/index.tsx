import React, { useState } from "react";
import Button from "../Button";
import Logo from "../../assets/imgs/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPerson, BsTelephone } from "react-icons/bs";
import { LiaDonateSolid } from "react-icons/lia";
import { TbPigMoney } from "react-icons/tb";
import MyDrawer from "../MyDrawer";
import ButtonTradeTheme from "../ButtonTradeTheme";
import { useTema } from "../../common/context/Tema";
import ModalConfirm from "../Modal/ModalConfirm";
import { useTypeUser } from "../../common/context/typeUserCadastro";

export default function Navbar() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const [open, setOpen] = useState(false);

  const {setPegarTypeUser} = useTypeUser() as {
    setPegarTypeUser : (value: string) => void
  }
  
  const navigator = useNavigate()

  const handleTypeRegister = (name : string)=>{
    setPegarTypeUser(name);
    navigator('/Register')
  }

  return (
    <header
      className={` transition-all duration-1000  ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      } w-[100%] h-[9vh]  flex items-center justify-between px-3 sm:px-8 xl:px-1 2xl:px-0 `}
    >
      <ul className="flex md:text-lg lg:text-xl 2xl:text-xl gap-7 items-center overflow-hidden w-[0%] sm:w-[0%] md:w-[100%] md:overflow-visible">
        <img onClick={()=>navigator("/")} src={Logo} alt="" height={40} width={40} />
        <li>Sobre Nós</li>
        <li>Doação</li>
        <li>Contato</li>
        <Link to={"/Rifas"}>
          <li>Rifas</li>
        </Link>
      </ul>

      <ul className="flex gap-7 items-center  w-[40%] overflow-visible sm:w-[80%] md:w-[0%]  md:overflow-hidden ">
        <MyDrawer
          inten1={<BsPerson size={25} />}
          textoI1={"Sobre Nós"}
          inten2={<LiaDonateSolid size={25} />}
          textoI2={"doações"}
          inten3={<BsTelephone size={22} />}
          textoI3={"contato"}
          inten4={<TbPigMoney size={25} />}
          textoI4={"Rifas"}
          inten6={<ButtonTradeTheme />}
          coteudo={<RxHamburgerMenu size={30} />}
        />
      </ul>
      <div
        className={`flex h-[60%] gap-5 sm:gap-12  justify-end sm:items-center  w-[60%] xl:w-[23%] 2xl:w-[31%] xl:h-[100%]  2xl:px-10  sm:w-[28%]  transition-all duration-1000 ${
          pegarTema === "dark"
            ? "bg-[#202020]"
            : "bg-[#CEF3FF] "
        }`}
      >
        <Button
          isBorder={true}
          onClick={() => {
            setOpen(true);
          }}
        >
          Cadastrar
        </Button>
        <Button>Entrar</Button>
      </div>
      <ModalConfirm
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="text-center w-56">
          
        <div className="mx-auto my-7 w-48">
           <h3 className="text-lg text-gray-800">Como vc deseja se Cadastrar como...</h3>
        
        </div>
        <div className="flex gap-4">
         <button onClick={()=>{handleTypeRegister('Ong')}} className="bg-emerald-400 w-full rounded-lg py-3">Ong</button>
         <button onClick={()=>{handleTypeRegister('Usario')}} className="bg-indigo-400 w-full rounded-lg">Usario</button>
        </div>
        </div>
      </ModalConfirm>
      
    </header>
  );
}
