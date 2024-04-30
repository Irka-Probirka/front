import Block from "./block";


const CourseGrid = ({courses, setSelectedCourse}) => {

    const handleSelectCourse = (course_id) => {
        return () => setSelectedCourse(courses.find(course => course.id === course_id));
    }

    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'}>
            {courses.map((item, index) =>
                <Block
                    id={item.id}
                    key={index}
                    onClick={handleSelectCourse(item.id)}
                >
                    <span
                        className={'text-sm text-center min-w-max w-full md:w-max mx-auto md:mx-0 rounded-md py-1 px-1.5 md:py-1.5 md:px-2 bg-zinc-100 text-black dark:bg-zinc-200'}>
                        {item.subject.title}
                    </span>
                    <span>{item.title}</span>
                </Block>
            )}
        </div>
    )
};


export default CourseGrid;