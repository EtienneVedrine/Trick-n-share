
import "./Charter.css";

const Charter = () => {
    return (
        <div className="w-2/4 max-w-2xl min-w-fit mt-12 border-solid border-2 mx-auto block rounded-lg bg-white p-6 text">
            <h1 className='faq-title text-center font-bold mb-6'>Charte de bonne conduite</h1>
            <p className="mb-4">Bienvenue sur <strong>Trick'n Share</strong> ! Notre communauté est un espace où les membres viennent en aide les uns aux autres dans un esprit de solidarité. Afin de garantir une expérience positive pour tous, nous vous prions de respecter les règles suivantes :</p>

            <ol>
                <li>
                    <strong>Respect et Bienveillance :</strong> Traitez tous les membres avec respect, empathie et gentillesse, indépendamment de leur origine, de leur race, de leur religion, de leur orientation sexuelle, de leur genre, de leur âge ou de toute autre caractéristique personnelle. Les commentaires discriminatoires, insultants ou offensants ne sont pas tolérés.
                </li>
                <li>
                    <strong>Confidentialité :</strong> Respectez la vie privée des autres membres. Ne partagez pas d'informations personnelles sensibles sans le consentement explicite de la personne concernée.
                </li>
                <li>
                    <strong>Pertinence :</strong> Veillez à ce que les discussions et les réponses restent en rapport avec l'objet du site. Évitez les sujets inappropriés ou hors sujet.
                </li>
                <li>
                    <strong>Qualité des Contributions :</strong> Fournissez des réponses et des conseils utiles et informatifs. Évitez les messages vides de sens, les spams ou les réponses non pertinentes.
                </li>
                <li>
                    <strong>Respect des Règles Légales :</strong> N'engagez pas de discussions ou de comportements illégaux. Ne partagez pas de contenu protégé par le droit d'auteur sans autorisation, ne faites pas de la diffamation, et ne violez pas les lois en vigueur.
                </li>
                <li>
                    <strong>Signalement des Problèmes :</strong> Si vous repérez un comportement inapproprié ou une violation de cette charte, veuillez le signaler à l'équipe de modération en utilisant les outils prévus à cet effet.
                </li>
                <li>
                    <strong>Utilisation Responsable :</strong> Utilisez les ressources du site de manière responsable et éthique. Évitez d'abuser des ressources de la communauté ou de perturber son bon fonctionnement.
                </li>
                <li>
                    <strong>Respect des Consignes de l'Équipe de Modération :</strong> Respectez les directives et les décisions de l'équipe de modération. Leur rôle est de maintenir un environnement sain et sécurisé pour tous les membres.
                </li>
                <li>
                    <strong>Mise à Jour et Adaptation :</strong> Cette charte peut être mise à jour périodiquement pour refléter les besoins de la communauté. Les membres seront informés des changements importants.
                </li>
                <li>
                    <strong>Bénévolat :</strong> Rappelez-vous que certains membres sont bénévoles et qu'ils prennent de leur temps pour aider les autres. Soyez reconnaissants envers ceux qui vous apportent leur aide.
                </li>
            </ol>

            <p className="mt-6">En acceptant cette charte de bonne conduite, vous vous engagez à respecter ces principes et à contribuer à faire de <strong>Trick'n Share</strong> un lieu accueillant et constructif pour tous. En cas de non-respect de cette charte, des mesures disciplinaires pourront être prises, y compris la suspension ou la suppression du compte.</p>

            <p className="mt-4">Merci de votre contribution positive à notre communauté d'entraide !</p>


        </div>
    );
}

export default Charter;