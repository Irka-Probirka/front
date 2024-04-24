import {useAuth} from "../hooks/useAuth";


const Profile = () => {

    const { user } = useAuth();

    return (
        <div>
            {/*Профиль {user.first_name} {user.last_name}*/}
            Профиль
        </div>
    );
};

export default Profile;