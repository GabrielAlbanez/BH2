import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type TemaContextType = {
  pegarTema: string;
  setPegarTema: (value: string) => void;
};

const temaContext = createContext<TemaContextType | undefined>(undefined);

type TemaProps = {
  children: ReactNode;
};

export default function TemaProvider({ children }: TemaProps) {
  const temaInicial = localStorage.getItem('tema') || 'light'; // Pega o tema do localStorage, se disponível
  const [pegarTema, setPegarTema] = useState<string>(temaInicial);

  // Função para atualizar o tema e armazená-lo no localStorage
  const atualizarTema = (novoTema: string) => {
    setPegarTema(novoTema);
    localStorage.setItem('tema', novoTema);
  };

  return (
    <temaContext.Provider value={{ pegarTema, setPegarTema: atualizarTema }}>
      {children}
    </temaContext.Provider>
  );
}

export function useTema(): TemaContextType | undefined {
  const tema = useContext(temaContext);
  return tema;
}
