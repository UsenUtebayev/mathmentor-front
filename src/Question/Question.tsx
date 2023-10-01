import {useNavigate, useParams} from "react-router-dom";

export default function Question() {
    const navigate = useNavigate();

    const {id} = useParams()

    return <>
        {id}
        <button onClick={() => navigate(-1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10">
            Назад
        </button>
    </>
}