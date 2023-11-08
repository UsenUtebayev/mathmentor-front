import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../constants.ts";
import {CircleLoader} from 'react-spinners';

export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(data)

    function logout() {
        localStorage.removeItem('auth_token')
        location.reload();
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem('auth_token')
            if (token == null) navigate('/login')
        }
        if (localStorage.getItem('getted_levels') == null) {
            localStorage.setItem('getted_levels', JSON.stringify([1]))
        }
        axios.get(`${apiUrl}/level/`)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, [navigate]);


    return (isLoading ? (<div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center animate-fade">
                <CircleLoader color="#3498db" size={100}/>
            </div>) :
            (<main className="m-10 animate-fade">
                <div className="">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div
                            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {data.map((level) => (
                                <a key={level.id} href={`level/${level.id}`} className="group">
                                    <div className="flex  items-center justify-center bg-slate-100">
                                        <div className="group h-96 w-80 [perspective:1000px]">
                                            <div
                                                className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                                <div className="absolute inset-0">
                                                    <img
                                                        className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                                                        src={level.image}
                                                        alt="Level img"/>
                                                </div>
                                                <div
                                                    className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                                    <div
                                                        className="flex min-h-full flex-col items-center justify-center">
                                                        <h1 className="text-xl font-bold">{level.name}</h1>
                                                        <p className="text-base">Количество
                                                            вопросов: {level.questions.length}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10 lg:hover:animate-jump"
                    onClick={logout}>
                    Выйти с аккаунта
                </button>

            </main>)
    )
}
