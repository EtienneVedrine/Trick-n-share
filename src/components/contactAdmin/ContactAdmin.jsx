import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import "./ContactAdmin.css";


export default function ContactAdmin() {

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const handleClick = async (e) => {
        e.preventDefault()

        const contactData = {
            lastname: lastName,
            firstname: firstName,
            email: email,
            subject: subject,
            description: description,
        }

        console.log(contactData);

        try {
            const response = await axiosInstance.post(
                "/contact", contactData);

            if (response.status === 200) {
                console.log("Formulaire envoyé");
            }

        } catch (error) {
            console.log(error);
        }
    };

        return (
            <div className="w-2/4 max-w-2xl min-w-fit mt-4 border-solid border-2 mx-auto block rounded-lg bg-white p-6 text">
                <div className='text-center font-bold'>FORMULAIRE DE CONTACT</div>
                {/* Choisir la méthode d'envoi*/}
                <form onSubmit={handleClick} className="p-2">
                {/* <form action="mailto:etienne.vedrine@oclcock.school" method="post" enctype="text/plain"> */}
                    <div className="mt-0 mb-2">
                        <label className="ml-1 font-semibold" htmlFor="name">
                            Nom
                        </label>
                        <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id='name'
                            value={lastName}
                            placeholder='Dupont' required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="mt-0 mb-2">
                        <label className="ml-1 font-semibold" htmlFor="firstName">
                            Prénom
                        </label>
                        <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id='firstName'
                            value={firstName}
                            placeholder='Martin' required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="mt-0 mb-5">
                        <label className="ml-1 font-semibold" htmlFor="email">
                            Votre email
                        </label>
                        <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id='email'
                            value={email}
                            placeholder='example@mail.com' required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="ml-1 font-semibold" htmlFor="subject">
                            Sujet
                        </label>
                        <input className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id='subject'
                            value={subject}
                            placeholder='Que concerne votre demande ?' required
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className='mt-1'>
                        <label className="ml-1 font-semibold" htmlFor="description">
                            Votre demande
                        </label>
                        <textarea rows="4" cols="50" className="resize-none border h-24 block appearance-none w-full bg-white border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline justify-items-start"
                            type="text"
                            name="description"
                            id="description"
                            value={description}
                            placeholder="Comment pouvons-nous vous aider ?"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center ">
                        <button className=" m-3 bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">Envoyer</button>
                    </div>

                </form>
            </div>
        )
    }

