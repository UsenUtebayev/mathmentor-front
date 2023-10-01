import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home.tsx";
import Login from "./Login/Login.tsx";
import Register from "./Register/Register.tsx";
import Level from "./Level/Level.tsx";
import Question from "./Question/Question.tsx";

function App() {

    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route
                path="level/:id"
                element={<Level/>}
            />
            <Route
                path="level/question/:id"
                element={<Question/>}
            />
        </Routes>
    );
}

export default App
