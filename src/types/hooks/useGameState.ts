import { useEffect, useState } from 'react'
import {
    connectToGameWebsocket,
    publishMauMauInteraction,
} from '../GameWebsocketFunctions'
import { getAuthHeader } from '../RestFunctions'
import {
    GameState,
    GameStateResponse,
    InteractionResponse,
    MauMauCommands,
} from '../types'

/**
 * useGameState is a custom hook that handles the gameState and connects to the game websocket.
 * It gets called on render of the game and fetches all needed information that the game component needs.
 * @param personalGameStateURL  url for the fetch of the gameState.
 * @param personalChannelUrl url for the fetch of the gameId and the personal channelId for private interaction responses.
 * @param authToken token with which the backend identifies the user.
 * @param handleInteractionResult function which handles changes concerning personal game information.
 * @returns the gameState and the gameId
 */
export function useGameState(
    personalGameStateURL: string,
    personalChannelUrl: string,
    authToken: string,
    handleInteractionResult: (interactionResponse: InteractionResponse) => void
): [GameState, string] {
    const [gameState, setGameState] = useState<GameState>()
    const handleGameStateChange = (gameState: GameState) => {
        setGameState(gameState)
    }
    const [gameId, setGameId] = useState<string>()

    useEffect(() => {
        const gameStateFetch = async () => {
            let gameStateResponse: GameStateResponse = await (
                await fetch(personalGameStateURL, {
                    method: 'GET',
                    headers: getAuthHeader(authToken),
                })
            ).json()

            const gameState: GameState = JSON.parse(
                gameStateResponse.gameStateString
            )

            const personalChannelIdResponse = await (
                await fetch(personalChannelUrl, {
                    method: 'GET',
                    headers: getAuthHeader(authToken),
                })
            ).json()

            handleGameStateChange(gameState)
            setGameId(personalChannelIdResponse.gameId)
            connectToGameWebsocket(
                personalChannelIdResponse.gameId,
                personalChannelIdResponse.channelId,
                handleGameStateChange,
                handleInteractionResult
            ).then(() =>
                publishMauMauInteraction(
                    authToken,
                    personalChannelIdResponse.gameId,
                    MauMauCommands.GET_HAND
                )
            )
        }

        gameStateFetch()
    }, [])

    return [gameState, gameId]
}
