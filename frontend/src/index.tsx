import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import CreateJam from './pages/CreateJam';
import Jam from './pages/Jam';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/rankking" element={<App/>}/>
      <Route path="/registration" element={<Registration/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/createJam" element={<CreateJam/>}/>
      <Route path="/jam/:id" element={<Jam/>}/>
    </Routes>
    </BrowserRouter>
  // </React.StrictMode>

);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
