


const CourseGrid = ({courses, setSelectedCourse}) => {

    const handleSelectCourse = (course_id) => {
        return () => setSelectedCourse(courses.find(course => course.id === course_id));
    }

    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'}>
            {courses.map((item, index) =>
                <div
                    id={item.id}
                    key={index}
                    className={`
                            hover:cursor-pointer select-none
                            grid grid-cols-[120px,_1fr] md:flex items-center space-x-4 md:space-x-2 text-white rounded-2xl
                            py-3.5 px-3 
                            bg-gradient-to-br from-royal-blue-400 dark:from-royal-blue-600 
                            to-royal-blue-600 dark:to-zinc-800 
                            border border-solid border-royal-blue-600 dark:border-zinc-800
                        `}
                    onClick={handleSelectCourse(item.id)}
                >
                    <span
                        className={'text-sm text-center min-w-max w-full md:w-max mx-auto md:mx-0 rounded-md py-1 px-1.5 md:py-1.5 md:px-2 bg-zinc-100 text-black dark:bg-zinc-200'}>
                        {item.subject.title}
                    </span>
                    <span>{item.title}</span>
                </div>
            )}
        </div>
    )
};


export default CourseGrid;