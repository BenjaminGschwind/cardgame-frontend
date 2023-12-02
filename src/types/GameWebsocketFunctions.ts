import { Client } from '@stomp/stompjs'
import {
    GameState,
    MauMauCommands,
    InteractionResponse,
    Card,
    CardSuit,
} from './types'
import { Subscription } from 'stompjs'

const serverAddress = 'ws://localhost:8080/ws'

let stompGameClient: Client
let receiveGameStateSubscription: Subscription
let receiveInteractionSubscription: Subscription

/**
 * Function which connects to the Websocket in Backend.
 * It defines the callback for successfully and unsuccessfully connection.
 * @param gameId id of the game that we try to connect to.
 * @param personalChannelId id of a private channel that we try to connect to.
 * @param handleGameStateChange function which handles changes in the gameState
 * @param handleInteractionResult function which handles changes concerning personal game information.
 * @returns Promise
 */
export function connectToGameWebsocket(
    gameId: string,
    personalChannelId: number,
    handleGameStateChange: (gameState: GameState) => void,
    handleInteractionResult: (interactionResponse: InteractionResponse) => void
) {
    return new Promise(function (resolve, reject) {
        if (stompGameClient !== null) {
            stompGameClient = new Client()
        }
        if (stompGameClient.connected) {
            stompGameClient.deactivate()
        }

        stompGameClient.brokerURL = serverAddress
        stompGameClient.onConnect = () =>
            onConnectedToGame(
                gameId,
                personalChannelId,
                handleGameStateChange,
                handleInteractionResult,
                resolve
            )

        stompGameClient.onStompError = () => onError(reject)
        stompGameClient.activate()
    })
}

/**
 * The callback function for a successfully websocket connection.
 * It subscribes to relevant channels concerning the game and sets callback functions.
 * It resolves the connection promise.
 * @param gameId id of the game that we try to connect to.
 * @param personalChannelId id of a private channel that we try to connect to.
 * @param handleGameStateChange function which handles changes in the gameState
 * @param handleInteractionResult function which handles changes concerning personal game information.
 * @param resolve function that resolves the connection promise.
 */
function onConnectedToGame(
    gameId: string,
    personalChannelId: number,
    handleGameStateChange: (gameState: GameState) => void,
    handleInteractionResult: (interactionResponse: InteractionResponse) => void,
    resolve: (value: unknown) => void
) {
    if (stompGameClient === null) {
        return
    }

    receiveInteractionSubscription = stompGameClient.subscribe(
        `/topic/game/${gameId}/interact/${personalChannelId}`,
        (payload: any) =>
            onInteractionResponse(payload, handleInteractionResult)
    )
    receiveGameStateSubscription = stompGameClient.subscribe(
        `/topic/game/${gameId}`,
        (payload: any) => onGameStateReceived(payload, handleGameStateChange)
    )
    resolve(stompGameClient)
}

/**
 * Callback function for the private channel which gets called if we receive interaction responses.
 * @param payload the interaction result.
 * @param handleInteractionResult function that handles the interaction result.
 */
function onInteractionResponse(
    payload: any,
    handleInteractionResult: (interactionResponse: InteractionResponse) => void
) {
    let interactionResponse: InteractionResponse = JSON.parse(payload.body)
    handleInteractionResult(interactionResponse)
}

/**
 * Callback function for the gameState channel which gets called if we receive a new gameState.
 * @param payload the new gameState.
 * @param handleGameStateChange function that handles the new gameState.
 */
function onGameStateReceived(
    payload: any,
    handleGameStateChange: (gameState: GameState) => void
) {
    let gameState: GameState = JSON.parse(
        JSON.parse(payload.body).gameStateString
    )
    handleGameStateChange(gameState)
}

/**
 * Function that gets called when you try to interact with the MauMau game
 * @param authToken token with which the backend identifies the user.
 * @param gameId the id of the game we try to interact with.
 * @param interaction the type of maumau interaction.
 * @param card optional parameter if we play a card.
 * @param cardSuit optional parameter for action card jack.
 */
export function publishMauMauInteraction(
    authToken: string,
    gameId: string,
    interaction: MauMauCommands,
    card?: Card,
    cardSuit?: CardSuit
) {
    switch (interaction) {
        case MauMauCommands.GET_HAND:
            const getHandRequest = {
                authToken: authToken,
                interaction: interaction,
            }
            stompGameClient.publish({
                destination: `/app/game/${gameId}/interact`,
                body: JSON.stringify(getHandRequest),
            })
            break
        case MauMauCommands.DISCARD:
            if (typeof card !== 'undefined') {
                const discardRequest = {
                    authToken: authToken,
                    interaction:
                        interaction + ' ' + card.suit + ':' + card.value,
                }
                stompGameClient.publish({
                    destination: `/app/game/${gameId}/interact`,
                    body: JSON.stringify(discardRequest),
                })
            }
            break
        case MauMauCommands.DRAW_FROM_PILE:
            const drawRequest = {
                authToken: authToken,
                interaction: interaction + ' 1',
            }
            stompGameClient.publish({
                destination: `/app/game/${gameId}/interact`,
                body: JSON.stringify(drawRequest),
            })
            break
        case MauMauCommands.PASS:
            const passRequest = {
                authToken: authToken,
                interaction: interaction,
            }
            stompGameClient.publish({
                destination: `/app/game/${gameId}/interact`,
                body: JSON.stringify(passRequest),
            })
            break
        case MauMauCommands.PLAY:
            if (
                typeof card !== 'undefined' &&
                typeof cardSuit !== 'undefined'
            ) {
                const playJackRequest = {
                    authToken: authToken,
                    interaction:
                        interaction +
                        ' ' +
                        card.suit +
                        ':' +
                        card.value +
                        ' ' +
                        cardSuit,
                }
                stompGameClient.publish({
                    destination: `/app/game/${gameId}/interact`,
                    body: JSON.stringify(playJackRequest),
                })
            }
            break
        default: {
            break
        }
    }
}

/**
 * The callback function for an unsuccessfully websocket connection.
 * @param reject function which rejects the connection promise.
 */
function onError(reject: (reason?: any) => void) {
    reject(stompGameClient)
}

/**
 * Function that gets called when you disconnect the websocket connection.
 */
export function disconnectFromGameWebsocket() {
    if (stompGameClient !== null) {
        if (receiveGameStateSubscription !== null) {
            receiveGameStateSubscription.unsubscribe()
        }
        if (receiveInteractionSubscription !== null) {
            receiveInteractionSubscription.unsubscribe()
        }
        stompGameClient
            .deactivate()
            .then(() => console.log('disconnected from game'))
            .catch(() => console.log('error disconnecting from game'))
    }
}
