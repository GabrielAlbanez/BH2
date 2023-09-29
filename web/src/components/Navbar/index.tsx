import React from "react";
import Button from "../Button";
import Logo from "../../assets/imgs/Logo.png";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPerson,BsTelephone } from "react-icons/bs";
import { LiaDonateSolid } from "react-icons/lia";
import { TbPigMoney } from "react-icons/tb";
import MyDrawer from "../MyDrawer";

export default function Navbar() {
  return (
    <header className=" bg-[#CEF3FF] w-[100%] h-[9vh] border-[1px] flex items-center justify-between px-3 sm:px-8 ">
      <ul className="flex md:text-lg lg:text-xl 2xl:text-2xl gap-7 items-center overflow-hidden w-[0%] sm:w-[0%] md:w-[100%] md:overflow-visible">
        <img src={Logo} alt="" height={40} width={40} />
        <li>Sobre Nós</li>
        <li>Doação</li>
        <li>Contato</li>
        <Link to={"/Rifas"}>
          <li>Rifas</li>
        </Link>
      </ul>

      <ul className="flex gap-7 items-center  w-[40%] overflow-visible sm:w-[80%] md:w-[0%]  md:overflow-hidden ">
        <MyDrawer 
        inten1={<BsPerson size={25}/>} 
        textoI1={"Sobre Nós"} 
        inten2={<LiaDonateSolid size={25}/>}
        textoI2={'doações'}
        inten3={<BsTelephone size={22}/>}
        textoI3={'contato'}
        inten4={<TbPigMoney size={25}/>}
        textoI4={'Rifas'}
        coteudo={<RxHamburgerMenu size={30} />} />
        
      </ul>
      <div className="flex h-[60%] gap-5 sm:gap-12  justify-end sm:items-center  w-[60%] sm:w-[28%]">
        <Button isBorder={true}>Cadastrar</Button>
        <Button>Entrar</Button>
      </div>
    </header>
  );
}
