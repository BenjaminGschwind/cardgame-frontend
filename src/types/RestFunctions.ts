import { GameType } from './types'

/*
Backend Server prefix for requests
*/
const serverAddress = 'http://localhost:8080'

/**
 * Function that gets called when somebody tries to log in.
 * @param setAuthToken Function that gets called if login was successful and the user received an authToken.
 * @param username the provided username for the login.
 * @param password the provided password for the login.
 * @returns Promise<boolean> indicates if the login was successful or not.
 */
export async function login(
    setAuthToken: (token: string) => void,
    username: string,
    password: string
): Promise<boolean> {
    const loginRequest = { username: username, password: password }
    const loginResponse = await fetch(serverAddress + '/security/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
    })

    if (loginResponse.status !== 200) {
        return false
    }

    let response = await loginResponse.json()
    setAuthToken('Bearer ' + response.token)
    return true
}

/**
 * Function that gets called when somebody tries to register.
 * @param setAuthToken Function that gets called if login was successful and the user received an authToken.
 * @param username the provided username for registration.
 * @param password the provided password for registration.
 * @returns Promise<boolean> indicates if the registration was successful or not.
 */
export async function register(
    setAuthToken: (token: string) => void,
    username: string,
    password: string
): Promise<boolean> {
    const registerRequest = { username: username, password: password }
    const registerResponse = await fetch(serverAddress + '/security/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
    })

    if (registerResponse.status !== 200) {
        return false
    }

    let response = await registerResponse.json()
    setAuthToken('Bearer ' + response.token)
    return true
}

/**
 * Function that gets called when somebody tries to change his password
 * @param authToken token with which the backend identifies the user.
 * @param newPassword the new password provided for the password change.
 * @returns Promise<boolean> indicates if the password change was successful or not.
 */
export async function changePassword(
    authToken: string,
    newPassword: string
): Promise<boolean> {
    const changePasswordRequest = { newPassword: newPassword }
    const changePasswordResponse = await fetch(
        serverAddress + '/user/change/password',
        {
            method: 'PUT',
            headers: getAuthHeader(authToken),
            body: JSON.stringify(changePasswordRequest),
        }
    )
    return changePasswordResponse.status === 200
}

/**
 * Function that gets called when somebody tries change his username
 * @param authToken token with which the backend identifies the user.
 * @param newUsername the new username provided for the username change.
 * @returns Promise<boolean> indicates if the username change was successful or not.
 */
export async function changeUsername(
    authToken: string,
    newUsername: string
): Promise<boolean> {
    const changeUsernameRequest = { newUsername: newUsername }
    const changeUsernameResponse = await fetch(
        serverAddress + '/user/change/username',
        {
            method: 'PUT',
            headers: getAuthHeader(authToken),
            body: JSON.stringify(changeUsernameRequest),
        }
    )
    return changeUsernameResponse.status === 200
}

/**
 * Function that gets called when somebody tries to join a lobby.
 * @param authToken token with which the backend identifies the user.
 * @param lobbyCode the lobbyCode of the lobby the user tries to join.
 * @returns Promise<boolean> indicates if the lobby join was successful or not.
 */
export async function joinLobby(
    authToken: string,
    lobbyCode: string
): Promise<boolean> {
    const joinLobbyResponse = await fetch(
        serverAddress + '/lobby/' + lobbyCode + '/join',
        {
            method: 'POST',
            headers: getAuthHeader(authToken),
        }
    )
    return joinLobbyResponse.status === 200
}

/**
 * Function that gets called when somebody tries to leave a lobby.
 * @param authToken token with which the backend identifies the user.
 * @param lobbyCode the lobbyCode of the lobby the user tries to leave.
 * @returns Promise<boolean> indicates if the lobby leave was successful or not.
 */
export async function leaveLobby(
    authToken: string,
    lobbyCode: string
): Promise<boolean> {
    const leaveLobbyResponse = await fetch(
        serverAddress + '/lobby/' + lobbyCode + '/leave',
        {
            method: 'PUT',
            headers: getAuthHeader(authToken),
        }
    )
    return leaveLobbyResponse.status === 200
}

/**
 * Function that gets called when somebody tries to create a Lobby.
 * @param authToken token with which the backend identifies the user.
 * @param gameType the gameType of the lobby that will be created.
 * @returns Promise<boolean> indicates if the lobby creation was successful or not.
 */
export async function createLobby(
    authToken: string,
    gameType: GameType
): Promise<boolean> {
    const gameTypeRequest = {
        gameType: gameType,
    }
    const createLobbyResponse = await fetch(serverAddress + '/lobby/create', {
        method: 'POST',
        headers: getAuthHeader(authToken),
        body: JSON.stringify(gameTypeRequest),
    })
    return createLobbyResponse.status === 200
}

/**
 * Function that gets called when somebody tries to join a Lobby but is not logged in.
 * @param username the provided username for guest registration
 * @returns Promise<any> returns error message if username is already taken else the authToken.
 */
export async function registerGuest(username: string): Promise<any> {
    const registerGuestRequest = { username: username, password: '' }
    const registerGuestResponse = await fetch(
        serverAddress + '/security/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerGuestRequest),
        }
    )
    if (registerGuestResponse.status !== 200) {
        return 'Error: username already taken'
    }

    let response = await registerGuestResponse.json()
    return response.token
}

/*
Function that gets called when the Public Lobbies page is loaded
*/
export async function getPublicLobbies() {
    const requestOptions = {
        method: 'GET',
    }
    const response = await fetch(
        serverAddress + '/lobby/get/public/lobbies',
        requestOptions
    )
    const data = await response.json()
    return data
}

/*
Function that gets called when the Leaderboard page is loaded
*/
export async function getGlobalLeaderboard() {
    const requestOptions = {
        method: 'GET',
    }
    const response = await fetch(serverAddress + '/leaderboard', requestOptions)
    const data = await response.json()
    return data
}

/*
Function that gets called when logged in and the Leaderboard page is loaded
*/
export async function getPersonalLeaderboard(authToken: string) {
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: authToken },
    }
    const response = await fetch(
        serverAddress + '/leaderboard/stats',
        requestOptions
    )
    const data = await response.json()
    return data
}

/**
 * Function that gets called to generate the HTTP header containing the authToken
 * @param authToken token with which the backend identifies the user.
 * @returns Headers containing authToken
 */
export function getAuthHeader(authToken: string): Headers {
    const headers = new Headers()
    headers.append('Authorization', authToken)
    headers.append('Content-Type', 'application/json')
    return headers
}
