import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@mui/material'

/*
The Login button that is displayed on the home page and redirects to the login page.
 */
export default function LoginButton({ translation }) {
    /**
     * The navigate function is used to redirect to the login page.
     */
    const navigate = useNavigate()

    /**
     * Method that redirects to the login page.
     */
    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <Button className="loginButton" onClick={handleLogin}>
            {translation.login}
        </Button>
    )
}
