import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../constants.ts";

export default function Question() {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const {id} = useParams()
    const [clickedValue, setClickedValue] = useState()
    useEffect(() => {
        axios.get(`${apiUrl}/question/${id}/get_question_instance/`).then(response => {
            setData(response.data)
        })

    }, [])
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function checkAnswer(value) {
        console.log(value)
    }


    return <>
        <div className="flex flex-col">
            <div>
                <h1 className="font-medium">Вопрос: {data && data.question}</h1>
                <ul>
                    <li>
                        {data && data.answers.map((item, index) => (
                            <button onClick={checkAnswer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl m-10" key={index}>{item}</button>
                        ))}
                    </li>
                </ul>
            </div>
            <button onClick={() => navigate(-1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10">
                Назад
            </button>
        </div>

    </>
}