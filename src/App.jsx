import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Login from './component/Login/Login';
import HR from './component/HR/HR';
import ClockIn from './component/ClockIn/ClockIn';
import Header from './component/Common/Header';
import { UserContextProvider } from './store/userContext';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter initialEntries={['/']} initialIndex={0} basename="">
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/HR/*" element={<HR />}></Route>
          <Route path="/clock" element={<ClockIn />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
