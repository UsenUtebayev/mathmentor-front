import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiUrl} from "../constants.ts";

export default function Question() {
    const navigate = useNavigate();
    const [data, setData] = useState()
    const [wrongAnswer, setWrongAnswer] = useState()
    const [rightAnswer, setRightAnswer] = useState()


    const {id} = useParams()

    useEffect(() => {
        axios.get(`${apiUrl}/question/${id}`).then(response => {
            setData(response.data)
            return axios.get(`${apiUrl}/wrong_answer/?question=${id}`)
        }).then(response => {
            setWrongAnswer(response.data)
        })
    }, []);

    useEffect(() => {
        if (data && data.right_answer) {
            axios.get(`${apiUrl}/right_answer/${data.right_answer}`)
                .then(response => {
                    setRightAnswer(response.data);
                })
        }
    }, [data]);

    console.log(data)
    console.log(wrongAnswer)
    console.log(rightAnswer)
    return <>
        <div className="flex flex-col">
            <div>
                <h1 className="font-medium">Вопрос: {data && data.question}</h1>
                <div>
                    {wrongAnswer && wrongAnswer.map(item => (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl m-10"
                            key={item.id}>{item.answer}</button>
                    ))}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-xl font-bold py-2 px-4  m-10"
                            key={Date.now()}>{rightAnswer && rightAnswer.answer}</button>
                </div>

            </div>
            <button onClick={() => navigate(-1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10">
                Назад
            </button>
        </div>

    </>
}