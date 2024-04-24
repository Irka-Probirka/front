import {API_URL} from "./API_URLS";


export const getCourses = async () => {
    const response = await fetch(API_URL + 'curses');

    if (response.ok)
        return await response.json()

    return Promise.reject('Ошибка при получении данных')
}


export const addCourseInProfile = async (user_id, course_id) => {
    const response = await fetch(API_URL + 'addcurse/', {
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "profile": user_id,
            "curse": course_id
        })
    });

    if (response.ok)
        return await response.json()

    return Promise.reject('Ошибка при покупке курса');
}


export const getCourseInProfile = async (user_id) => {
    if (!user_id) return Promise.reject('Данные пользователя отсутствуют')

    const response = await fetch(API_URL + 'profile/' + user_id);

    if (response.ok)
        return await response.json()

    return Promise.reject('Ошибка при получении приобритенных курсов')
}