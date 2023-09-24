import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiUrl} from "../constants.ts";
import axios from "axios";

export default function Stage() {
    const [data, setData] = useState({})
    const {id} = useParams()
    const [levels, setLevels] = useState([])


    useEffect(() => {
        console.log(levels)
        setLevels(data.levels)
        axios.get(`${apiUrl}/stage/${id}`)
            .then((response) => {
                setData(response.data)

            })
            .catch((error) => {
                console.log(error)
            });

    }, [id]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {levels.map((level) => (
                        <a key={level} href="#" className="group">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src="#"
                                    alt="#"
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{level}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}