import React from 'react'
import { useTypeUser } from '../../common/context/typeUserCadastro'

export default function Register() {


    const {pegarTypeUser,setPegarTypeUser} = useTypeUser() as {
        setPegarTypeUser : (value: string) => void;
        pegarTypeUser : string
      }


  return (
    <div>
        <div>
            <h1>Bem Vindo ao Be Human</h1>
        </div>
        <div>
            <p>Cadastre-se para continuar sua jornada de doação</p>
        </div>
        <div>
            <div>
                <label htmlFor=""></label>
                <input type="text" name="" id="" />
            </div>    
        </div> 
    </div>
  )
}
