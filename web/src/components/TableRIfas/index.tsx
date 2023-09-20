import { useState } from 'react';

interface propNumbers {
  numbers: Array<number>;
}

export default function TableRifas({ numbers }: propNumbers) {
  const [numerosSelecionados, setNumerosSelecionados] = useState<Array<number>>([]);

  const pegarNumero = (numero: number) => {
    if (numerosSelecionados.includes(numero)) {
      // Se o número já estiver selecionado, remova-o da lista de números selecionados.
      setNumerosSelecionados((prevNumerosSelecionados) =>
      //esse fiter ele ta removendo todos os numeros que ja foram selecionados ai vira uma array friltrado so dos numeros que foram retirados no casos clikados
        prevNumerosSelecionados.filter((num) => num !== numero)
      );
    } else {
      // Se o número não estiver selecionado, adicione-o à lista de números selecionados.
      //ai quando vc selecionar ele vai ser removido e vai la para o array filtrado
      setNumerosSelecionados((prevNumerosSelecionados) => [
        ...prevNumerosSelecionados,
        numero,
      ]);
    }
  };

  console.log(numerosSelecionados)

  return (
    <div className="h-[100%] w-full  flex items-center justify-center">
      <div className='w-[50%] h-[73%] grid grid-cols-6 gap-16 bg-zinc-50 rounded-3xl shadow-fuchsia-400 shadow-2xl py-10 pl-10'>
        {numbers.map((numero, index) => (
          <div
            className={`rounded-full w-[50%] border-[2px] flex items-center justify-center px-3 py-2 border-fuchsia-500 cursor-pointer
                    ${numerosSelecionados.includes(numero) ? 'bg-purple-500' : ''}
                    `}
            key={index}
            onClick={() => pegarNumero(numero)}
          >
            <p>{numero}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
