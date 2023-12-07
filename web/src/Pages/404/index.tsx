import React from 'react'
import { Link } from 'react-router-dom'
import { useTema } from '../../common/context/Tema';

export default function NotFoundPage() {



  const { pegarTema } = useTema() as {
    pegarTema: string;
  };



  return (
    <div className={`transition-all duration-1000 min-h-screen flex flex-grow items-center justify-center ${pegarTema === "dark" ? "bg-black text-white" : "bg-[#CEF3FF] text-black"}`}>
      <div className="rounded-lg bg-white p-8 text-center shadow-2xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">Oops! The page you are looking for could not be found.</p>
        <Link to={"/"}>
          <p className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Voltar para home.. </p>
        </Link>
      </div>
    </div>
  )
}
