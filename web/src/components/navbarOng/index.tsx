import React, { useState } from "react";
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
import DrawerOng from "../DrawerOng";
import AvatarImgOng from "../AvatarImgOng";

export default function NavbarOng() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const navigator = useNavigate();

  const isLoged = useAppSelector((state) => state.AuthToken.isLoged);

  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    Logo: string;
  }>;


  const notify = (message: string): void => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "🌑" : " 🌞"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const local = useLocation();

  const pageHome = local.pathname === "/" ? true : false;


  return (
    <header className={`transition-all duration-1000 ${pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"} w-[100%] h-[9vh] flex items-center justify-between px-3 sm:px-8 xl:px-1 2xl:px-0`}>
      <ul className="flex md:text-lg lg:text-xl 2xl:text-xl gap-7 items-center overflow-hidden w-[0%] sm:w-[0%] md:w-[100%] md:overflow-visible">
        <img
          onClick={() => navigator(`${isLoged === "ongLogada" ? "/HomeOng" : "/"}`)}
          src={Logo}
          alt=""
          height={40}
          width={40}
          className="cursor-pointer"
        />
        <Link to='/RfiasOng'>
          <li>Rifas</li>
        </Link>
        <Link to='/createLogo'> <li>criar Logos </li></Link>

        <Link to='/ListLogos'><li>Logos</li></Link>

      </ul>

      <ul className="flex gap-7 items-center w-[40%] sm:w-[80%] md:w-[0%] md:overflow-hidden ">
        <DrawerOng
          inten1={<TbPigMoney size={25} />}
          textoI1={"Rifas"}
          inten2={<LiaDonateSolid size={25} />}
          textoI2={"Logos"}
          inten3={<BsTelephone size={22} />}
          textoI3={"Criar Logos"}
          coteudo={<RxHamburgerMenu size={30} />}
        />
      </ul>
      <div className={`flex h-[40%] gap-5 sm:gap-12 justify-end items-center sm:items-center w-[60%] xl:w-[23%] 2xl:w-[31%] xl:h-[100%]  2xl:px-4 sm:w-[28%] transition-all duration-1000 ${pegarTema === "dark" ? "bg-[#202020]" : "bg-[#CEF3FF] "}`}>
        <div className="flex items-center gap-4 rounded-full">
          <Link to="/AccountOng">
            <AvatarImgOng altura={22} largura={22} />
          </Link>
          {!pageHome && <ButtonTradeTheme />}
        </div>
      </div>
    </header>
  );
}
