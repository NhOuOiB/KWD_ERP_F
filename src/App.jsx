import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Login from './component/Login/Login';
import HR from './component/HR/HR';
import Header from './component/Common/Header';

function App() {
  return (
    <BrowserRouter initialEntries={['/']} initialIndex={0}>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/HR/*" element={<HR />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
