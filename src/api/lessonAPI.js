import {API_URL} from "./API_URLS";


export const getAllLessons = async () => {
    const response = await fetch(API_URL + 'lessons');

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении уроков')
}

/*
    Получение инфы об уроках лежаших в курсе по ID
 */
export const getLessonsInCourse = async (course_id) => {
    const response = await fetch(API_URL + 'lessonsInCourses/' + course_id);

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении уроков из курса')
}

/*
    Получение информации об уроке
 */
export const getLessonById = async (lesson_id) => {
    const response = await fetch(API_URL + 'someLessonsInCourses/' + lesson_id);

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении урока по id')
}