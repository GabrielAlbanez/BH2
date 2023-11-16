import React from 'react';
import CardRifas from '../../components/CardRifas';
import { useAppSelector } from '../../store/intex';
import { useTema } from '../../common/context/Tema';

export default function HomeOng() {
  const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  return (
    <div className={`transition-all duration-1000  ${pegarTema === "dark" ? "bg-zinc-950 text-white" : "bg-[#CEF3FF]"} h-screen flex flex-col items-center justify-center py-10 xl:h-[91vh]`}>
      <h1 className='text-4xl mb-8'>Rifas</h1>
      <div className="container mx-auto">
        <CardRifas />
      </div>
    </div>
  );
}
