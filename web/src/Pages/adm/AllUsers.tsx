
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";
import sockett from "../../common/io/io";
import { useTema } from "../../common/context/Tema";

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
  };

  const [dataUsers, setDataUsers] = useState<dataUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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


    sockett.emit("authenticate", cpf);
    sockett.on("allUserConected", (dados: any) => {


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

    if (typeUser !== "admin") {
      navigation("/");
    }
  }, [typeUser]);

  // const valores = Object.values()


  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  return (
    <div className={`h-screen w-full sm:h-[100vh] transition-all duration-1000 p-4 rounded-lg ${pegarTema === "dark" ? "bg-black text-white" : "bg-blue-200"}`}>
    <h2 className="text-3xl font-bold mb-4 pt-10">Lista de Usuários</h2>
    <h1 className="text-lg mb-2">Usuários logados nesse momento: {Object.keys(userConecteds).length}</h1>
  
    <div className="mb-4">
      <label htmlFor="search" className="mr-2">Busca:</label>
      <input
        type="text"
        id="search"
        onChange={handleSearch}
        value={searchTerm}
        className={`p-2 rounded ${pegarTema === 'dark' ? 'text-black' : 'text-black'} bg-gray-100`}
      />
    </div>
  
    <div className="overflow-x-auto">
      <table className={`min-w-full border-gray-300 transition-all duration-1000 rounded-lg ${pegarTema === "dark" ? "bg-gray-800 text-white" : "bg-blue-100"}`}>
        <thead className="">
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
          {filteredUsers.map((user: any) => (
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
