import { Client } from '@stomp/stompjs'
import { ChatMessage } from './types'
import { Subscription } from 'stompjs'

const serverAddress = 'ws://localhost:8080/ws'

let stompChatClient: Client
let receiveChatStateSubscription: Subscription

/**
 * Function which connects to the Websocket in Backend.
 * It defines the callback for successfully and unsuccessfully connection
 * @param chatroomId id of the chatroom that we try to connect to.
 * @param handleChatStateChange function which handles changes in the chat state.
 * @returns Promise
 */
export function connectToChatWebsocket(
    chatroomId: string,
    handleChatStateChange: (chatMessage: ChatMessage) => void
) {
    return new Promise(function (resolve, reject) {
        if (stompChatClient !== null) {
            stompChatClient = new Client()
        }
        if (stompChatClient.connected) {
            stompChatClient.deactivate()
        }

        stompChatClient.brokerURL = serverAddress
        stompChatClient.onConnect = () =>
            onConnectedToChat(chatroomId, handleChatStateChange, resolve)

        stompChatClient.onStompError = () => onError(reject)
        stompChatClient.activate()
    })
}

/**
 * The callback function for a successfully websocket connection.
 * It subscribes to relevant channels concerning the chat and sets callback functions.
 * It resolves the connection promise.
 * @param chatroomId id of the chatroom that we try to connect to.
 * @param handleChatStateChange function which handles changes in the chat state.
 * @param resolve function to resolve the connection promise.
 */
function onConnectedToChat(
    chatroomId: string,
    handleChatStateChange: (chatMessage: ChatMessage) => void,
    resolve: (value: unknown) => void
) {
    if (stompChatClient === null) {
        return
    }
    receiveChatStateSubscription = stompChatClient.subscribe(
        `/topic/chat/${chatroomId}/receive/message`,
        (payload: any) => onChatStateReceived(payload, handleChatStateChange)
    )
    resolve(stompChatClient)
}

/**
 * The callback function for an unsuccessful websocket connection.
 * @param reject function which rejects the connection promise.
 */
function onError(reject: (reason?: any) => void) {
    reject(stompChatClient)
}

/**
 * Callback function for the message receive channel.
 * @param payload the received message.
 * @param handleChatStateChange function which handles changes in the chat state.
 */
function onChatStateReceived(
    payload: any,
    handleChatStateChange: (chatMessage: ChatMessage) => void
) {
    let payloadData: ChatMessage = JSON.parse(payload.body)
    handleChatStateChange(payloadData)
}

/**
 * Function that gets called when you join the chatroom.
 * @param chatroomId the chatroom id of the chat we joined.
 * @param authToken token with which the backend identifies the user.
 */
export function publishChatJoin(chatroomId: string, authToken: string) {
    stompChatClient.publish({
        destination: `/app/chat/${chatroomId}/join`,
        body: JSON.stringify({ authToken: authToken }),
    })
}

/**
 * Function that gets called when you send a chat message
 * @param authToken token with which the backend identifies the user.
 * @param chatMessageContent content of the message
 * @param chatroomId the chatroom id of the chat the message gets send to.
 */
export function publishChatChanges(
    authToken: string,
    chatMessageContent: string,
    chatroomId: string
) {
    let sendMessageRequest = {
        authToken: authToken,
        content: chatMessageContent,
    }
    stompChatClient.publish({
        destination: `/app/chat/${chatroomId}/send/message`,
        body: JSON.stringify(sendMessageRequest),
    })
}

/**
 * Function that gets called when you disconnect the websocket connection.
 */
export function disconnectFromChatWebsocket() {
    if (stompChatClient !== null) {
        if (receiveChatStateSubscription !== null) {
            receiveChatStateSubscription.unsubscribe()
        }
        stompChatClient
            .deactivate()
            .then(() => console.log('disconnected from chat'))
            .catch(() => console.log('error disconnecting from chat'))
    }
}
