import { Client } from '@stomp/stompjs'
import {
    LobbyState,
    LobbyMemberState,
    GameType,
    Difficulty,
    Visibility,
} from './types'
import { Subscription } from 'stompjs'

const serverAddress = 'ws://localhost:8080/ws'

let stompLobbyClient: Client
let receiveLobbyStateSubscription: Subscription
let receiveGameStartSubscription: Subscription

/**
 * Function which connects to the Websocket in Backend.
 * It defines the callback for successfully and unsuccessfully connection
 * @param lobbyCode lobby identifier of the lobby we try to connect to.
 * @param handleLobbyStateChange callback function that handles lobbyState changes.
 * @param setGameId callback function that sets a gameId if a game starts.
 */
export function connectToLobbyWebsocket(
    lobbyCode: string,
    handleLobbyStateChange: (lobbyState: LobbyState) => void,
    setGameId: (gameId: string) => void
) {
    if (stompLobbyClient !== null) {
        stompLobbyClient = new Client()
    }
    if (stompLobbyClient.connected) {
        stompLobbyClient.deactivate()
    }

    stompLobbyClient.brokerURL = serverAddress
    stompLobbyClient.onConnect = () =>
        onConnectedToLobby(lobbyCode, handleLobbyStateChange, setGameId)
    stompLobbyClient.onStompError = () => onError()
    stompLobbyClient.activate()
}

/**
 * Function that gets called when you disconnect the websocket connection.
 */
export function disconnectLobbyWebsocket() {
    if (stompLobbyClient.connected) {
        if (
            receiveLobbyStateSubscription !== null &&
            receiveGameStartSubscription !== null
        ) {
            receiveLobbyStateSubscription.unsubscribe()
            receiveGameStartSubscription.unsubscribe()
        }
        stompLobbyClient
            .deactivate()
            .then(() => console.log('disconnected from lobby'))
            .catch(() => console.log('error disconnecting from lobby'))
    }
}

/**
 * The callback function for a successfully websocket connection.
 * It subscribes to relevant channels concerning the lobby and sets callback functions.
 * @param lobbyCode lobby identifier of the lobby for subscribing to the channels.
 * @param handleLobbyStateChange callback function that handles lobbyState changes.
 * @param setGameId callback function that sets a gameId if a game starts.
 */
function onConnectedToLobby(
    lobbyCode: string,
    handleLobbyStateChange: (lobbyState: LobbyState) => void,
    setGameId: (gameId: string) => void
) {
    if (stompLobbyClient === null) {
        return
    }
    receiveLobbyStateSubscription = stompLobbyClient.subscribe(
        `/topic/lobby/${lobbyCode}`,
        (payload: any) => onLobbyStateReceived(payload, handleLobbyStateChange)
    )
    receiveGameStartSubscription = stompLobbyClient.subscribe(
        `/topic/lobby/${lobbyCode}/start`,
        (payload: any) => onGameStart(payload, setGameId)
    )
}
/**
 * Callback function for unsuccessful websocket connection
 */
function onError() {}

/**
 * Callback function that gets called when lobbyState changes get received.
 * @param payload the new lobbyState
 * @param handleLobbyStateChange function that handles the new lobbyState
 */
function onLobbyStateReceived(
    payload: any,
    handleLobbyStateChange: (lobbyState: LobbyState) => void
) {
    let payloadData: LobbyState = JSON.parse(payload.body)
    if (payloadData.amountPlayers === 0) {
        handleLobbyStateChange({
            ...payloadData,
            gameType: GameType.MauMau,
            difficulty: Difficulty.Easy,
            visibility: Visibility.PRIVATE,
        })
    } else {
        handleLobbyStateChange(payloadData)
    }
}
/**
 * Callback function that gets called when the game starts
 * @param payload the gameId of the game.
 * @param setGameId sets the gamId so the lobby can navigate to the game page.
 */
function onGameStart(payload: any, setGameId: (gameId: string) => void) {
    setGameId(JSON.parse(payload.body))
}

/**
 * function that gets called when the host changes lobby settings.
 * @param authToken token with which the backend identifies the user.
 * @param lobbyState the new lobbyState we try to send to the backend
 */
export function publishLobbyChanges(authToken: string, lobbyState: LobbyState) {
    let changeSettingsRequest = {
        authToken: authToken,
        gameType: lobbyState.gameType,
        visibility: lobbyState.visibility,
        amountBots: lobbyState.amountBots,
        afkTimer: lobbyState.afkTimer,
        rules: lobbyState.rules,
        difficulty: lobbyState.difficulty,
    }
    stompLobbyClient.publish({
        destination: `/app/lobby/${lobbyState.lobbyCode}/settings`,
        body: JSON.stringify(changeSettingsRequest),
    })
}

/**
 * Function that gets called when the user changes the readystate.
 * @param authToken token with which the backend identifies the user.
 * @param lobbyCode the identifier of the lobby.
 * @param lobbyMemberState lobby member state of the user.
 */
export function publishReadyStateChanges(
    authToken: string,
    lobbyCode: string,
    lobbyMemberState: LobbyMemberState
) {
    let readyState = lobbyMemberState.readyCheck ? 'READY' : 'NOT_READY'
    let setReadyStateRequest = {
        authToken: authToken,
        readyState: readyState,
    }
    stompLobbyClient.publish({
        destination: `/app/lobby/${lobbyCode}/ready`,
        body: JSON.stringify(setReadyStateRequest),
    })
}

/**
 * Function that gets called when the user tries to start the game.
 * @param authToken token with which the backend identifies the user.
 * @param lobbyCode the identifier of the lobby.
 */
export function publishStartGame(authToken: string, lobbyCode: string) {
    let gameStartRequest = { authToken: authToken }
    stompLobbyClient.publish({
        destination: `/app/lobby/${lobbyCode}/start/game`,
        body: JSON.stringify(gameStartRequest),
    })
}

/**
 *
 * @param lobbyCode Function that gets called when the user tries to kick a player.
 * @param authToken token with which the backend identifies the user.
 * @param targetUsername username of the person that the user tries to kick.
 */
export function publishKickPlayer(
    lobbyCode: string,
    authToken: string,
    targetUsername: string
) {
    let kickPlayerRequest = {
        authToken: authToken,
        targetUsername: targetUsername,
    }
    stompLobbyClient.publish({
        destination: `/app/lobby/${lobbyCode}/kick`,
        body: JSON.stringify(kickPlayerRequest),
    })
}

export function publishPromotePlayer(
    lobbyCode: string,
    authToken: string,
    targetUsername: string
) {
    let promotePlayerRequest = {
        authToken: authToken,
        targetUsername: targetUsername,
    }
    stompLobbyClient.publish({
        destination: `/app/lobby/${lobbyCode}/transferHost`,
        body: JSON.stringify(promotePlayerRequest),
    })
}
