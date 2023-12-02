import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@mui/material'

/*
The Register button that is displayed on the home page and redirects the user to the registration page.
 */
export default function RegisterButton({ translation }) {
    /**
     * The navigate function is used to redirect the user to the registration page.
     */
    const navigate = useNavigate()

    /**
     * Method that navigates the user to the registration page.
     */
    const handleRegistration = () => {
        navigate('/register')
    }

    return (
        <Button className="registerButton" onClick={handleRegistration}>
            {translation.register}
        </Button>
    )
}
