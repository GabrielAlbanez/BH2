import React from "react";
import { useTypeUser } from "../common/context/typeUserCadastro";
import Button from "../components/Button";
import { useTema } from "../common/context/Tema";

export default function Register() {
  const { pegarTypeUser, setPegarTypeUser } = useTypeUser() as {
    setPegarTypeUser: (value: string) => void;
    pegarTypeUser: string;
  };

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  return (
    <>
    {pegarTypeUser === "Ong" ? (
    <>
     <div className={`transition-all duration-1000  w-full h-[100vh]  sm:h-[91vh] lg:h-[100%] xl:h-[100%]  flex flex-col items-center justify-center gap-3  sm:gap-9 
        ${pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"}
        `}>
        
            <div>
                <p className='text-2xl sm:text-4xl'>Cadastro Ong</p>
            </div>
            <div className='flex flex-col gap-3 sm:gap-2  w-[80%] justify-center items-center sm:w-[100%] '>
            <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Nome</label>
                    <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>

                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">email</label>
                    <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>


                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Cnpj</label>
                    <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>


                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Senha</label>
                    <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>

                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Endereco</label>
                    <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>

                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Telefone</label>
                    <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>

                <div className='flex gap-2 flex-col '>
                    <label htmlFor="">Redes Sociais</label>
                    <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                </div>


      
            </div>

            <div className=' bg flex items-center justify-center w-[80%] sm:w-[50%] xl:w-[30%] '><Button>Enivar</Button></div>
        </div>
    </>
    
    ) : (
    
        <>
        <div className={`transition-all duration-1000  w-full h-[100vh]  sm:h-[91vh] lg:h-[100%] xl:h-[100%]  flex flex-col items-center justify-center gap-3  sm:gap-9 
           ${pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"}
           `}>
           
               <div>
                   <p className='text-2xl sm:text-4xl'>Cadastro</p>
               </div>
               <div className='flex flex-col gap-3 sm:gap-2  w-[80%] justify-center items-center sm:w-[100%] '>
               <div className='flex gap-2 flex-col '>
                       <label htmlFor="">Cpf</label>
                       <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh]  2xl:h-[6vh] rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                   </div>
   
                   <div className='flex gap-2 flex-col '>
                       <label htmlFor="">Email</label>
                       <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                   </div>
   
   
                   <div className='flex gap-2 flex-col '>
                       <label htmlFor="">Endereco</label>
                       <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                   </div>
   
   
                   <div className='flex gap-2 flex-col '>
                       <label htmlFor="">Nome</label>
                       <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                   </div>
   
                   <div className='flex gap-2 flex-col '>
                       <label htmlFor="">Senha</label>
                       <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                   </div>
   
                   <div className='flex gap-2 flex-col '>
                       <label htmlFor="">Sexo</label>
                       <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                   </div>
   
                   <div className='flex gap-2 flex-col '>
                       <label htmlFor="">Telefone</label>
                       <div className='w-[100%] sm:w-[70vh] md:w-[60vh] border-purple-500 border-[1px] flex items-center justify-center h-[6vh] 2xl:h-[6vh]  rounded-2xl transition shadow-purple-300 shadow-md hover:shadow-lg hover:shadow-purple-500 '><input name='email' type="text" placeholder='name@example.com..' className='w-[93%] rounded-full h-[60%] border-white outline-0 bg-transparent p-3' /></div>
                   </div>
   
   
         
               </div>
   
               <div className=' bg flex items-center justify-center w-[80%] sm:w-[50%] xl:w-[30%] '><Button>Enivar</Button></div>
           </div>
       </>
    
    )}
    
    </>
  )
  

}
