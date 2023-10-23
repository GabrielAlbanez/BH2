import {useEffect} from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Abertura from '../Pages/Abertura'
import Rifas from '../Pages/Rifas'
import toast, { Toaster } from 'react-hot-toast';
import { useTema } from '../common/context/Tema'
import Register from '../Pages'
import Login from '../Pages/Login'
import Account from '../Pages/Account'
import { useDispatch } from 'react-redux'
import { LogUser, saveDataUser } from '../store/slices/AuthToken'
import { useAppSelector } from '../store/intex'
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'
import Doação from '../Pages/Doação'


export default function MinhasRotas() {


const token2 = localStorage.getItem("token");

    
  const dispacht = useDispatch();

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
              dispacht(saveDataUser([responseData?.dataUser?.dataUser]));
              dispacht(LogUser(true));
            }
          } catch (error) {
            console.error("Erro na solicitação:", error);
          }
        };
    
     
        fetchData();
    
        const interval = setInterval(fetchData, 60000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);


    return (
        <BrowserRouter>
        <Navbar/>
        <Toaster 
          position="bottom-right"
          reverseOrder={false}/>
            <Routes>

                <Route path='/' element={<Abertura/>}/>
                <Route path='/Rifas' element={<Rifas/>}/>
                <Route path='/Register' element={<Register/>}/>
                <Route  path='/Login' element={<Login/>}/>
                <Route  path='/Account' element={<Account/>}/>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Dashboard' element={<Dashboard/>}/>
                <Route path='/Doação' element={<Doação/>}/>

            </Routes>

        </BrowserRouter>
    )
}
