import React, { useContext, useEffect, useState } from 'react';
import { useTema } from '../../common/context/Tema';
import toast from 'react-hot-toast';
import { BsSun, BsMoonStars } from 'react-icons/bs';

function ButtonTradeTheme() {


  const { pegarTema,setPegarTema } = useTema() as {
    pegarTema: string;
    setPegarTema: (value: string) => void;
  };


  const notify = () => toast(`${pegarTema === 'dark' ? "tema light ativo" : 'tema dark ativo'}`,{
    icon: `${pegarTema === 'dark' ? "🌞" : "🌑"}`,
    style : {
      borderRadius : '10px',
      background : `${pegarTema === 'dark' ? "white" : "#333"}`,
      color : `${pegarTema === 'dark' ? "black" : "white"}`
    }
  });


  return (
   <div onClick={notify} className=' mt-3 mr-6 xl:mt-0 xl:mr-0 '>
    {
      pegarTema === 'dark' ? (<><BsMoonStars onClick={()=>setPegarTema('light')} size={23}/></>) : <><BsSun onClick={()=>setPegarTema('dark')} size={30}/></>
    }
     
   </div>
  );
}

export default ButtonTradeTheme;
