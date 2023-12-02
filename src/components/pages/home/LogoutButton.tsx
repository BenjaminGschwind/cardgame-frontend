import React from 'react'
import { Button } from '@mui/material'
import { LogoutProps } from '../../../types/props'
import { UserRole } from '../../../types/types'

/*
Logout button that clears the auth token, username and user role
 */
export default function LogoutButton({
    setAuthToken,
    setUsername,
    setUserRole,
    translation,
}: LogoutProps) {
    /**
     * Clears the auth token, username and user role when the logout button is clicked
     */
    const handleLogout = () => {
        setAuthToken('')
        setUsername('')
        setUserRole(UserRole.GUEST)
    }

    return (
        <Button className="logoutButton" onClick={handleLogout}>
            {translation.logout}
        </Button>
    )
}
