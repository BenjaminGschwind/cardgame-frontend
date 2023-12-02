import React, { useEffect, useState } from 'react'
import './app.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop'
import Lobby from './pages/lobby/Lobby'
import PublicLobbies from './pages/public-lobbies/PublicLobbies'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Settings from './pages/settings/Settings'
import Game from './pages/game/CardGame'
import PageNotFound from './pages/page-not-found/PageNotFound'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import Sidebar from './sidebar/Sidebar'
import ProtectedRoute from './pages/ProtectedRoute'
import { LobbyMemberState, UserLocation, UserRole } from '../types/types'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Translation from './translations.json'

/*
The App component is the root component of the application.
It is responsible for managing the state of the application
and passing it down to the components that need it.
 */
export default function App() {
    /**
     * Evaluates the value of the authToken in sessionStorage.
     */
    const evaluateAuthToken = () => {
        if (sessionStorage.getItem('authToken') !== null) {
            return sessionStorage.getItem('authToken')
        }
        return ''
    }

    /**
     * The authToken state is used to store the authToken of the user.
     */
    const [authToken, setAuthToken] = useState<string>(() =>
        evaluateAuthToken()
    )

    /**
     * When the authToken state changes, the authToken is stored in sessionStorage.
     */
    useEffect(() => {
        sessionStorage.setItem('authToken', authToken)
        if (authToken !== '') {
            setIsReadyToJoinLobby(true)
        } else {
            setIsReadyToJoinLobby(false)
        }
    }, [authToken])

    /**
     * Evaluates the value of the username in sessionStorage.
     */
    const evaluateUsername = () => {
        const sessionValue = sessionStorage.getItem('username')
        if (sessionValue !== null) {
            return sessionValue
        }
        return ''
    }

    /**
     * The username state is used to store the username of the user.
     */
    const [username, setUsername] = useState<string>(() => evaluateUsername())

    /**
     * When the username state changes, the username is stored in sessionStorage.
     */
    useEffect(() => {
        setPlayerState({ ...playerState, username: username })
        sessionStorage.setItem('username', username)
    }, [username])

    /**
     * Evaluates the value of the userLocation in sessionStorage.
     */
    const evaluateUserLocation = () => {
        const sessionValue = sessionStorage.getItem('userLocation')
        if (sessionValue !== null) {
            return JSON.parse(sessionValue)
        }
        return UserLocation.HOME
    }

    /**
     * The userLocation state is used to store the userLocation of the user.
     */
    const [userLocation, setUserLocation] = useState<UserLocation>(() =>
        evaluateUserLocation()
    )

    /**
     * When the userLocation state changes, the userLocation is stored in sessionStorage.
     */
    useEffect(() => {
        sessionStorage.setItem('userLocation', JSON.stringify(userLocation))
    }, [userLocation])

    /**
     * Evaluates the value of the userRole in sessionStorage.
     */
    const evaluateUserRole = () => {
        const sessionValue = sessionStorage.getItem('userRole')
        if (sessionValue !== null) {
            return JSON.parse(sessionValue)
        }
        return UserRole.GUEST
    }

    /**
     * The userRole state is used to store the userRole of the user.
     */
    const [userRole, setUserRole] = useState<UserRole>(() => evaluateUserRole())

    /**
     * When the userRole state changes, the userRole is stored in sessionStorage.
     */
    useEffect(() => {
        sessionStorage.setItem('userRole', JSON.stringify(userRole))
    }, [userRole])

    /**
     * The playerState state is used to store the playerState of the user.
     */
    const [playerState, setPlayerState] = useState<LobbyMemberState>({
        username: '',
        imageId: 0,
        readyCheck: false,
        rank: null,
    })

    /**
     * Evaluates the value of the isReadyToJoinLobby in sessionStorage.
     */
    const [isReadyToJoinLobby, setIsReadyToJoinLobby] = useState<boolean>(false)

    /**
     * Evaluates the value of the darkTheme in sessionStorage.
     */
    const evaluateTheme = () => {
        if (sessionStorage.getItem('theme') !== null) {
            return sessionStorage.getItem('theme') === 'true'
        } else {
            return false
        }
    }

    /**
     * The darkTheme state is used to store the theme of the application.
     */
    const [darkTheme, setTheme] = useState<boolean>(() => evaluateTheme())

    /**
     * When the darkTheme state changes, the theme is stored in sessionStorage.
     */
    useEffect(() => {
        sessionStorage.setItem('theme', JSON.stringify(darkTheme))
    }, [darkTheme])

    /**
     * The selectTheme function is used to select the theme of the application.
     */
    function selectTheme() {
        if (!darkTheme) {
            return createTheme({
                palette: {
                    mode: 'light',
                },
            })
        } else {
            return createTheme({
                palette: {
                    mode: 'dark',
                },
            })
        }
    }

    const evaluateLanguage = () => {
        if (sessionStorage.getItem('language') !== null) {
            return sessionStorage.getItem('language')
        } else {
            return 'English'
        }
    }

    const [language, setLanguage] = useState<string>(() => evaluateLanguage())
    const [translation, setTranslation] = useState({})

    useEffect(() => {
        sessionStorage.setItem('language', language)
        if (language === 'English') {
            setTranslation(Translation.english)
        } else if (language === 'Deutsch') {
            setTranslation(Translation.deutsch)
        } else if (language === 'Francais') {
            setTranslation(Translation.francais)
        } else if (language === 'Espanol') {
            setTranslation(Translation.espanol)
        } else if (language === '日本') {
            setTranslation(Translation.日本)
        }
    }, [language])

    return (
        <ThemeProvider theme={selectTheme()}>
            <CssBaseline />
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Sidebar
                                page={
                                    <Home
                                        authToken={authToken}
                                        setAuthToken={setAuthToken}
                                        setUsername={setUsername}
                                        setUserLocation={setUserLocation}
                                        userRole={userRole}
                                        setUserRole={setUserRole}
                                        isReadyToJoinLobby={isReadyToJoinLobby}
                                        setIsReadyToJoinLobby={
                                            setIsReadyToJoinLobby
                                        }
                                        setTheme={setTheme}
                                        darkTheme={darkTheme}
                                        language={language}
                                        setLanguage={setLanguage}
                                        translation={translation}
                                    />
                                }
                                userLocation={userLocation}
                                translation={translation}
                            />
                        }
                    />
                    <Route
                        path={'/public-lobbies'}
                        element={
                            <Sidebar
                                page={
                                    <PublicLobbies
                                        translation={translation}
                                        isReadyToJoinLobby={isReadyToJoinLobby}
                                        setIsReadyToJoinLobby={
                                            setIsReadyToJoinLobby
                                        }
                                        setUsername={setUsername}
                                        authToken={authToken}
                                        setAuthToken={setAuthToken}
                                        setUserLocation={setUserLocation}
                                    />
                                }
                                userLocation={userLocation}
                                translation={translation}
                            />
                        }
                    />
                    <Route
                        path={'/shop'}
                        element={
                            <Sidebar
                                page={<Shop translation={translation} />}
                                userLocation={userLocation}
                                translation={translation}
                            />
                        }
                    />
                    <Route
                        path={'/leaderboard'}
                        element={
                            <Sidebar
                                page={
                                    <Leaderboard
                                        authToken={authToken}
                                        translation={translation}
                                        userRole={userRole}
                                    />
                                }
                                userLocation={userLocation}
                                translation={translation}
                            />
                        }
                    />
                    <Route
                        path={'/settings'}
                        element={
                            <Sidebar
                                page={
                                    <Settings
                                        authToken={authToken}
                                        userRole={userRole}
                                        setUsername={setUsername}
                                        translation={translation}
                                        userLocation={userLocation}
                                    />
                                }
                                userLocation={userLocation}
                                translation={translation}
                            />
                        }
                    />
                    <Route
                        path={'/lobby'}
                        element={
                            <ProtectedRoute
                                page={
                                    <Sidebar
                                        page={
                                            <Lobby
                                                authToken={authToken}
                                                setUserLocation={
                                                    setUserLocation
                                                }
                                                username={username}
                                                translation={translation}
                                            />
                                        }
                                        userLocation={userLocation}
                                        translation={translation}
                                    />
                                }
                                claim={userLocation === UserLocation.LOBBY}
                            />
                        }
                    />
                    <Route
                        path={'/game'}
                        element={
                            <ProtectedRoute
                                page={
                                    <Game
                                        authToken={authToken}
                                        username={username}
                                        setUserLocation={setUserLocation}
                                        translation={translation}
                                    />
                                }
                                claim={userLocation === UserLocation.GAME}
                            />
                        }
                    />
                    <Route
                        path={'/login'}
                        element={
                            <ProtectedRoute
                                page={
                                    <Login
                                        setAuthToken={setAuthToken}
                                        setUsername={setUsername}
                                        setUserRole={setUserRole}
                                        translation={translation}
                                    />
                                }
                                claim={authToken === ''}
                            />
                        }
                    />
                    <Route
                        path={'/register'}
                        element={
                            <ProtectedRoute
                                page={
                                    <Register
                                        setAuthToken={setAuthToken}
                                        setUsername={setUsername}
                                        setUserRole={setUserRole}
                                        translation={translation}
                                    />
                                }
                                claim={authToken === ''}
                            />
                        }
                    />
                    <Route
                        path={'/*'}
                        element={<PageNotFound translation={translation} />}
                    />
                </Routes>
            </div>
        </ThemeProvider>
    )
}
