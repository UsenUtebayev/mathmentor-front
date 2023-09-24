import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../constants.ts";

export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([])

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
        axios.get(`${apiUrl}/stage/`)
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            });

    }, [navigate]);


    return (
        <main className="m-10 ">
            <div className="">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div
                        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {data.map((stage) => (
                            <a key={stage.id} href={stage.id} className="group">
                                <div
                                    className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={stage.image}
                                        alt={"stage image"}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">Количество уровней: {stage.levels.length}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{stage.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10" onClick={logout}>
                Выйти с аккаунта
            </button>

        </main>
    )
}
