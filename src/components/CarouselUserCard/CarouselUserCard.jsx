
import { Link,useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'


function CarouselUserCard({ user }) {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/user/${user.id}`)
    }

    return (

        <div className='p-4 bg-gray-50 rounded-md drop-shadow-md h-96 w-full cursor-pointer md:flex' onClick={clickHandler}>
            
            <div className='md:w-1/3 shrink-0 self-center'>
                <img className='md:p-4 max-h-12 md:max-h-none object-contain mt-4 md:mt-O' src="/profil.png" alt="" />
            </div>
            <div className=' flex flex-col h-80 md:h-full justify-evenly w-full'>

                <div className='flex self-center'>
                    <p className='font-bold'>{`${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)} ${user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}`}</p>
                    {user.ispro && <div className='flex-end bg-purple-100 text-purple-800 text-xs font-bold mr-2 ml-2 px-3 py-2 rounded-full w-min shadow-md h-8'>PRO</div>}
                </div>

                <div className=''>
                    <p className='text-sm m-2 text-left'><img className='h-4 max-w-min inline mr-2' src='./location.png' /> {`${user.zip} ${user.city}`}</p>
                    <p className='text-sm m-2 text-left'><img className='h-4 max-w-min inline mr-2' src='./tools.png' />{user.categorySkill.length > 0 ? (user.categorySkill.map((skill) => `${skill.label}  `)) : ('Pas de compétences pour le moment')} </p>
                </div>

                <p>{`" ${user.presentation} "`}</p>
                <Link
                        className='m-4 p-2 text-base text-slate-800 bg-emerald-300 hover:text-white w-fit rounded-md font-bold self-end mb-10 '
                        
                        to={`/offer/${user.id}`}
                    >Plus d'infos</Link>
            </div>
        </div>

    )
}

CarouselUserCard.propTypes = {
    user: PropTypes.object
}

export default CarouselUserCard;