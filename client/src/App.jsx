import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import VehicleMap from './pages/VehicleMap'
import Location from './pages/Location'
import MapRoutes from './pages/MapRoutes'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />} >
          <Route index element={<MapRoutes />} />
          <Route path='/location' element={<Location />} />
          <Route path='/vehicle/:vehicleId' element={<VehicleMap />} />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
