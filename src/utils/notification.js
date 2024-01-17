// fonction utilitaire qui permet d'afficher une notification pendant 5 secondes

import { useEffect } from "react";
import { SettingsContext } from "./context";

const {setIsNotificationDisplayed, setIsSuccess, setNotifMessage} = useEffect(SettingsContext)

const notify = (isSuccess, message) => {
    setIsNotificationDisplayed(true);
    setIsSuccess(isSuccess);
    setNotifMessage(message)
    setTimeout((() => {
        setIsNotificationDisplayed(false);
        setIsSuccess(false);
        setNotifMessage("")
    }), 5000)
}

export default notify