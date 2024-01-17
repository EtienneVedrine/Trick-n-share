import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'


const UserCard = ({ user }) => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/user/${user.id}`)
    }

    return (
        <div className='p-3 w-full md:w-7/12 md:m-auto '>
            <div className='p-3 md:p-8 bg-gray-50 rounded-md drop-shadow-md h-full hover:bg-gray-100 cursor-pointer' onClick={clickHandler}>
                <div className='flex flex-col '>
                    <div className='flex self-center items-start'>
                        <p className='font-bold text-base md:text-2xl'>{`${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)} ${user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}`}</p>
                        {user.ispro && <div className='flex-end bg-purple-100 text-purple-800 text-xs font-bold mr-2 ml-2 px-2 py-1 rounded-full w-min shadow-md items-start'>PRO</div>}
                    </div>
                    <div className='flex self-center'>
                        <p className='mr-2 text-sm md:text-base'>{user.zip}</p>
                        <p className='text-sm md:text-base'>{user.city}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.object
}

export default UserCard;