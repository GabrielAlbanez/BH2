import React, { useEffect } from "react";
import { useAppSelector } from "../store/intex";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const navigator = useNavigate();
  const typeUser = User[0]?.tipo;

  useEffect(() => {
    if (typeUser === "admin") {
      navigator("/Dashboard");
    }
  }, [typeUser]);

  return <div>Home</div>;
}
