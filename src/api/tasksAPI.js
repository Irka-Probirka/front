import {API_URL} from "./API_URLS";

/*
 Получение всех задач, отсортированных по темам и предметам
 */
export const getAllTasksFiltered = async () => {

    const response = await fetch(API_URL + 'section');

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении всех заданий');
}

/*
 Получение всех задач простым списком для будущей возможности добавления каждой задачи в ДЗ
 */
export const getAllTask = async () => {

    const response = await fetch(API_URL + 'task');

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении всех заданий');
}