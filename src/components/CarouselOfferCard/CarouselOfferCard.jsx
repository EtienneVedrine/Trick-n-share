import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'


function CarouselOfferCard({ offer }) {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/offer/${offer.id}`)
    }

    return (

        <div className='p-4 bg-gray-50 rounded-md shadow-md h-96 w-full cursor-pointer' onClick={clickHandler}>
            <div className=' md:flex h-full'>
                <div className='md:w-1/3 shrink-0 self-center'>
                    <h1 className='font-bold mb-6 '>{offer.title}</h1>
                    <img className='max-h-12 md:max-h-52 object-contain' src={offer.img_url ? (offer.img_url) : ('./offer-placeholder.png')} alt="Image de l'annonce" />
                </div>
                <div className='md:ml-6 w-full flex flex-col content-start md:h-full '>
                    <p className='mb-3 w-full h-full text-left pt-8'>{offer.description}</p>
                    <p className='text-sm text-left '><img className='h-4 max-w-min inline' src='./profil.png' /> {`${offer.user.firstname} ${offer.user.lastname}`}</p>
                    <p className='text-sm text-left  '><img className='h-4 max-w-min inline' src='./location.png' /> {offer.adress}</p>
                    <p className='text-sm text-left '><img className='h-4 max-w-min inline' src='./dollar.png' /> {offer.typeOffer.name}</p>
                    <p className='text-sm text-left  '><img className='h-4 max-w-min inline' src='./tools.png' /> {offer.categorySkill.map((skill) => `${skill.label} `)}</p>
                    <Link
                        className='mt-4 p-2 text-base text-slate-800 bg-emerald-300 hover:text-white w-fit rounded-md font-bold self-end mb-5 '
                        
                        to={`/offer/${offer.id}`}
                    >Plus d'infos</Link>
                </div>
            </div>
        </div>

    )
}

CarouselOfferCard.propTypes = {
    offer: PropTypes.object
}

export default CarouselOfferCard;