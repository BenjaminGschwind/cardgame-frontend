import React from 'react'
import './settings.css'
import { Box, Container } from '@mui/material'
import SettingsPassword from './SettingsPassword'
import SettingsUsername from './SettingsUsername'
import { UserLocation, UserRole } from '../../../types/types'

/*
The Settings page that allows the user to change the username and password
 */
export default function Settings({
    authToken,
    userRole,
    setUsername,
    translation,
    userLocation,
}: {
    authToken: string
    userRole: UserRole
    setUsername: (username: string) => void
    translation
    userLocation: UserLocation
}) {
    /**
     * The content of the settings page in case the user is logged in
     */
    const content = (
        <div className={'settings-content'}>
            <h1 className={'settings-content-header'}>
                {translation.settings}
            </h1>
            <Container maxWidth="lg">
                <Box sx={{ pt: 3 }}>
                    {userLocation === UserLocation.HOME && authToken !== '' && (
                        <SettingsUsername
                            authToken={authToken}
                            setUsername={setUsername}
                            translation={translation}
                        />
                    )}
                    {userRole === UserRole.REGISTERED &&
                        userLocation === UserLocation.HOME && (
                            <SettingsPassword
                                authToken={authToken}
                                translation={translation}
                            />
                        )}
                </Box>
            </Container>
        </div>
    )

    /**
     * The error message in case the user is not logged in
     */
    const errorMessage = (
        <h1 className={'errorMessage'}>{translation.settingsAccess}</h1>
    )
    return authToken !== '' ? content : errorMessage
}
