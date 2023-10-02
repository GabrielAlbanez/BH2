import {useEffect} from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Abertura from '../Pages/Abertura'
import Rifas from '../Pages/Rifas'
import toast, { Toaster } from 'react-hot-toast';
import { useTema } from '../common/context/Tema'

export default function MinhasRotas() {






    return (
        <BrowserRouter>
        <Navbar/>
        <Toaster 
          position="bottom-right"
          reverseOrder={false}/>
            <Routes>

                <Route path='/' element={<Abertura/>}/>
                <Route path='/Rifas' element={<Rifas/>}/>

            </Routes>

        </BrowserRouter>
    )
}
