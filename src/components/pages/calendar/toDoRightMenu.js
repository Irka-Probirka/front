import {useEffect} from "react";


const ToDoRightMenu = ({ lessonInProfileGroupBy }) => {

    const getDayName = (day) => {
        const dayNames = [
            "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
        ];
        return dayNames[day];
    };


    return (
        <section className={'text-center'}>
            <h3>Уроки в этом месяце</h3>
            <ul className={'mt-4'}>
                {lessonInProfileGroupBy?.map((item, index) => {
                    // Сгрупированные уроки по дате (дата ниже)
                    const date = new Date(item.date);
                    const fullMonth = date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
                    const fullDate = getDayName(date.getDay()) + ' ' + fullMonth;

                    return (
                        <li key={index} className={'animate-motionIn'}>
                            <span className={'text-red-500'}>{fullDate}</span>
                            {item?.lessons.map((lesson, index) =>
                                <div key={index} className={'m-1 p-1'}>
                                    <span className={'text-sm'}>{lesson.title}</span>
                                </div>
                            )}
                        </li>
                    )
                })
                }
            </ul>
        </section>
    );
};

export default ToDoRightMenu;