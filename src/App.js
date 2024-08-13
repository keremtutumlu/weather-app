import { useState } from 'react';
import { Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Select.jsx';
import { Route } from 'react-router-dom';
import { Select } from './components/Select.jsx';
import { Show } from './components/Show.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="main">
      <Routes>
        <Route exact path='/' element={ <Select/> }/>
        <Route path='/show' element={ <Show/> }/>
      </Routes>
      <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
}

export default App;
