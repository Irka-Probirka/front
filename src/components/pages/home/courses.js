import Button from "../../button";
import {addCourseInProfile} from "../../../api/coursesAPI";
import {useAuth} from "../../../hooks/useAuth";
import {useContext} from "react";


const CourseCard = ({course, isBuyed, ...props}) => {
    const {user, isAuth} = useAuth();

    return (
        <div
            className={`
                p-3 rounded
                has-[:disabled]:opacity-50 opacity-1
                has-[:disabled]:animate-opacityHide50
                dark:hover:outline-royal-blue-600
                bg-gradient-to-br to-70%
                from-royal-blue-200 to-royal-blue-300 text-black
                dark:from-royal-blue-600 dark:to-royal-blue-950 dark:text-royal-blue-50
            `}
            {...props}
        >
            <p className={'text-royal-blue-900 dark:text-royal-blue-50 text-xs'}>{course.subject.title}</p>
            <p className={'text-lg mt-1'}>
                {course.title}
            </p>
            <p className={'text-sm'}>{course.about}</p>
            <p className={'text-sm'}>{course.information}</p>
            <p className={'text-right'}>Цена: {course.price} руб</p>
            {!!isAuth &&
                <Button
                    type={'flat'}
                    disable={isBuyed}
                    onClick={() => {
                        addCourseInProfile(user.profile, course.id)
                            .then(res => console.log('Успешная покупка курса!'))
                            .catch(reason => console.log(reason));
                    }}
                >
                    Купить курс
                </Button>
            }
        </div>
    )
}


const Courses = ({ courses, coursesInProfile }) => {
    const {user, isAuth} = useAuth();

    if (courses?.length === 0) {
        return (
            <div className={'flex justify-center'}>
                <p>Загрузка курсов</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6 animate-spin">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                </svg>
            </div>
        )
    }

    return (
        <div className={'grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}>
            {courses?.map((item, index) => {
                if (coursesInProfile?.curses?.find(object => object.id === item.id)) {
                    return (
                        <CourseCard course={item} key={index} isBuyed={true}/>
                    )
                }

                return (
                    <CourseCard course={item} key={index}/>
                )
            })}
        </div>
    )
}

export default Courses;