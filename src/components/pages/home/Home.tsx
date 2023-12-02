import { Alert, ButtonGroup, Snackbar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { HomeProps } from '../../../types/props'
import {
    createLobby,
    joinLobby,
    registerGuest,
} from '../../../types/RestFunctions'
import {
    GameType,
    LobbyIntention,
    UserLocation,
    UserRole,
} from '../../../types/types'
import GameCard from './GameCard'
import './home-styles/home.css'
import JoinLobby from './JoinLobby'
import LanguageDropdown from './LanguageDropdown'
import LightDarkSwitch from './LightDarkSwitch'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'
import UsernamePopup from './UsernamePopup'
import LogoutButton from './LogoutButton'

/*
Home component which is the first page the user sees when he opens the website.
 */
export default function Home({
    authToken,
    setAuthToken,
    setUsername,
    setUserLocation,
    userRole,
    setUserRole,
    isReadyToJoinLobby,
    setIsReadyToJoinLobby,
    setTheme,
    darkTheme,
    language,
    setLanguage,
    translation,
}: HomeProps) {
    /**
     * React Router hook to navigate to other pages
     */
    const navigate = useNavigate()

    /**
     * Ref that indicates if the component has mounted for the first time
     */
    const didMount = useRef(false)

    /**
     * State variable that indicates if the usernamePopup should be shown or not
     */
    const [usernamePopup, setUsernamePopup] = useState<boolean>(false)

    /**
     * state variable that indicates which gameType the user wants to create a lobby for
     */
    const [gameTypeLobbyToOpen, setGameTypeLobbyToOpen] =
        useState<GameType>(null)

    /**
     * state variable that indicates if the user wants to create or join a lobby
     */
    const [lobbyIntention, setLobbyIntention] = useState<LobbyIntention>(null)

    /**
     * state variable that indicates if the error message should be shown or not
     */
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

    /**
     * state variable for the error message
     */
    const [errorMessage, setErrorMessage] = useState<string>('')

    /**
     * state variable for inserted LobbyCode in the JoinLobby component
     */
    const [lobbyCode, setLobbyCode] = useState<string>('')

    /**
     * Method that creates / joins a lobby depending on the users intention
     * triggered when the authToken updates as a result of a guest login
     */
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
        } else {
            if (isReadyToJoinLobby && lobbyIntention !== null) {
                if (lobbyIntention === LobbyIntention.CREATE) {
                    handleCreateLobby(gameTypeLobbyToOpen)
                } else {
                    handleJoinLobby()
                }
                setLobbyIntention(null)
                setGameTypeLobbyToOpen(null)
                setIsReadyToJoinLobby(false)
            }
        }
    }, [isReadyToJoinLobby])

    /**
     * Method that handles the event when the user clicks on the close button of the error message
     * @param event - event that triggered the method
     * @param reason - reason why the method was triggered
     */
    const handleErrorMessageClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setShowErrorMessage(false)
    }

    /**
     * Method that handles the event when the user clicks on the create lobby button
     * @param gameType - gameType of the lobby that should be created
     */
    const createAndToggle = (gameType: GameType) => {
        setGameTypeLobbyToOpen(gameType)
        setLobbyIntention(LobbyIntention.CREATE)
        toggleUsernamePopup()
    }

    /**
     * Method that handles the event when the user clicks on the join lobby button
     */
    const joinAndToggle = () => {
        setLobbyIntention(LobbyIntention.JOIN)
        toggleUsernamePopup()
    }

    /**
     * Method that toggles the usernamePopup if the user is not logged in
     */
    const toggleUsernamePopup = () => {
        setUsernamePopup(!usernamePopup)
    }

    /**
     * Method that handles the event when the user submits a username in the usernamePopup
     * @param usernameInput - username that was submitted
     */
    const handleGuestUsernameSubmit = async (usernameInput: string) => {
        const response: string = await registerGuest(usernameInput)
        if (!response.startsWith('Error:')) {
            const token: string = 'Bearer ' + response
            setUsername(usernameInput)
            toggleUsernamePopup()
            setAuthToken(token)
        } else {
            setErrorMessage(response)
            setShowErrorMessage(true)
        }
    }

    /**
     * Method which handles the event of joining a lobby
     */
    const handleJoinLobby = async () => {
        const response: boolean = await joinLobby(authToken, lobbyCode)
        if (response) {
            setUserLocation(UserLocation.LOBBY)
            navigate('/lobby')
        } else {
            setErrorMessage('Error: Cannot join lobby.')
            setShowErrorMessage(true)
        }
    }

    /**
     * Method which handles the event of creating a lobby
     * @param gameType - gameType of the lobby that should be created
     */
    const handleCreateLobby = async (gameType: GameType) => {
        const response: boolean = await createLobby(authToken, gameType)
        if (response) {
            setUserLocation(UserLocation.LOBBY)
            navigate('/lobby')
        } else {
            setErrorMessage('Error: Cannot create lobby.')
            setShowErrorMessage(true)
        }
        setUserLocation(UserLocation.LOBBY)
        navigate('/lobby')
    }

    return (
        <>
            <UsernamePopup
                toggleUsernamePopup={toggleUsernamePopup}
                usernamePopup={usernamePopup}
                handleGuestUsernameSubmit={handleGuestUsernameSubmit}
                translation={translation}
            />
            <Snackbar
                open={showErrorMessage}
                autoHideDuration={3000}
                onClose={handleErrorMessageClose}
            >
                <Alert
                    onClose={handleErrorMessageClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
            <div className="homepage-wrapper">
                <div className="homepage-settings-wrapper">
                    <LanguageDropdown
                        language={language}
                        setLanguage={setLanguage}
                    />
                    <LightDarkSwitch
                        setTheme={setTheme}
                        darkTheme={darkTheme}
                    />
                    <div className="login-register-button-wrapper">
                        {authToken === '' || userRole === UserRole.GUEST ? (
                            <ButtonGroup
                                variant="outlined"
                                aria-label="outlined primary button group"
                            >
                                <LoginButton translation={translation} />
                                <RegisterButton translation={translation} />
                            </ButtonGroup>
                        ) : (
                            <LogoutButton
                                setAuthToken={setAuthToken}
                                setUsername={setUsername}
                                setUserRole={setUserRole}
                                translation={translation}
                            />
                        )}
                    </div>
                </div>

                <JoinLobby
                    handleJoin={
                        authToken === '' ? joinAndToggle : handleJoinLobby
                    }
                    lobbyCode={lobbyCode}
                    setLobbyCode={setLobbyCode}
                    translation={translation}
                />

                <div className="game-cards-wrapper">
                    <GameCard
                        gameType={GameType.MauMau}
                        handleCreateLobby={
                            authToken === ''
                                ? createAndToggle
                                : handleCreateLobby
                        }
                        translation={translation}
                    />
                    <GameCard
                        gameType={GameType.Schwimmen}
                        handleCreateLobby={
                            authToken === ''
                                ? createAndToggle
                                : handleCreateLobby
                        }
                        translation={translation}
                    />
                    <GameCard
                        gameType={GameType.Maexxle}
                        handleCreateLobby={
                            authToken === ''
                                ? createAndToggle
                                : handleCreateLobby
                        }
                        translation={translation}
                    />
                </div>
            </div>
        </>
    )
}
