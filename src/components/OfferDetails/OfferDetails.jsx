import { useEffect, useState } from 'react';
import './OfferDetails.css'
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const OfferDetails = () => {

    // on récupère l'id dans l'url
    const { id } = useParams();

    // on déclare un state qui contiendra les données de l'annonce
    const [offer, setOffer] = useState()

    // on crée la fonction qui récupère les données de l'annonce
    const fetchOfferData = async () => {
        try {
            const { data } = await axiosInstance.get(`/offer/${id}`);
            console.log(data);
            setOffer(data)

        } catch (error) {
            console.log(error)
        }
    }

    //accéder au profil de l'utilisateur
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/user/${offer?.user.id}`)
    }

    // on va récupérer les données de l'annonce au mount
    useEffect(() => {
        fetchOfferData();
    }, [])

    return (
    <div className="min:w-1/2 max-w-4xl mt-4 border-solid border-2 container m-auto rounded-lg bg-white p-6">
        <div className='flex flex-col justify-center'>
            <Link to='/offer' className='font-bold text-indigo-700 hover:text-red-500 underline m-2'>Retour à la liste des annonces</Link>
            <p className='grid place-content-center rounded-md mb-6 mx-2 mt-2 text-2xl'>Détails de l'annonce</p>

            <h1 className='p-2 text-center my-4 rounded-md bg-blue-200  mb-1 font-semibold mt-2 shadow-lg'>Compétences demandées</h1>

            <div className='m-4 '>
                <div className='flex flex-wrap justify-evenly space-x-2 mt-2 mx-2 font-semibold'>
                    {offer?.categorySkill.map((skill) => {
                        return (
                            <div className='bg-indigo-800 text-white p-2 rounded-md justify-between text-center hover:no-underline shrink-0 my-1' key={skill.id}>{skill.label}</div>
                        )
                    })}
                </div>
            </div>

            <div className='bg-gray-100 m-4 p-4 shadow-md rounded-md flex justify-around'>
                <div className='mr-2'>
                    <p className='text-sm'>Annonce publiée par</p>
                    <p className='font-bold mt-1'>{offer?.user.firstname} {offer?.user.lastname}</p>
                </div>

{/* Bouton pour accéder au profil du user */}
                <div className='flex items-center' >
                    <button className='bg-cyan-500 text-white p-2 text-sm h-fit font-bold rounded-md hover:bg-cyan-700' onClick={clickHandler}>Voir le profil de {offer?.user.firstname}</button>
                </div>
            </div>
            
            <div className='flex m-4 p-4 border-solid border-4 border-gray-500 rounded-lg bg-orange-50'>
                <div className='w-2/4 text-center'>
                    <p className='font-bold mb-2'>Type d'offre</p>
                    <p>{offer?.typeOffer.name}</p>
                </div>
                <div className='w-2/4 text-center'>
                    <p className='font-bold mb-2' >Lieu</p>
                    <p>{offer?.adress}</p>
                    <p>{`${offer?.zip} ${offer?.city}`}</p>
                </div>
            </div>



            <div className='bg-gray-100 m-4 p-4 shadow-md rounded-md justify-around'>
                <h2 className='font-bold m-4 underline underline-offset-4'>{offer?.title}</h2>
                <p className='m-4'>{offer?.description}</p>
            </div>


            <img className='mx-auto mt-8 rounded-xl object-scale-down border ' src={offer?.img_url} alt="Image de l'annonce" />
        </div>


    </div>
    )
}



export default OfferDetails;