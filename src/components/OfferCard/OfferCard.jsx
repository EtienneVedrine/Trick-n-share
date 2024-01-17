import { Link } from 'react-router-dom';
import './OfferCard.css'
import PropTypes from 'prop-types'
function OfferCard({ offer }) {

    return (

        <div className='p-3 w-full md:w-2/4 '>
            <div className='p-8 bg-gray-50 rounded-md drop-shadow-md h-full '>
                <div className='flex h-full'>
                    <div className='w-1/4 max-h-fit'>
                        <h1 className='font-bold mb-4'>{offer.title}</h1>
                        <img className='mb-4' src={offer.img_url ? (offer.img_url) : ('./offer-placeholder.png')} alt="Image de l'annonce" />
                    </div>
                    <div className='ml-6 w-full flex flex-col h-full '>
                        <p className=' mb-3 w-full h-full hidden md:block'>{offer.description}</p>
                        <p className='ml-4 mb-3 w-full h-full md:hidden'>{offer.shorterDescription}</p>
                        <p className='text-sm  w-full '><img className='h-4 inline' src='./profil.png' /> {`${offer.user.firstname} ${offer.user.lastname}`}</p>
                        <p className='text-sm  w-full '><img className='h-4 inline pr-0' src='./location.png' /> {`${offer.zip} ${offer.city}`}</p>
                        <p className='text-sm  w-full '><img className='h-4 inline mr-1' src='./dollar.png' />{offer.typeOffer.name}</p>
                        <p className='text-sm w-full'><img className='h-4 inline mr-1' src='./tools.png' />
                    {offer.categorySkill.map((skill) => `${skill.label} `)}</p>
                        <Link
                            className='mt-4 p-2 text-sm text-white font-bold bg-cyan-500 w-fit rounded-md hover:bg-cyan-700 self-end'
                            to={`/offer/${offer.id}`}
                        >Plus d'infos</Link>
                    </div>
                </div>
            </div>
        </div>


    )
}

OfferCard.propTypes = {
    offer: PropTypes.object
}

export default OfferCard;




/*Tentative de format mobile */
        // <div className='p-3 w-full md:w-2/4 '>
        //     <div className='p-8 bg-gray-50 rounded-md drop-shadow-md h-full '>
        //         <div className='sm:flex h-full'>
        //             <div className='sm:w-1/4 sm:max-h-fit'>
        //                 <h1 className='font-bold mb-4'>{offer.title}</h1>
        //                 <img className='mb-4' src={offer.img_url ? (offer.img_url) : ('./offer-placeholder.png')} alt="Image de l'annonce" />
        //             </div>
        //             <div className='ml-6 sm:w-full flex sm:flex-col sm:h-full '>
        //                 <p className=' mb-3 sm:w-full sm:h-full hidden md:block'>{offer.description}</p>
        //                 <p className='ml-4 mb-3 sm:w-full h-full md:hidden'>{offer.shorterDescription}</p>
        //                 <p className='text-sm  sm:w-full '><img className='h-4 sm:inline' src='./profil.png' /> {`${offer.user.firstname} ${offer.user.lastname}`}</p>
        //                 <p className='text-sm  sm:w-full '><img className='h-4 sm:inline pr-0' src='./location.png' /> {offer.adress}</p>
        //                 <p className='text-sm  sm:w-full '><img className='h-4 sm:inline mr-1' src='./dollar.png' />{offer.typeOffer.name}</p>
        //                 <p className='text-sm  sm:w-full'><img className='h-4 sm:inline mr-1' src='./tools.png' />

        //             {offer.categorySkill.map((skill) => `${skill.label} `)}</p>
        //                 <Link
        //                     className='mt-4 p-2 text-sm text-white font-bold bg-cyan-500 w-fit rounded-md hover:bg-cyan-700 self-end'
        //                     to={`/offer/${offer.id}`}
        //                 >Plus d'infos</Link>
        //             </div>
        //         </div>
        //     </div>
        // </div>

