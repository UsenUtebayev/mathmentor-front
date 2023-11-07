import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../constants.ts";
import {CircleLoader} from "react-spinners";

export default function Question() {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [activeButtons, setActiveButtons] = useState([]);
    const [level, setLevel] = useState({})
    const handleClick = (value, index) => {
        if (value == data.right_answer) {

            let temp: Array<any> = JSON.parse(localStorage.getItem('getted_levels'))
            if (data.pk in temp) {

            } else {
                temp.push(data.pk + 1)
                localStorage.setItem('getted_levels', JSON.stringify(temp))
            }

            window.location.href = `/level/question/${+id + 1}`;

        }
        else {
            const newActiveButtons = [...activeButtons];

            newActiveButtons.push(index);
            setActiveButtons(newActiveButtons);
        }
    };

    const active = 'bg-blue-500 text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 py-2 px-4 rounded-xl m-10  lg:hover:animate-wiggle animate-ease-in text-3xl'
    const inActive = 'bg-blue-500 text-white font-bold bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500 py-2 px-4 rounded-xl m-10 animate-ease-in text-3xl transition-all animate-fade animate-once animate-duration-1000 animate-ease-in-out animate-reverse'

    useEffect(() => {
        axios.get(`${apiUrl}/question/${id}/get_question_instance/`).then(response => {
            setData(response.data)
        })
        axios.get(`${apiUrl}/get-level/${id}/`).then(response => {
            setLevel(response.data)
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])

    console.log(level)
    return (isLoading ? (<div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center animate-fade">
        <CircleLoader color="#3498db" size={100}/>
    </div>) :(
        <div className="flex flex-col m-12 content-center items-center">
            <div >
                <h1 className="font-medium text-3xl">Вопрос: {data && data.question}</h1>

                <ul >
                    <li>
                        {data && data.answers.map((item, index) => (
                            <button onClick={() => handleClick(item, index)}
                                    className={activeButtons.includes(index) ? inActive : active}
                                    key={index}>{item}</button>
                        ))}
                    </li>
                </ul>

                <h1 className={"text-9xl font-bold text-red-400 animate-spin animate-infinite animate-duration-[2500ms] animate-ease-in animate-reverse"}>?</h1>
            </div>
            <button onClick={() => window.location.href = `/level/${level.id}`}
                    className="bg-blue-500 w-40  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10">
                Назад
            </button>
        </div>
    ))
}