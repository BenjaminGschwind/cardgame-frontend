import {
    MenuItem,
    Stack,
    Typography,
    Switch,
    Button,
    Tooltip,
    TextField,
} from '@mui/material'
import React from 'react'
import './lobby-styles/upperBar.css'
import { Difficulty, GameType, Visibility } from '../../../types/types'
import { LobbyUpperBarProps } from '../../../types/props'
import { publishLobbyChanges } from '../../../types/LobbyWebsocketFunctions'
import { leaveLobby } from '../../../types/RestFunctions'

/*
The UpperBar component provides the ability to change the gameType, leave the lobby, 
copy the lobbyCode, set the bot difficulty and toggle the visibility
*/
export default function UpperBar({
    lobbyState,
    authToken,
    translation,
}: LobbyUpperBarProps) {
    /**
     * function that changes the gameType by calling the publishLobbyChanges websocket function.
     * @param event the new gameType.
     */
    const handleGameTypeChange = (event: any) => {
        publishLobbyChanges(authToken, {
            ...lobbyState,
            gameType: GameType[event.target.value],
        })
    }

    /**
     * function that changes the bot difficulty by calling the publishLobbyChanges websocket function.
     * @param event the new difficulty.
     */
    const handleDifficultyChange = (event: any) => {
        publishLobbyChanges(authToken, {
            ...lobbyState,
            difficulty: Difficulty[event.target.value],
        })
    }

    /**
     * function that changes the lobby visibility by calling the publishLobbyChanges websocket function.
     * @param event the new visibility.
     */
    const handleVisibilityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        publishLobbyChanges(authToken, {
            ...lobbyState,
            visibility: event.target.checked
                ? Visibility.PRIVATE
                : Visibility.PUBLIC,
        })
    }

    /**
     * function that handles the lobby leave by calling the corresponding rest function.
     */
    const handleLeaveLobby = () => {
        leaveLobby(authToken, lobbyState.lobbyCode)
    }

    const gameTypeKeys = Object.keys(GameType)
    const difficultyKeys = Object.keys(Difficulty)
    return (
        <div className="upper-bar-wrapper">
            <Button
                color={'error'}
                variant={'contained'}
                onClick={handleLeaveLobby}
            >
                {translation.leave}
            </Button>

            <TextField
                id="filled-select-gameType"
                label={translation.game}
                variant="outlined"
                select
                value={
                    Object.entries(GameType).find(
                        ([key, val]) => val === lobbyState.gameType
                    )?.[0]
                }
                onChange={handleGameTypeChange}
            >
                {gameTypeKeys.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <Tooltip title={translation.copyClipboard} arrow>
                <Button
                    sx={{ mr: 9 }}
                    onClick={() => {
                        navigator.clipboard.writeText(lobbyState.lobbyCode)
                    }}
                    variant="outlined"
                >
                    {lobbyState.lobbyCode}
                </Button>
            </Tooltip>
            <TextField
                id="filled-select-botDifficulty"
                label={translation.botDifficulty}
                variant="outlined"
                select
                disabled={lobbyState.amountBots === 0}
                value={
                    Object.entries(Difficulty).find(
                        ([key, val]) => val === lobbyState.difficulty
                    )?.[0]
                }
                onChange={handleDifficultyChange}
            >
                {difficultyKeys.map((option) => (
                    <MenuItem key={option} value={option}>
                        {translation[option]}
                    </MenuItem>
                ))}
            </TextField>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mr: 6 }}
            >
                <Typography>{translation.public}</Typography>
                <Switch
                    checked={lobbyState.visibility === Visibility.PRIVATE}
                    onChange={handleVisibilityChange}
                />
                <Typography>{translation.private}</Typography>
            </Stack>
        </div>
    )
}
