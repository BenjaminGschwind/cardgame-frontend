import React, { useState } from 'react'
import { UsernamePopupProps } from '../../../types/props'
import './home-styles/usernamePopup.css'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'

/*
UsernamePopup Component that is displayed when a user is not logged in and wants to play a game.
 */
export default function UsernamePopup({
    toggleUsernamePopup,
    usernamePopup,
    handleGuestUsernameSubmit,
    translation,
}: UsernamePopupProps) {
    /**
     * State that holds the input of the username input field
     */
    const [usernameInput, setUsernameInput] = useState<string>('')

    /**
     * Handles the input of the username input field
     * @param event the event that is triggered when the input field changes
     */
    const handleUsernameInput = (event: any) => {
        setUsernameInput(event.target.value)
    }

    return (
        <Dialog open={usernamePopup} onClose={toggleUsernamePopup}>
            <DialogTitle>{translation.chooseUsername}</DialogTitle>
            <DialogContent>
                <DialogContentText>{translation.explanation}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="usernameEntry"
                    label={translation.desiredUsername}
                    type="text"
                    fullWidth
                    variant="standard"
                    value={usernameInput}
                    onChange={handleUsernameInput}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleUsernamePopup}>
                    {translation.cancel}
                </Button>
                <Button
                    onClick={() => handleGuestUsernameSubmit(usernameInput)}
                >
                    {translation.submit}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
