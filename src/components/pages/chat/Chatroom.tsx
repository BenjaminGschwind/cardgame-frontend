import React, { useEffect, useRef, useState } from 'react'
import './chatroom.css'
import { Button, TextField } from '@mui/material'
import { publishChatChanges } from '../../../types/ChatWebsocketFunctions'
import Message from './Message'
import { ChatroomProps } from '../../../types/props'
import { useChat } from '../../../types/hooks/useChat'

/*
chatroom component which handles the chatroom websocket connection and chatroom state
 */
export default function Chatroom({ authToken, translation }: ChatroomProps) {
    /**
     * state which holds the chatroom messages
     */
    const [chatState, chatroomId] = useChat(authToken)

    /**
     * state which holds the chat input to be sent to the server
     */
    const [chatInput, setChatInput] = useState('')

    /**
     * ref which is used to scroll to the bottom of the chatroom
     */
    const messagesEndRef = useRef<HTMLDivElement>(null)

    /**
     *
     */
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [chatState])

    /**
     * function which handles the chat input change by setting the chatInput state
     * @param event the event which triggered the function (e.g. keyboard input)
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChatInput(event.target.value)
    }

    /**
     * function which handles the chat input submit by sending the chatInput to the server
     * @param event the event which triggered the function (-> submit button click)
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        publishChatChanges(authToken, chatInput, chatroomId)
        setChatInput('')
    }

    /**
     * if chatState is undefined, return loading message
     */
    if (!chatState) return <div>chat loading...</div>

    return (
        <div className={'chatroom-wrapper'}>
            <div className={'message-window'}>
                {chatState.map((message, key) => (
                    <Message key={key} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={'form-wrapper'}>
                <form onSubmit={handleSubmit} noValidate={true}>
                    <TextField
                        id="chat"
                        label={translation.enterMessage}
                        variant="outlined"
                        value={chatInput}
                        onChange={handleChange}
                        size="small"
                        sx={{ width: '75%' }}
                    />
                    <Button type="submit">{translation.chatSubmit}</Button>
                </form>
            </div>
        </div>
    )
}
