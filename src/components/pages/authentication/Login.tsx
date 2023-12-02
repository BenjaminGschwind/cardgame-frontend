import React from 'react'
import './authentication.css'
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { FormInput, UserRole } from '../../../types/types'
import { login } from '../../../types/RestFunctions'
import { AuthenticationProps } from '../../../types/props'

/*
Login page which allows the user to log in with his credentials
 */
export default function Login({
    setAuthToken,
    setUsername,
    setUserRole,
    translation,
}: AuthenticationProps) {
    /**
     * state which stores the current value of the username- and password-text-field
     */
    const [formValues, setFormValues] = React.useState<FormInput>({
        username: '',
        password: '',
    })

    /**
     * state which stores the last invalid formValues values.
     * Prevents the user from submitting invalid credentials more than once
     */
    const [lastInvalidInput, setLastInvalidInput] = React.useState<FormInput>({
        username: '',
        password: '',
    })

    /**
     * state which stores, if the password-text-field is censored as ***** or shown as plain text
     */
    const [showPassword, setShowPassword] = React.useState(false)

    /**
     * function which toggles the showPassword state
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
     * sets the formValues state to the current version of the username/password text-fields
     * @param event the event which triggered the function (e.g. keyboard input)
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    /**
     * enables the page to redirect the user after the backend accepts the credentials
     */
    const navigate = useNavigate()

    /**
     * sends the credentials to the rest-function which sends them to the backend.
     * user is redirected if credentials are correct.
     * @param event the event which triggered the function (-> click on submit button)
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let isInputValid: boolean = await login(
            setAuthToken,
            formValues.username,
            formValues.password
        )
        if (isInputValid) {
            setUsername(formValues.username)
            setUserRole(UserRole.REGISTERED)
            navigate('/', { replace: true })
        } else {
            setLastInvalidInput({
                username: formValues.username,
                password: formValues.password,
            })
        }
    }

    return (
        <div className={'form-content'}>
            <h1 className={'form-content-header'}>{translation.signIn}</h1>
            <form onSubmit={handleSubmit} noValidate={true}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    placeholder={translation.enterYourUsername}
                    helperText={
                        formValues.username.length === 0 ||
                        formValues.username === lastInvalidInput.username
                            ? translation.invalid
                            : ''
                    }
                    error={
                        formValues.username.length === 0 ||
                        formValues.username === lastInvalidInput.username
                    }
                    label={translation.username}
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    autoFocus
                    variant={'outlined'}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    error={
                        formValues.password.length === 0 ||
                        formValues.password === lastInvalidInput.password
                    }
                    name="password"
                    placeholder={translation.enterYourPassword}
                    helperText={
                        formValues.password.length === 0 ||
                        formValues.password === lastInvalidInput.password
                            ? translation.invalid
                            : ''
                    }
                    label={translation.password}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
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
                    value={formValues.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    variant={'outlined'}
                />
                <Button
                    type="submit"
                    fullWidth
                    disabled={
                        formValues.username.length === 0 ||
                        formValues.password.length === 0
                    }
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disableRipple
                >
                    {translation.signIn}
                </Button>
                <Grid container>
                    <Grid item>
                        <Typography color="textSecondary" variant="body2">
                            {translation.dontHaveAccount}
                            <Link
                                href="/register"
                                variant="body2"
                                sx={{
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                {translation.signUp}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
