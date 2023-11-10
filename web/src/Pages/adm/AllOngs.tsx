import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/TableDashboard'
import axios from 'axios';

export default function AllOngs() {

  type dataOng = {
    
      Voluntarios : []
      cnpj: string;
      nome: string;
      email: string;
      senha: string;
      telefone: string;
      endereco: string;
      redesSociais: string;
      aprovado: boolean;
      Logo: string;
      rifas: [{
          id: number;
          imgRifa: string;
          nome: string;
          preco: string;
          descricao: string;
          CpfUsuario: null;
          idOng: string;
      }];
      trabalhos: [];
 

  };

  const [dataOng, setDataOng] = useState<dataOng>();




  useEffect(() => {
    const url = "http://localhost:8080/allOngs";
    axios.get(url).then((response) => {
      const data = response.data;
      setDataOng(data.ongs[0]);
    });
  }, []);


  

  


  return (
    <div>
    <BasicTable ongs={dataOng} />
    </div>
  )
}
