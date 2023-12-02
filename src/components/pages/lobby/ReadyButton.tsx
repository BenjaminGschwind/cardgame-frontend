import { Button } from '@mui/material'
import React from 'react'
import { ReadyButtonProps } from '../../../types/props'
import { publishReadyStateChanges } from '../../../types/LobbyWebsocketFunctions'

/*
The ReadyButton Component provides the ability to toggle the readystate of the user
*/
export default function ReadyButton({
    authToken,
    lobbyState,
    personalPlayerState,
    translation,
}: ReadyButtonProps) {
    /*
    function that publishes changes contributing the readystate. 
    The corresponding websocket function gets called.
    */
    const handleReadyChange = () => {
        if (personalPlayerState.readyCheck) {
            publishReadyStateChanges(authToken, lobbyState.lobbyCode, {
                ...personalPlayerState,
                readyCheck: false,
            })
        } else {
            publishReadyStateChanges(authToken, lobbyState.lobbyCode, {
                ...personalPlayerState,
                readyCheck: true,
            })
        }
    }
    return (
        <Button
            color={personalPlayerState.readyCheck ? 'success' : 'error'}
            variant={'contained'}
            onClick={handleReadyChange}
        >
            {translation.ready}
        </Button>
    )
}
