import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/intex';
import BasicTable from '../../components/TableDashboard';

export default function AllUsers() {



  type dataUser = {
    cpf: string;
      nome: string;
      email: string;
      senha: string;
      sexo: string;
      endereco: string;
      tipo: string;
      telefone: string;
      numerosComprados: {
        id: number;
        numero: number;
        rifaId: number;
        usuarioCpf: string;
      };
  }

  const [dataUsers,setDataUsers] = useState<dataUser>()

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const cpf = User[0]?.cpf

  useEffect(() => {
    const url = `http://localhost:8080/allUsers/${cpf}`;
    axios.get(url).then((response) => {
      const data = response.data;
      setDataUsers(data.users[0]);
    });
  }, []);

  return (
    <BasicTable usuarios={dataUsers}/>
  )
}
