import {API_URL, HOST_URL} from "./API_URLS";

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


export const checkCorrectAnswer = async (answer, task_id, profile_id = -1) => {
    const response = await fetch(HOST_URL + '/analys', {
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "answer": answer.toString(),
            "idTask": task_id,
            "idProfile": profile_id
        })
    });

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении ответа на задание');
}