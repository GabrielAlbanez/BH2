import React from "react";
import { useTema } from "../common/context/Tema";

export default function Home() {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  return (
    <div
      className={` w-full h-screen transition-all duration-1000 ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}
    >
      Home
    </div>
  );
}
