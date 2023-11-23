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
        const request = await axios.post('http://localhost:8080/getAllLogosDoacoes', {
            cnpj: ong[0]?.cnpj
        })

        setDataLogos(request.data.message)
    }

    useEffect(() => {
        getDataLogos()
    }, [dataLogos])

    console.log(dataLogos)


    const url = dataLogos.map((logo) => logo.imagensDoacao.map((valor) => valor.img.slice(26)))

    console.log(url)

    return (
        <div className={`w-full h-[91vh] flex flex-col gap-32 items-center justify-center ${pegarTema === 'dark' ? "bg-black text-white" : "bg-[#CEF3FF] text-black"}`}>
            <h1 className='text-center text-2xl'>Logos</h1>

            {dataLogos.length > 0 ? (<div className='flex '>


                {dataLogos.map((logos, index) => (
                    <div className='flex gap-10 items-center flex-wrap '>
                        {logos.imagensDoacao.map((valor, index) => (
                            <div className=' '>
                                <div className='w-full h-full ' >
                                    {url.length > 0 && (
                                        <div className="w-full h-full text-white ">

                                            <figure className="border-[3px] border-black rounded-full bg-white px-1 py-1  transition-all duration-1000 hover:scale-110 overflow-hidden">
                                                <img
                                                    src={require(`../../uploadsDoacaoImgs/${url[0][index]}`)}
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

            </div>) : (<div className='h-full w-full flex justify-center items-center'><h1>Não a nehuma Logo feita...</h1></div>)}

        </div>
    )
}

export default ListLogos