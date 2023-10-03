import React from 'react'
import { useTypeUser } from '../common/context/typeUserCadastro';
import Button from '../components/Button';


export default function Register() {


    const { pegarTypeUser, setPegarTypeUser } = useTypeUser() as {
        setPegarTypeUser: (value: string) => void;
        pegarTypeUser: string
    }


    return (
        <div className='w-full h-[91vh] flex flex-col items-center justify-center gap-9 '>
        
            <div>
                <p className='text-4xl'>Cadastro</p>
            </div>
            <div className='flex flex-col gap-3 sm:gap-2  w-[80%] justify-center items-center sm:w-[100%] '>
            <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Nome completo</label>
                    <div className='w-[100%] sm:w-[70vh] border-purple-500 border-[1px] flex items-center justify-center h-[7vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>

                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Nome completo</label>
                    <div className='w-[100%] sm:w-[70vh] border-purple-500 border-[1px] flex items-center justify-center h-[7vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>


                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Nome completo</label>
                    <div className='w-[100%] sm:w-[70vh] border-purple-500 border-[1px] flex items-center justify-center h-[7vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>


                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Nome completo</label>
                    <div className='w-[100%] sm:w-[70vh] border-purple-500 border-[1px] flex items-center justify-center h-[7vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>

                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Nome completo</label>
                    <div className='w-[100%] sm:w-[70vh] border-purple-500 border-[1px] flex items-center justify-center h-[7vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>


      
            </div>

            <div className=' bg flex items-center justify-center w-[80%] xl:w-[30%] '><Button>Enivar</Button></div>
        </div>
    )
}
