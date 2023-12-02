import { Button, TextField } from '@mui/material'
import React from 'react'
import { JoinLobbyProps } from '../../../types/props'
import './home-styles/joinLobby.css'

/*
JoinLobby Component consists of a TextField for LobbyCode input and a Button to submit
*/
export default function JoinLobby({
    handleJoin,
    lobbyCode,
    setLobbyCode,
    translation,
}: JoinLobbyProps) {
    /**
     * Method for handling input for the lobbyCode-text-area
     * @param event - the event that triggered the method
     */
    const handleLobbyCode = (event: any) => {
        setLobbyCode(event.target.value)
    }

    /**
     * Method for handling the click on the join-lobby-button
     */
    const handleLobbyJoin = () => {
        handleJoin()
    }

    return (
        <div className="join-lobby">
            <TextField
                id="outlined-basic"
                label={translation.lobbyCode}
                variant="outlined"
                value={lobbyCode}
                onChange={handleLobbyCode}
            />
            <Button variant="outlined" onClick={handleLobbyJoin}>
                {translation.joinLobby}
            </Button>
        </div>
    )
}
