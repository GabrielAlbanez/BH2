import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Abertura from '../Pages/Abertura'
import Rifas from '../Pages/Rifas'

export default function MinhasRotas() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>

                <Route path='/' element={<Abertura/>}/>
                <Route path='/Rifas' element={<Rifas/>}/>

            </Routes>

        </BrowserRouter>
    )
}
