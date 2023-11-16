import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../store/intex';
import { useNavigate } from 'react-router-dom';

export default function AllOngs() {
  type dataOng = {
    Voluntarios: [];
    cnpj: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    endereco: string;
    redesSociais: string;
    aprovado: boolean;
    Logo: string;
    rifas: [
      {
        id: number;
        imgRifa: string;
        nome: string;
        preco: string;
        descricao: string;
        CpfUsuario: null;
        idOng: string;
      }
    ];
    trabalhos: [];
  };
  const [dataOng, setDataOng] = useState<dataOng[]>([]);
  const [buscarData, setBuscarData] = useState('');

  useEffect(() => {
    const url = 'http://localhost:8080/allOngs';
    axios.get(url).then((response) => {
      const data = response.data;
      setDataOng(data.ongs);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuscarData(event.target.value);
  };

  const filteredOngs = dataOng.filter((ong) =>
    ong.nome.toLowerCase().includes(buscarData.toLowerCase())
  );

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const typeUser = User[0]?.tipo;

  const navigation = useNavigate();

  useEffect(() => {
    if (typeUser !== 'admin') {
      navigation('/');
    }
  }, [typeUser]);

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-3xl font-bold mb-4">Dashboard de ONGs</h2>
      <div className="mb-4 flex items-center">
        <div className="relative">
          <input
            type="text"
            id="search"
            onChange={handleSearch}
            value={buscarData}
            className="p-2 border border-gray-300 pr-8 rounded"
            placeholder="Buscar ONGs"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-5-5m-1.485-8A9.503 9.503 0 0112 2a9.5 9.5 0 010 19 9.5 9.5 0 010-19 9.5 9.5 0 019.5 9.5c0 2.215-.76 4.26-2.022 5.862"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">CNPJ</th>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Telefone</th>
              <th className="py-2 px-4 border-b">Endereço</th>
              <th className="py-2 px-4 border-b">Redes Sociais</th>
              <th className="py-2 px-4 border-b">Rifas</th>
              <th className="py-2 px-4 border-b">Preço</th>
            </tr>
          </thead>
          <tbody>
            {filteredOngs.map((ong, index) => (
              <tr key={ong.cnpj} className="border-b text-center">
                <td className="py-2 px-4">{ong.cnpj}</td>
                <td className="py-2 px-4">{ong.nome}</td>
                <td className="py-2 px-4">{ong.email}</td>
                <td className="py-2 px-4">{ong.telefone}</td>
                <td className="py-2 px-4">{ong.endereco}</td>
                <td className="py-2 px-4">{ong.redesSociais}</td>
                <td className="py-2 px-4 ">
                  {ong.rifas.map((rifa) => (
                    <div key={rifa.id} className="">
                      <p>{rifa.nome}</p>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 ">
                  {ong.rifas.map((rifa) => (
                    <div key={rifa.id} className="">
                      <p>{rifa.preco}</p>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
