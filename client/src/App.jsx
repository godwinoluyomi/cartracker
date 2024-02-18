import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import VehicleRoutes from './pages/VehicleRoutes'
import Details from './pages/Details'
import MapRoutes from './pages/MapRoutes'
import NotFound from './pages/NotFound'
import Vehicles from './pages/Vehicles'
import History from './pages/History'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />} >
          <Route index element={<Vehicles />} />
          <Route path='/routes' element={<MapRoutes />} />
          <Route path='/vehicle/:vehicleId' element={<VehicleRoutes />} />
          <Route path='/history/:vehicleId' element={<History />} />
          <Route path='/details/:vehicleId' element={<Details />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
