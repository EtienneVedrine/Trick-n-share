import { createContext, useState } from "react";
import PropTypes from 'prop-types'

export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoginModalDisplayed, setIsLoginModalDisplayed] = useState(false);
    const [isNotificationDisplayed, setIsNotificationDisplayed] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [notifMessage, setNotifMessage] = useState("");

    return (
        <SettingsContext.Provider value={{isLogged, setIsLogged,
                                         isLoginModalDisplayed, setIsLoginModalDisplayed,
                                          isNotificationDisplayed, setIsNotificationDisplayed,
                                          isSuccess, setIsSuccess,
                                          notifMessage, setNotifMessage}}>
            {children}
        </SettingsContext.Provider>
    )
}

SettingsProvider.propTypes = {
    children: PropTypes.node
};


