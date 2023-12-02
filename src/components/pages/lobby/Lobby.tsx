import React, { useEffect, useRef, useState } from 'react'
import './lobby-styles/lobby.css'
import UpperBar from './UpperBar'
import PlayerTiles from './PlayerTiles'
import { LobbyProps } from '../../../types/props'
import RuleEditor from './RuleEditor'
import BotSelector from './BotSelector'
import Chatroom from '../chat/Chatroom'
import { LobbyMemberState, UserLocation } from '../../../types/types'
import ReadyButton from './ReadyButton'
import StartButton from './StartButton'
import { useNavigate } from 'react-router'
import { useLobbyState } from '../../../types/hooks/useLobbyState'
import {
    disconnectLobbyWebsocket,
    publishReadyStateChanges,
} from '../../../types/LobbyWebsocketFunctions'
import { disconnectFromChatWebsocket } from '../../../types/ChatWebsocketFunctions'

/*
The lobby component contains of the BotSelector, PlayerTiles, 
ReadyButton, RuleEditor, StartButton and UpperBar components.
It is the starting point for groups to gather and select options for their upcoming game.
*/
export default function Lobby({
    authToken,
    setUserLocation,
    username,
    translation,
}: LobbyProps) {
    const navigate = useNavigate()
    const didMount = useRef(false)
    const url: string = 'http://localhost:8080/lobby/personal/state'
    const [gameId, setGameId] = useState<string>('')
    const [lobbyState] = useLobbyState(url, authToken, setGameId)
    const [personalPlayerState, setPersonalPlayerState] =
        useState<LobbyMemberState>({
            username: '',
            imageId: 0,
            readyCheck: false,
            rank: null,
        })

    /*
    UseEffect hook that depends on the lobbyState. 
    It is responsible, that the user leaves the lobby if he gets kicked or leaves it on his own.
    */
    useEffect(() => {
        if (lobbyState) {
            const personalState: LobbyMemberState = lobbyState.playerList.find(
                (player) => player.username === username
            )
            if (personalState) {
                setPersonalPlayerState(personalState)
            } else {
                setPersonalPlayerState({
                    username: '',
                    imageId: 0,
                    readyCheck: false,
                    rank: null,
                })
            }
        }
        if (!didMount.current) {
            didMount.current = true
        } else {
            if (
                !lobbyState.playerList.find(
                    (player) => player.username === username
                )
            ) {
                disconnectFromChatWebsocket()
                disconnectLobbyWebsocket()
                setUserLocation(UserLocation.HOME)
                navigate('/')
            }
        }
    }, [lobbyState])

    /*
    useEffect depending on the gameId.
    if the game starts the user gets navigated to the game.
    */
    useEffect(() => {
        if (gameId !== '') {
            publishReadyStateChanges(authToken, lobbyState.lobbyCode, {
                ...personalPlayerState,
                readyCheck: false,
            })
            disconnectLobbyWebsocket()
            setUserLocation(UserLocation.GAME)
            navigate('/game')
        }
    }, [gameId])
    /*
    As long as the lobbyState is not fetched the component is loading.
    */
    if (!lobbyState) return <div>{translation.loading}</div>

    return (
        <div className="lobby-wrapper">
            <div className="lobby-upper-bar-wrapper">
                <UpperBar
                    lobbyState={lobbyState}
                    authToken={authToken}
                    translation={translation}
                ></UpperBar>
            </div>
            <div className="lobby-lower-bar-wrapper">
                <div className="left-side-wrapper">
                    <PlayerTiles
                        authToken={authToken}
                        lobbyState={lobbyState}
                        personalPlayerState={personalPlayerState}
                        translation={translation}
                    />
                    <BotSelector
                        authToken={authToken}
                        lobbyState={lobbyState}
                        personalPlayerState={personalPlayerState}
                        translation={translation}
                    />
                </div>
                <div className="right-side-wrapper">
                    <RuleEditor
                        gameType={lobbyState.gameType}
                        translation={translation}
                    />
                    <div className="chatroom">
                        <Chatroom
                            authToken={authToken}
                            translation={translation}
                        />

                        <div className="ready-start-button-wrapper">
                            <ReadyButton
                                authToken={authToken}
                                lobbyState={lobbyState}
                                personalPlayerState={personalPlayerState}
                                translation={translation}
                            />
                            <StartButton
                                authToken={authToken}
                                lobbyState={lobbyState}
                                personalPlayerState={personalPlayerState}
                                translation={translation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
