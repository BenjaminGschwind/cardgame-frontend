import React from 'react'
import { Box, Button, Chip } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { BotSelectorProps } from '../../../types/props'
import { publishLobbyChanges } from '../../../types/LobbyWebsocketFunctions'

/*
The BotSelector Component provides the ability to add and remove bot players to the lobby.
The Lobby can be filled with bots until the limit of eight players in the lobby is reached.
*/
export default function BotSelector({
    authToken,
    lobbyState,
    personalPlayerState,
    translation
}: BotSelectorProps) {
    /**
     * function that publishes changes contributing the bot count.
     * @param value the number of bots now in the lobby.
     */
    const handleBotChange = (value: number) => {
        publishLobbyChanges(authToken, {
            ...lobbyState,
            amountBots: lobbyState.amountBots + value,
        })
    }

    return (
        <Box sx={{ m: 2 }}>
            <Chip label={translation.addRemoveBots} />
            <Chip
                icon={<Remove />}
                color="error"
                label={
                    <Button
                        disabled={
                            lobbyState.amountBots <= 0 ||
                            personalPlayerState.rank !== 'HOST'
                        }
                        disableRipple
                        onClick={() => handleBotChange(-1)}
                        sx={{ color: 'white' }}
                    >
                        {translation.removeBot}
                    </Button>
                }
            />
            <Chip
                icon={<Add />}
                color="success"
                label={
                    <Button
                        disabled={
                            lobbyState.amountPlayers + lobbyState.amountBots >=
                                8 || personalPlayerState.rank !== 'HOST'
                        }
                        disableRipple
                        onClick={() => handleBotChange(1)}
                        sx={{ color: 'white' }}
                    >
                        {translation.addBot}
                    </Button>
                }
            />
        </Box>
    )
}
