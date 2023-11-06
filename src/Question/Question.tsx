import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../constants.ts";

export default function Question() {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const {id} = useParams()

    const handleClick = (value) => {
        if (value == data.right_answer) {

            let temp: Array<any> = JSON.parse(localStorage.getItem('getted_levels'))
            if (data.pk in temp) {

            } else {
                temp.push(data.pk + 1)
                localStorage.setItem('getted_levels', JSON.stringify(temp))
            }

            window.location.href = `/level/question/${+id + 1}`;

        }
    };

    useEffect(() => {
        axios.get(`${apiUrl}/question/${id}/get_question_instance/`).then(response => {
            setData(response.data)
        })

    }, [])

    return <>
        <div className="flex flex-col">
            <div>
                <h1 className="font-medium">Вопрос: {data && data.question}</h1>
                <ul>
                    <li>
                        {data && data.answers.map((item, index) => (
                            <button onClick={() => handleClick(item)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl m-10"
                                    key={index}>{item}</button>
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