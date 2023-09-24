import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home.tsx";
import Login from "./Login/Login.tsx";
import Register from "./Register/Register.tsx";

function App() {

    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
        </Routes>
    );
}

export default App
