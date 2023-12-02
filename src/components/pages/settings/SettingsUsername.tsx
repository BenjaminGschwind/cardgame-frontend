import React, { useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
} from '@mui/material'
import { changeUsername } from '../../../types/RestFunctions'

/*
The SettingsUsername component used to change the username of the user.
 */
export default function SettingsUsername({
    authToken,
    setUsername,
    translation,
}: {
    authToken: string
    setUsername: (username: string) => void
    translation
}) {
    /**
     * state which stores the current value of the username-text-field
     */
    const [newUsername, setNewUsername] = useState('')

    /**
     * state which stores, if the success message should be shown
     */
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    /**
     * state which stores, if the error message should be shown
     */
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    /**
     * sets the newUsername state to the current version of the username text-field
     * @param event the event which is triggered by the text-field
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUsername(event.currentTarget.value)
    }

    /**
     * sends the username to the rest-function which sends it to the backend.
     * @param event the event which is triggered by the update button
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let isInputValid: boolean = await changeUsername(authToken, newUsername)

        if (isInputValid) {
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            setUsername(newUsername)
        } else {
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate={true}>
            <Card sx={{ mt: 3 }}>
                <CardHeader
                    subheader={translation.updateUsername}
                    title={translation.username}
                />
                {showSuccessMessage && (
                    <Alert
                        className={'feedback-message'}
                        onClose={() => setShowSuccessMessage(false)}
                        variant="outlined"
                        severity="success"
                    >
                        {translation.successMessageUsername}
                    </Alert>
                )}
                {showErrorMessage && (
                    <Alert
                        className={'feedback-message'}
                        onClose={() => setShowErrorMessage(false)}
                        variant="outlined"
                        severity="error"
                    >
                        {translation.errorMessageUsername}
                    </Alert>
                )}
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        required
                        label={translation.username}
                        margin="normal"
                        name="username"
                        onChange={handleChange}
                        type={'text'}
                        value={newUsername}
                        variant="outlined"
                        error={newUsername.length < 1}
                        placeholder={translation.enterUsername}
                        helperText={
                            newUsername.length < 1
                                ? translation.usernameRequirements
                                : ''
                        }
                    />
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        type={'submit'}
                        disabled={newUsername.length < 1}
                    >
                        {translation.update}
                    </Button>
                </Box>
            </Card>
        </form>
    )
}
