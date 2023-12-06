import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/intex';
import axios from 'axios';
import { useTema } from '../../common/context/Tema';


const ListLogos = () => {

    const { pegarTema } = useTema() as {
        pegarTema: string;
    };


    type dataLogos = {
        imagensDoacao: [
            {
                id: number;
                img: string;
                preco: number
            }
        ]



    }


    const [dataLogos, setDataLogos] = useState<dataLogos[]>([])



    const ong = useAppSelector((state) => state.AuthToken.dataOng) as Array<{
        cnpj: string;
    }>;

    const getDataLogos = async () => {
        const request = await axios.post('https://bh2-upl7.onrender.com/getAllLogosDoacoes', {
            cnpj: ong[0]?.cnpj
        })

        setDataLogos(request.data.message)
    }

    useEffect(() => {
        getDataLogos()
    }, [])




    const urll = dataLogos.map((logo) => logo.imagensDoacao.map((valor) => valor.img))
     
    const url = dataLogos.map((logo) => logo.imagensDoacao.map((valor) => valor.img.slice(18)))


    return (
        <div className={`w-full h-screen flex flex-col gap-32 items-center justify-center ${pegarTema === 'dark' ? "bg-black text-white" : "bg-[#CEF3FF] text-black"}`}>
            <h1 className='text-center text-3xl pt-3'>Logos</h1>

            {url.length > 0 ? (<div className='flex '>


                {dataLogos.map((logos, index) => (
                    <div className={` h-full
                     w-full  bg-black flex gap-10 items-center justify-center flex-wrap ${pegarTema === 'dark' ? "bg-black text-white" : "bg-[#CEF3FF] text-black"}`}>
                        {logos.imagensDoacao.map((valor, index) => (
                            <div className=' '>
                                <div className='w-full h-full ' >
                                    {url.length > 0 && (
                                        <div className="w-full h-full text-white ">

                                            <figure className="border-[3px] border-black rounded-full bg-white px-1 py-1  transition-all duration-1000 hover:scale-110 overflow-hidden">
                                              <img
                                                    src={`https://bh2-upl7.onrender.com/uploadsDoacaoImgs/${url[0][index]}`}
                                                    alt=""
                                                    className="rounded-full w-32 h-32 object-cover transition-all duration-1000 hover:scale-110  "
                                                />

                                            </figure>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </div>) : (<div className='h-full w-full flex justify-center items-center'><h1 className='text-xl sm:text-md text-center sm:text-center md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>Não a nehuma Logo feita...</h1></div>)}

        </div>
    )
}

export default ListLogos