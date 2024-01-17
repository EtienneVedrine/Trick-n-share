
import "./FAQpage.css";

const FAQPage = () => {
    return (
        <div className="w-2/4 max-w-2xl min-w-fit mt-12 border-solid border-2 mx-auto block rounded-lg bg-white p-6 text">
            <h1 className='faq-title text-center font-bold'>Foire aux questions</h1>
            <div className="m-4">
                <h2 className='faq-section'>Question 1 : Qu'est-ce que la FAQ ?</h2>
                <p>La FAQ est une liste de questions fréquemment posées et de réponses correspondantes.</p>
            </div>
            <div className="m-4">
                <h2 className='faq-section'>Question 2 : Comment puis-je poser une question ?</h2>
                <p>Vous pouvez poser une question en utilisant le formulaire de contact sur notre page de contact.</p>
            </div>
            <div className="m-4">
                <h2 className='faq-section'>Question 3 : Combien de temps faut-il pour obtenir une réponse ?</h2>
                <p>Le délai de réponse dépend de la nature de la question, mais nous faisons de notre mieux pour répondre rapidement.</p>
            </div>
            <div className="m-4">
                <h2 className='faq-section'>Question 4 : Puis-je modifier mon adresse e-mail ?</h2>
                <p>Oui, vous pouvez modifier votre adresse e-mail dans les paramètres de votre compte une fois que vous êtes connecté.</p>
            </div>
            <div className="m-4">
                <h2 className='faq-section'>Question 5 : Combien de temps faut-il pour obtenir une réponse ?</h2>
                <p>Le délai de réponse dépend de la nature de la question, mais nous faisons de notre mieux pour répondre rapidement.</p>
            </div>
            <div className="m-4">
                <h2 className='faq-section'>Question 6 : Combien de temps faut-il pour obtenir une réponse ?</h2>
                <p>Le délai de réponse dépend de la nature de la question, mais nous faisons de notre mieux pour répondre rapidement.</p>
            </div>
        </div>
    );
}

export default FAQPage;