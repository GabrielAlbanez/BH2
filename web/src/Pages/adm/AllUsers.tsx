import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/intex';
import { useNavigate } from 'react-router-dom';
import sockett from '../../common/io/io';

export default function AllUsers() {
  const [dataUsers, setDataUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userConecteds, setUserConecteds] = useState([]);
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const cpf = User[0]?.cpf;

  useEffect(() => {
    const url = `http://localhost:8080/allUsers/${cpf}`;
    axios.get(url).then((response) => {
      const data = response.data;
      setDataUsers(data.users);
    });

    sockett.emit('authenticate', cpf);
    sockett.on('allUserConected', (dados: any) => {
      setUserConecteds(dados.usuarios.connectedUsers);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = dataUsers.filter((user : any) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Userr = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const typeUser = Userr[0]?.tipo;

  const navigation = useNavigate();

  useEffect(() => {
    if (typeUser !== 'admin') {
      navigation('/');
    }
  }, [typeUser]);

  return (
    <div className="mt-8 mx-4">
      <h2 className="text-3xl font-bold mb-4">Dashboard de Usuários</h2>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">
            Usuários logados neste momento: {Object.keys(userConecteds).length}
          </h1>
        </div>
        <div className="relative">
          <label htmlFor="search" className="absolute inset-y-0 left-0 flex items-center pl-2">
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
          </label>
          <input
            type="text"
            id="search"
            onChange={handleSearch}
            value={searchTerm}
            className="pl-8 pr-2 py-2 w-64 border border-gray-300 rounded"
            placeholder="Buscar usuários"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">CPF</th>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Sexo</th>
              <th className="py-2 px-4 border-b">Endereço</th>
              <th className="py-2 px-4 border-b">Tipo</th>
              <th className="py-2 px-4 border-b">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user : any) => (
              <tr key={user.cpf} className="border-b text-center">
                <td className="py-2 px-4">{user.cpf}</td>
                <td className="py-2 px-4">{user.nome}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.sexo}</td>
                <td className="py-2 px-4">{user.endereco}</td>
                <td className="py-2 px-4">{user.tipo}</td>
                <td className="py-2 px-4">{user.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
