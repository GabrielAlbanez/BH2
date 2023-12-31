import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/intex';
import { useNavigate } from 'react-router-dom';
import { useTema } from '../../common/context/Tema';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';

export default function SorteiosRifas() {
  type dataRifaSorteada = {
    imgRifa: string;
    nome: string;
    preco: number;
    descricao: string;
    sorteado: boolean;
    ganhador: string;
    numeroSorteado: string;
  };

  const [dataRifaSorteada, setDataRifaSorteada] = useState<dataRifaSorteada[]>([]);

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const navigator = useNavigate();

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const getRifasSorteados = async () => {
    const req = await axios.get('https://bh2-upl7.onrender.com/getAllRifasSorteadas').then((response) => {
      setDataRifaSorteada(response.data.rifa);
    });
  };

  useEffect(() => {
    getRifasSorteados();
  }, [dataRifaSorteada]);

  const notify = (message: string) => {
    toast(message, {
      icon: `${pegarTema === 'dark' ? '🌑' : ' 🌞'}`,
      style: {
        borderRadius: '10px',
        background: `${pegarTema === 'dark' ? '#333' : 'white'}`,
        color: `${pegarTema === 'dark' ? 'white' : 'black'}`,
      },
    });
  };

  const url = dataRifaSorteada.map((rifa) => rifa.imgRifa.slice(16));
  const cpf = User[0]?.cpf;

  return (
    <div
      className={`w-full min-h-[100vh] sm:min-h-[91vh] transition-all duration-1000 flex flex-col items-center justify-center gap-5 py-5 ${pegarTema === 'dark' ? 'bg-black text-white' : 'bg-[#CEF3FF]'
        }`}
    >
      {dataRifaSorteada.length > 0 ? (<>
        <h1 className="text-4xl font-bold mb-12">Sorteios</h1>
        {dataRifaSorteada.length > 0 && url.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            {dataRifaSorteada.map((rifa, index) => (
              <div
                key={rifa.ganhador}
                className="max-w-sm  overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-[1700ms] ease-in-out transform hover:-translate-y-10 rounded-2xl"
              >
                {url.length > 0 && (<img className="w-60 h-60 object-cover transform transition-transform duration-[1700ms] hover:scale-110"
                  src={`https://bh2-upl7.onrender.com/uploadsImgRifas/${url[index]}`}

                  alt={rifa.nome} />)}

                <div className="p-4">
                  <h2 className="font-bold text-2xl text-gray-600  mb-2">{rifa.nome}</h2>
                  <p className="text-gray-600 text-sm">{rifa.descricao}</p>
                  <p className="text-gray-800 font-bold mt-2">preço: ${rifa.preco}</p>
                  {rifa.sorteado ? (
                    <>
                      <p className="text-green-500 font-bold mt-2">Sorteado</p>
                      <p className="text-gray-800 font-bold mt-2">Ganhador: {rifa.ganhador}</p>
                      {rifa.numeroSorteado && (
                        <p className="text-gray-800 font-bold mt-2">
                          Número Sorteado: {rifa.numeroSorteado}
                        </p>
                      )}
                      {rifa.ganhador === cpf ? (
                        <p className="text-green-500 font-bold mt-2">Parabéns, você ganhou esta rifa!</p>
                      ) : (
                        <p className="text-red-500 font-bold mt-2"></p>
                      )}
                    </>
                  ) : (
                    <p className="text-orange-500 font-bold mt-2">Aguardando sorteio</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="  text-center text-lg sm:text-xl  md:text-2xl">Ainda não foi realizado nenhum sorteio de nenhuma rifa, aguarde por favor...</h1>
          </div>
        )}
      </>) : (<div className="w-full h-[91vh] flex flex-col items-center justify-center">
        <h1 className="  text-center text-lg sm:text-xl  md:text-2xl">Ainda não foi realizado nenhum sorteio de nenhuma rifa, aguarde por favor...</h1>

      </div>)}

    </div>
  );
}
