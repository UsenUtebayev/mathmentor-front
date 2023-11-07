import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiUrl} from "../constants.ts";
import axios from "axios";
import {CircleLoader} from "react-spinners";

export default function Level() {
    const [data, setData] = useState([])
    const {id} = useParams()
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    console.log(data)
    const handleClick = () => {
        navigate("/");
    }

    useEffect(() => {
        axios.get(`${apiUrl}/filter-questions/${id}/`)
            .then((response) => {
                setData(response.data)

            })
            .catch((error) => {
                console.log(error)
            });
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, [id]);

    let temp = JSON.parse(localStorage.getItem('getted_levels'))

    return (isLoading ? (<div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center animate-fade">
            <CircleLoader color="#3498db" size={100}/>
        </div>) : (
            <main className="flex flex-col animate-fade">
                <div className={"flex rounded-2xl p-6"}>
                    {
                        data.map((iid) => (
                            <a href={`question/${iid.id}`} key={iid.id}
                               className={`${temp.includes(iid.id) ? 'm-2 p-5 rounded-xl w-40 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-blue-700 font-bold transition-colors lg:hover:animate-jump hover:animate-duration-1000' : ' m-2 p-5 rounded-xl from-pink-500 bg-gradient-to-r to-yellow-500 font-bold transition-colors pointer-events-none'}`}>
                                <span className={"text-white text-3xl"}>{iid.id}</span>
                            </a>
                        ))
                    }
                </div>
                <button onClick={handleClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10 transition-colors lg:active:animate-jump">
                    К выбору уровней
                </button>
            </main>)

    )
}