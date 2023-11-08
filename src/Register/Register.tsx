import axios from "axios";
import {authUrl} from '../constants.ts'
import icon from '../assets/logo-no-background.svg'
import {FormEvent, ReactNode, useState} from "react";

export default function Register() {
    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState<string[]>([])

    const errorElements = errors.map((item, index) => (
        <li key={index}>{item as ReactNode}</li>
    ));

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        try {
            await axios.post(`${authUrl}/auth/users/`, {
                "username": formData.get("username"),
                "password": formData.get("password"),
                "confirm-password": formData.get("confirm-password")
            }).then(
                function (response) {
                    localStorage.setItem('auth_token', response.data['auth_token'])
                    window.location.replace("/");
                }
            )
        } catch (e: any) {
            let temp: string[] = []
            Object.keys(e.response.data).forEach((element) => {
                e.response.data[element].forEach((i: string) => {
                    temp.push(i)
                })
            })
            // @ts-ignore
            setErrors(temp)

            setIsActive(true)
        }


    }

    return (<>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={icon}
                        alt="mathmentor"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Регистрация
                    </h2>
                </div>

                <h3 className={isActive ? "active" : "nonactive"}>
                    <ol className="text-red-400">
                        {errorElements}
                    </ol>
                </h3>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Ваш никнейм
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="mathmaster2000" id="username" name="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Ваш пароль
                                </label>
                            </div>
                            <div className="mt-2 mb-2">
                                <input
                                    type="password" name="password" id="password" placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Повторите пароль
                                </label>
                            </div>
                            <div className="mt-2 ">
                                <input
                                    type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Войти
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Хотите войти?{' '}
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Вход
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}