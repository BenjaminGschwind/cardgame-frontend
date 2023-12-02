import { Button } from '@mui/material'
import React from 'react'
import { StartButtonProps } from '../../../types/props'
import { publishStartGame } from '../../../types/LobbyWebsocketFunctions'

/*
The StartButton Component provides the ability to start the game 
if there are at least two members in the lobby and every non-bot member is ready. 
Only the lobby host can start a game.
*/
export default function StartButton({
    authToken,
    lobbyState,
    personalPlayerState,
    translation,
}: StartButtonProps) {
    /**
     * Calculates if the start button is disabled or not.
     * @returns boolean that indicates if the start button is disabled or not.
     */
    const isDisabled = () => {
        let disabled: boolean = false
        lobbyState.playerList.forEach((player) => {
            if (!player.readyCheck) disabled = true
        })
        return (
            disabled ||
            personalPlayerState.rank !== 'HOST' ||
            lobbyState.amountPlayers + lobbyState.amountBots < 2
        )
    }
    /**
     * function that starts the game by calling the corresponding websocket function.
     */
    const startGame = () => {
        publishStartGame(authToken, lobbyState.lobbyCode)
    }
    return (
        <Button
            color={'inherit'}
            variant="outlined"
            disabled={isDisabled()}
            onClick={startGame}
        >
            {translation.startGame}
        </Button>
    )
}
