import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// root.render(
  // <React.StrictMode>
    // <BrowserRouter>
    // <Routes>
    //   <Route path="/" element={<Login/>}/>
    //   <Route path="/page_not_found" element={<NotFoundPage/>}/>
    //   <Route path="/rankking" element={<App/>}/>
    //   <Route path="/registration" element={<Registration/>}/>
    //   <Route path="/dashboard" element={<Dashboard/>}/>
    //   <Route path="/createJam" element={<CreateJam/>}/>
    //   <Route path="/jam/:id" element={<Jam/>}/>
    //   {/* Catch-all route */}
    //   <Route path="*" element={<Navigate to="/page_not_found" replace />} />
    // </Routes>
    // </BrowserRouter>
  // </React.StrictMode>

// );

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
