import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home.tsx";
import Login from "./Login/Login.tsx";
import Register from "./Register/Register.tsx";
import Stage from "./Stage/Stage.tsx";

function App() {

    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route
                path="stage/:id"
                element={<Stage/>}
            />
        </Routes>
    );
}

export default App
