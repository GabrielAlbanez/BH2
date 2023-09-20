import React from 'react'
import Button from '../Button'
import Logo from "../../assets/imgs/Logo.png"
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <header className=" bg-[#CEF3FF] w-[100%] h-[9vh] border-[1px] flex items-center justify-between px-8 ">
            <ul className="flex gap-7 items-center">
                <img src={Logo} alt="" height={40} width={40} />
                <li>Sobre Nós</li>
                <li>Doação</li>
                <li>Contato</li>
                <Link to={"/Rifas"}><li>Rifas</li></Link>
            </ul>
            <div className="flex gap-10 items-center">
                <Button isBorder={true}>Cadastrar</Button>
                <Button>Entrar</Button>
            </div>
        </header>
    )
}
