import { useEffect, useState } from 'react'
import {
    connectToChatWebsocket,
    publishChatJoin,
} from '../ChatWebsocketFunctions'
import { getAuthHeader } from '../RestFunctions'
import { ChatMessage } from '../types'

/**
 * useChat is a custom hook that handles the chat state,
 * connects to the chat websocket and sends a join message to the chatroom.
 * It gets called on render of the chat component and fetches all needed information for the connection.
 * @param authToken token with which the backend identifies the user.
 * @returns the chatState and the chatroomId
 */
export function useChat(authToken: string): [ChatMessage[], string] {
    const [chatState, setChatState] = useState<ChatMessage[]>([])
    /**
     * Function that handles chat state changes. It appends new messages to the chat.
     * @param chatMessage the new message.
     */
    const handleChatStateChange = (chatMessage: ChatMessage) => {
        setChatState((prevState) => [...prevState, chatMessage])
    }
    const [chatroomId, setChatroomId] = useState<string>()

    useEffect(() => {
        const chatroomIdFetch = async () => {
            const lobbyState = await (
                await fetch('http://localhost:8080/lobby/personal/state', {
                    method: 'GET',
                    headers: getAuthHeader(authToken),
                })
            ).json()

            setChatroomId(lobbyState.lobbyCode)

            connectToChatWebsocket(
                lobbyState.lobbyCode,
                handleChatStateChange
            ).then(() => {
                publishChatJoin(lobbyState.lobbyCode, authToken)
            })
        }
        chatroomIdFetch()
    }, [])
    return [chatState, chatroomId]
}
