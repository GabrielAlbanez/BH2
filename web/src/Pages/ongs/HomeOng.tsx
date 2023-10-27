import React from 'react'
import CardRifas from '../../components/CardRifas'
import { useAppSelector } from '../../store/intex';



export default function HomeOng() {


    const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
    cnpj: string;
  }>;


 


  return (
    <div className='flex w-full h-[91vh] flex-col items-center justify-center gap-20'>
      <h1 className='text-4xl'>All Rifas</h1>
      <CardRifas/>
    </div>
  )
}
