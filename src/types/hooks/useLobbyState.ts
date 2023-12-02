import { useEffect, useState } from 'react'
import { connectToLobbyWebsocket } from '../LobbyWebsocketFunctions'
import { getAuthHeader } from '../RestFunctions'
import { LobbyState } from '../types'

/**
 * useLobbyState is a custom hook that handles lobby state and connects to the lobby websocket.
 * It gets called on render of the lobby and fetches all needed information that the lobby needs.
 * @param url url for the fetch of the lobbyState
 * @param authToken token with which the backend identifies the user.
 * @param setGameId function for setting the gameId once the game starts.
 * @returns the lobbyState
 */
export function useLobbyState(
    url: string,
    authToken: string,
    setGameId: (gameId: string) => void
): [LobbyState] {
    const [lobbyState, setLobbyState] = useState<LobbyState>()
    const handleLobbyStateChange = (lobbyState: LobbyState) => {
        setLobbyState(lobbyState)
    }
    useEffect(() => {
        const lobbyStateFetch = async () => {
            const lobbyState = await (
                await fetch(url, {
                    method: 'GET',
                    headers: getAuthHeader(authToken),
                })
            ).json()
            handleLobbyStateChange(lobbyState)
            connectToLobbyWebsocket(
                lobbyState.lobbyCode,
                handleLobbyStateChange,
                setGameId
            )
        }
        lobbyStateFetch()
    }, [])
    return [lobbyState]
}
