import { useEffect } from "react";
import { Route, Routes, Navigate, useLocation, redirect } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Abertura from "../Pages/usuario/Abertura";
import Rifas from "../Pages/usuario/Rifas";
import toast, { Toaster } from "react-hot-toast";
import { useTema } from "../common/context/Tema";
import Register from "../Pages/usuario";
import Login from "../Pages/usuario/Login";
import Account from "../Pages/usuario/Account";
import { useDispatch } from "react-redux";
import { LogUser, saveDataOng, saveDataUser } from "../store/slices/AuthToken";
import { useAppSelector } from "../store/intex";
import Home from "../Pages/usuario/Home";
import Dashboard from "../Pages/usuario/Dashboard";
import Doação from "../Pages/usuario/Doação";
import HomeOng from "../Pages/ongs/HomeOng";
import { useTypeUser } from "../common/context/typeUserCadastro";
import NavbarOng from "../components/navbarOng";
import AccountOng from "../Pages/ongs/AccountOng";
import RifasOngs from "../Pages/ongs/RifasOngs";
import AjudantesPage from "../Pages/ongs/AjudantesPage";
import TrabalhosOngs from "../Pages/ongs/TrabalhosOngs";

export default function MinhasRotas() {
  const token2 = localStorage.getItem("token");

  const dispacht = useDispatch();

  const { pegarTypeUser, setPegarTypeUser } = useTypeUser() as {
    setPegarTypeUser: (value: string) => void;
    pegarTypeUser: string;
  };

  const isLoged = useAppSelector((state) => state.AuthToken.isLoged);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(`http://localhost:8080/verificarToken`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token2}`,
          },
          credentials: "include",
        });

        if (!request.ok) {
          throw new Error("A solicitação falhou");
        }

        const responseData = await request.json();

        console.log(responseData);

        if ("error" in responseData) {
          dispacht(LogUser(false));
        } else {
          dispacht(LogUser(localStorage.getItem("isLoged")));

          dispacht(saveDataOng([responseData?.data?.dataOng]));
          dispacht(saveDataUser([responseData?.data?.dataUser]));
        }
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 500000);

    return () => {
      clearInterval(interval);
    };
  }, []);





  const isLogedd = localStorage.getItem("isLoged");

 

  return (
    <BrowserRouter>
      {isLoged === "ongLogada" ? <NavbarOng /> : <Navbar />}

      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        {/* rotas de usuario e adm */}
        <Route path="/" element={<Abertura />} />

        <Route
          path="/Rifas"
          element={
            <ProtectedRoute user={isLogedd}>
              <Rifas />
            </ProtectedRoute>
          }
        />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Account"
          element={
            <ProtectedRoute user={isLogedd}>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Home"
          element={
            <ProtectedRoute user={isLogedd}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
              <Dashboard />
          }
        />

        <Route
          path="/Doação"
          element={
            <ProtectedRoute user={isLogedd}>
              <Doação />
            </ProtectedRoute>
          }
        />

        {/* rotas so para as ongs */}

        <Route
          path="/HomeOng"
          element={
            <ProtectedRouOng user={isLogedd}>
              <HomeOng />
            </ProtectedRouOng>
          }
        />
        <Route path="/AccountOng" element={<AccountOng />} />
        <Route path="/RfiasOng" element={<RifasOngs />} />
        <Route path="/AjudantesOng" element={<AjudantesPage />} />
        <Route path="/TrabalhosOngs" element={<TrabalhosOngs />} />
      </Routes>
    </BrowserRouter>
  );
}

interface propsProtectRoute {
  user: string | null;
  children: any;
}

const ProtectedRoute = ({ user, children }: propsProtectRoute) => {
  if (user === "false") {
    return <Navigate to={"/"} replace />;
  }
  return children;
};



const ProtectedRouOng = ({ user, children }: propsProtectRoute) => {
  if (user === "ongLogada") {
    return <Navigate to={"/"} replace />;
  }
  return children;
};
