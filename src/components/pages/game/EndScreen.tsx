import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import { EndScreenProps } from '../../../types/props'
import { UserLocation } from '../../../types/types'
import './cardgame.css'
import { disconnectFromGameWebsocket } from '../../../types/GameWebsocketFunctions'
import { getAuthHeader, leaveLobby } from '../../../types/RestFunctions'

/*
The EndScreen component will be displayed when the game has ended.
A different EndScreen will be displayed depending on if the user is the winner or not.
*/
export default function EndScreen({
    authToken,
    setUserLocation,
    winner,
    username,
    translation,
}: EndScreenProps) {
    const navigate = useNavigate()

    /**
     * function that lets the user return to the lobby after the game has finished.
     */
    const backToLobby = () => {
        disconnectFromGameWebsocket()
        setUserLocation(UserLocation.LOBBY)
        navigate('/lobby')
    }

    /**
     * function that lets the user return to the home screen after the game has finished.
     */
    const backToHome = async () => {
        const lobbyState = await (
            await fetch('http://localhost:8080/lobby/personal/state', {
                method: 'GET',
                headers: getAuthHeader(authToken),
            })
        ).json()
        await leaveLobby(authToken, lobbyState.lobbyCode)
        disconnectFromGameWebsocket()
        setUserLocation(UserLocation.HOME)
        navigate('/')
    }

    /**
     * The end screen if the user is the winner.
     */
    if (username === winner)
        return (
            <div className="win">
                <span className="cup">
                    <span>&#127942;</span>
                </span>
                <p className="win-text">
                    &#x1F389; {translation.congratsWinner} &#x1F389;
                </p>
                <ButtonGroup>
                    <Button
                        variant="outlined"
                        onClick={backToHome}
                        sx={{ bgcolor: 'white' }}
                    >
                        {translation.goHome}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={backToLobby}
                        sx={{ bgcolor: 'white' }}
                    >
                        {translation.goLobby}
                    </Button>
                </ButtonGroup>
            </div>
        )

    /**
     * The end screen if the user is not the winner.
     */
    return (
        <div className="lose">
            <p className="win-text">
                {translation.player} {winner} {translation.isWinner}
            </p>
            <ButtonGroup>
                <Button
                    variant="outlined"
                    onClick={backToHome}
                    sx={{ bgcolor: 'white' }}
                >
                    {translation.goHome}
                </Button>
                <Button
                    variant="outlined"
                    onClick={backToLobby}
                    sx={{ bgcolor: 'white' }}
                >
                    {translation.goLobby}
                </Button>
            </ButtonGroup>
        </div>
    )
}
