import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/TableDashboard';

export default function AllRifas() {


  type dataRifa = {
    id: number;
    imgRifa: string;
    nome: string;
    preco: string;
    descricao: string;
    CpfUsuario: string;
    idOng: string;
    ong: {
      cnpj: string;
      nome: string;
      email: string;
      senha: string;
      telefone: string;
      endereco: string;
      redesSociais: string;
      aprovado: boolean;
      Logo: string;
    };
    NumeroComprado: {
      id: number;
      numero: number;
      rifaId: number;
      usuarioCpf: string;
    };
  }



  const [dataRifa,seDataRifa] = useState<dataRifa>()


  useEffect(() => {
    const url = "http://localhost:8080/getAllRifas";
    axios.get(url).then((response) => {
      const data = response.data;
      seDataRifa(data.rifas[0]);
    });
  }, []);

  return (
    <div>
       <BasicTable rifas={dataRifa}/>
    </div>
  )
}
