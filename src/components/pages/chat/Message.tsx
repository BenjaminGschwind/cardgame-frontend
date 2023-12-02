import React from 'react'
import { ChatMessage } from '../../../types/types'

/*
a message component that displays a message
 */
export default function Message({ message }: { message: ChatMessage }) {
    return (
        <div className={'message'}>
            {message.username} ({message.timestamp}): {message.content}
        </div>
    )
}
