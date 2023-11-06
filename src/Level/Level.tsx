import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiUrl} from "../constants.ts";
import axios from "axios";

export default function Level() {
    const [data, setData] = useState([])
    const {id} = useParams()
    const navigate = useNavigate();

    console.log(data)
    const handleClick = () => {
        navigate("/");
    }

    useEffect(() => {
        axios.get(`${apiUrl}/question/?level_id=1`)
            .then((response) => {
                setData(response.data)

            })
            .catch((error) => {
                console.log(error)
            });


    }, [id]);

    let temp = JSON.parse(localStorage.getItem('getted_levels'))

    return (
        <main className="flex flex-col">
            <div className={"flex rounded-2xl p-6"}>
                {
                    data.map((iid) => (
                        <a href={`question/${iid.id}`} key={iid.id}
                           className={`${temp.includes(iid.id) ? 'p-5 rounded-xl bg-blue-500 hover:bg-blue-700 font-bold transition-colors' : 'p-5 rounded-xl bg-gray-600 font-bold transition-colors pointer-events-none'}`}>
                            <span className={"text-white text-3xl"}>{iid.id}</span>
                        </a>
                    ))
                }
            </div>
            <button onClick={handleClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10 transition-colors">
                К выбору уровней
            </button>
        </main>

    )
}