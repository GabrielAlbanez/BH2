import React from "react";
import Logo from "../assets/imgs/Logo.png"
import Button from "../components/Button";
export default function Abertura() {
  return (
    <div>
      <header className=" bg-[#CEF3FF] w-[100%] h-[9vh] border-[1px] flex items-center justify-between px-8 ">
         <ul className="flex gap-7 items-center">
         <img src={Logo} alt="" height={40} width={40} />
            <li>Sobre Nós</li>
            <li>Doação</li>
            <li>Contato</li>
         </ul>
          <div className="flex gap-10 items-center">
             <Button isBorder={true}>Cadastrar</Button>
             <Button>Entrar</Button>
          </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
}

