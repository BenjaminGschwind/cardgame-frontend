import React, { useRef } from 'react'
import './publicLobbies.css'
import PublicLobbiesTable from './PublicLobbiesTable'
import {
    getPublicLobbies,
    joinLobby,
    registerGuest,
} from '../../../types/RestFunctions'
import { useState, useEffect } from 'react'
import TopBar from './TopBar'
import UsernamePopup from '../home/UsernamePopup'
import { UserLocation } from '../../../types/types'
import { PublicLobbyProps } from '../../../types/props'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router'

export default function PublicLobbies({
    translation,
    isReadyToJoinLobby,
    setIsReadyToJoinLobby,
    setUsername,
    authToken,
    setAuthToken,
    setUserLocation,
}: PublicLobbyProps) {
    /**
     * React Router hook to navigate to other pages
     */
    const navigate = useNavigate()

    /**
     * Ref that indicates if the component has mounted for the first time
     */
    const didMount = useRef(false)

    const [publicLobbies, setPublicLobbies] = useState([])

    /**
     * gets called by useEffect when page loads
     * makes a get Request and saves the return in useState
     */
    function getLobbies() {
        getPublicLobbies().then((data) => setPublicLobbies(data.lobbies))
    }

    /**
     * gets called when page loads
     */
    useEffect(() => {
        getLobbies()
    }, [])

    /**
     * Method that creates / joins a lobby depending on the users intention
     * triggered when the authToken updates as a result of a guest login
     */
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
        } else {
            if (isReadyToJoinLobby) {
                handleJoinLobby()
                setIsReadyToJoinLobby(false)
            }
        }
    }, [isReadyToJoinLobby])

    /**
     * State variable that indicates if the usernamePopup should be shown or not
     */
    const [usernamePopup, setUsernamePopup] = useState<boolean>(false)

    /**
     * state variable for inserted LobbyCode in the JoinLobby component
     */
    const [lobbyCode, setLobbyCode] = useState<string>('')

    /**
     * state variable that indicates if the error message should be shown or not
     */
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

    /**
     * state variable for the error message
     */
    const [errorMessage, setErrorMessage] = useState<string>('')

    /**
     * Method that toggles the usernamePopup if the user is not logged in
     */
    const toggleUsernamePopup = () => {
        setUsernamePopup(!usernamePopup)
    }

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

    return (
        <div className="PublicLobbies">
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
            <TopBar translation={translation} />
            <PublicLobbiesTable
                data={publicLobbies}
                translation={translation}
                setLobbyCode={setLobbyCode}
                handleJoin={
                    authToken === '' ? toggleUsernamePopup : handleJoinLobby
                }
            />
        </div>
    )
}
