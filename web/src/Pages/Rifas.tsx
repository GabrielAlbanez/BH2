import React from 'react'
import Button from '../components/Button'
import TableRifas from '../components/TableRIfas'

export default function Rifas() {

    const numbers = [1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32]

  return (
    <div className='h-[90vh]  w-[100%] flex flex-col items-center justify-center  py-8 '>
        <h1 className='text-3xl'>Rifas</h1>
        <TableRifas numbers={numbers}/>
        <Button>Comprar</Button>
    </div>
  )
}
