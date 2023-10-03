import React, { createContext, ReactNode, useContext, useState } from 'react';

type TemaContextType = {
  pegarTema: string;
  setPegarTema: React.Dispatch<React.SetStateAction<string>>;
};

const temaContext = createContext<TemaContextType | undefined>(undefined);

type TemaProps = {
  children: ReactNode;
};

export default function TemaProvider({ children }: TemaProps) {
  const [pegarTema, setPegarTema] = useState<string>('light');



  return (
    <temaContext.Provider value={{pegarTema,setPegarTema}}>
      {children}
    </temaContext.Provider>
  );
}

export function useTema() : TemaContextType | undefined{
    const tema = useContext(temaContext)
    return tema
}
