
import "./Footer.css"
import { NavLink } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance.js';

const Footer = () => (

    <footer className="bg-neutral-100 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-500 text-sm bottom-0 flex flex-col mt-40">

        <div className="ml-4 mt-1 mb-1 p-1">
        <NavLink to="/"><img src="/logo.png" className="w-14"></img></NavLink>
            <div className="pb-2 mt-4">
            <span className="sm:flex sm:items-center sm:justify-between text-xs">Trick'n Share est une marketplace de prestation de services destinée aux particuliers et aux professionnels.</span>
            </div>
        </div>

        <div className="ml-4 mt-4 mb-1 p-1">
            <h2 className="ml-1">A propos</h2>
            <ul>
                <li className="m-1"><NavLink to="/legals">Mentions légales</NavLink></li>
                <li className="m-1"><NavLink to="/charter">Charte de bonne conduite</NavLink></li>
            </ul>
        </div>

        <div className="ml-4 mt-4 sm:mb-1 p-1">
            <h2 className="ml-1">Aide</h2>
            <ul>
                <li className="m-1"><NavLink to="/faq">FAQ</NavLink></li>
                <li className="m-1"><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </div>

        <div className="ml-4 sm:mt-4 mb-2 p-1">
            <h2 className="ml-1 mb-2">Nos applications</h2>
            <div className="grid grid-cols-2">
                <NavLink to="/"><img src="/android.png" className="w-10 m-1"></img></NavLink>
                <NavLink to="/"><img src="/magasin-dapplications.png" className="w-10 m-1 ml-1"></img></NavLink>
            </div>
        </div>

    </footer>
);






export default Footer;

