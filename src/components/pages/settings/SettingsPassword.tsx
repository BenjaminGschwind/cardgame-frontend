import React, { useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
} from '@mui/material'
import { changePassword } from '../../../types/RestFunctions'
import { Visibility, VisibilityOff } from '@mui/icons-material'

/*
The SettingsPassword component which is used to change the password of the user.
 */
export default function SettingsPassword({
    authToken,
    translation,
}: {
    authToken: string
    translation
}) {
    /**
     * state which stores the current value of the password-text-field
     */
    const [newPassword, setNewPassword] = useState('')

    /**
     * state which stores, if the password-text-field is censored as ***** or shown as plain text
     */
    const [showPassword, setShowPassword] = React.useState(false)

    /**
     * state which stores, if the success message should be shown
     */
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    /**
     * state which stores, if the error message should be shown
     */
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    /**
     * function which handles toggles the showPassword state
     */
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    /**
     * function which e.g. handles right/middle mouse clicks on the showPassword button
     * @param event the event which triggered the function
     */
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    /**
     * sets the newPassword state to the current version of the password text-field
     * @param event the event which triggered the function (e.g. keyboard input)
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.currentTarget.value)
    }

    /**
     * sends the credentials to the rest-function which sends them to the backend.
     * called if the user clicks on the update button.
     * @param event
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let isInputValid: boolean = await changePassword(authToken, newPassword)

        if (isInputValid) {
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
        } else {
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate={true}>
            <Card sx={{ mt: 3 }}>
                <CardHeader
                    subheader={translation.updatePassword}
                    title={translation.password}
                />
                {showSuccessMessage && (
                    <Alert
                        className={'feedback-message'}
                        onClose={() => setShowSuccessMessage(false)}
                        variant="outlined"
                        severity="success"
                    >
                        {translation.successMessage}
                    </Alert>
                )}
                {showErrorMessage && (
                    <Alert
                        className={'feedback-message'}
                        onClose={() => setShowErrorMessage(false)}
                        variant="outlined"
                        severity="error"
                    >
                        {translation.errorMessage}
                    </Alert>
                )}
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        required
                        label={translation.password}
                        margin="normal"
                        name="password"
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        variant="outlined"
                        error={newPassword.length < 8}
                        placeholder={translation.enterPassword}
                        helperText={
                            newPassword.length < 8
                                ? translation.passwordRequirements
                                : ''
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
                        disabled={newPassword.length < 8}
                    >
                        {translation.update}
                    </Button>
                </Box>
            </Card>
        </form>
    )
}
