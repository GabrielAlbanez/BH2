import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type dataProps = {
  ongs : {
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
   
    }    | undefined,

//   rifas?: [
//     {
//       id: number;
//       imgRifa: string;
//       nome: string;
//       preco: string;
//       descricao: string;
//       CpfUsuario: string;
//       idOng: string;
//       ong: {
//         cnpj: string;
//         nome: string;
//         email: string;
//         senha: string;
//         telefone: string;
//         endereco: string;
//         redesSociais: string;
//         aprovado: boolean;
//         Logo: string;
//       };
//       NumeroComprado: {
//         id: number;
//         numero: number;
//         rifaId: number;
//         usuarioCpf: string;
//       };
//     }
//   ],
//   usuarios?: [
//     {
//       cpf: string;
//       nome: string;
//       email: string;
//       senha: string;
//       sexo: string;
//       endereco: string;
//       tipo: string;
//       telefone: string;
//       numerosComprados: {
//         id: number;
//         numero: number;
//         rifaId: number;
//         usuarioCpf: string;
//       };
//     }
//   ];
};

export default function BasicTable({ ongs }: dataProps) {
  console.log(ongs);

  return (
    <div>
      <table>
        {ongs && (
          <>
            <h1>{ongs.nome}</h1>
          </>
        )}
        {/* {rifas && <></>}
        {usuarios && <></>} */}
      </table>
    </div>
  );
}
