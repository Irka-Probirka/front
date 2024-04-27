import {API_URL} from "./API_URLS";


export const getAllLessons = async () => {
    const response = await fetch(API_URL + 'lessons');

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении уроков')
}

export const getLessonsInCourse = async (course_id) => {
    const response = await fetch(API_URL + 'lessonsInCourses/' + course_id);

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении уроков из курса')
}