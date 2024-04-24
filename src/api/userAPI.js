import {API_URL, HOST_URL} from "./API_URLS";


export const getUserId = async () => {
    const response = await fetch(
        `${HOST_URL}/auth/users/me`,
        {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
    )

    if (response.ok)
        return await response.json()

    return Promise.reject('Ошибка при получении id пользователя')
}


export const getUserData = async () => {

    if (localStorage.getItem('auth') === 'false')
        return Promise.reject('Вы не авторизированы')


    const userId = await getUserId();
    const response = await fetch(API_URL + 'users/' + userId.id);

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении данных пользователя')

}