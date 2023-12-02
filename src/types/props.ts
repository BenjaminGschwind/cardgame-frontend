import {
    Card,
    GameState,
    GameType,
    LobbyMemberState,
    LobbyState,
    PlayerState,
    UserLocation,
    UserRole,
} from './types'
import React from 'react'

/*
Properties, which get passed to the GameCard Component
*/
export interface GameCardProps {
    gameType: GameType
    handleCreateLobby: (gameType: GameType) => void
    translation
}

/*
Properties, which get passed to the Home Component 
*/
export interface HomeProps {
    authToken: string
    setAuthToken: (username: string) => void
    setUsername: (username: string) => void
    setUserLocation: (userLocation: UserLocation) => void
    userRole: UserRole
    setUserRole: (userRole: UserRole) => void
    isReadyToJoinLobby: boolean
    setIsReadyToJoinLobby: (isReadyToJoinLobby: boolean) => void
    setTheme: (darkTheme: boolean) => void
    darkTheme: boolean
    language: string
    setLanguage: (language: string) => void
    translation: object
}

/*
Properties, which get passed to the JoinLobby Component
*/
export interface JoinLobbyProps {
    handleJoin: () => void
    lobbyCode: string
    setLobbyCode: (lobbyCode: string) => void
    translation
}

export interface UsernamePopupProps {
    toggleUsernamePopup: () => void
    usernamePopup: boolean
    handleGuestUsernameSubmit: (username: string) => void
    translation
}

export interface LobbyProps {
    authToken: string
    setUserLocation: (userLocation: UserLocation) => void
    username: string
    translation
}

export interface PublicLobbyProps {
    translation
    isReadyToJoinLobby: boolean
    setIsReadyToJoinLobby: (isReadyToJoinLobby: boolean) => void
    setUsername: (username: string) => void
    authToken: string
    setAuthToken: (authToken: string) => void
    setUserLocation: (userLocation: UserLocation) => void
}

export interface PublicLobbyTableProps {
    data: any
    translation
    setLobbyCode: (lobbyCode: string) => void
    handleJoin: () => void
}

export interface SidebarProps {
    page: React.ReactNode
    userLocation: UserLocation
    translation
}

export interface LobbyUpperBarProps {
    lobbyState: LobbyState
    authToken: string
    translation
}

export interface LobbyPlayerTilesProps {
    authToken: string
    lobbyState: LobbyState
    personalPlayerState: LobbyMemberState
    translation
}

export interface ReadyButtonProps {
    authToken: string
    lobbyState: LobbyState
    personalPlayerState: LobbyMemberState
    translation
}

export interface StartButtonProps {
    authToken: string
    lobbyState: LobbyState
    personalPlayerState: LobbyMemberState
    translation
}

export interface BotSelectorProps {
    authToken: string
    lobbyState: LobbyState
    personalPlayerState: LobbyMemberState
    translation
}

export interface LogoutProps {
    setAuthToken: (authToken: string) => void
    setUsername: (username: string) => void
    setUserRole: (userRole: UserRole) => void
    translation
}

export interface ChatroomProps {
    authToken: string
    translation
}

export interface AuthenticationProps {
    setAuthToken: (authToken: string) => void
    setUsername: (username: string) => void
    setUserRole: (userRole: UserRole) => void
    translation
}

export interface CardGameProps {
    authToken: string
    username: string
    setUserLocation: (userLocation: UserLocation) => void
    translation
}

export interface CardGameLayoutProps {
    authToken: string
    gameId: string
    username: string
    gameState: GameState
    hand: Card[]
    opponents: PlayerState[]
    getCard: (element: string) => Card
    translation
}

export interface DiscardDeckProps {
    username: string
    topCard: Card
    activePlayer: string
}

export interface DrawDeckProps {
    authToken: string
    gameId: string
    username: string
    activePlayer: string
}

export interface OtherPlayersHandProps {
    player: PlayerState
}

export interface PlayerProps {
    player: PlayerState
    alignment: string
    renderCards: string
    activePlayer: string
}

export interface SkipButtonProps {
    authToken: string
    gameId: string
    activePlayer: string
    username: string
    currentValidColor: string
    translation
}

export interface PersonalHandProps {
    authToken: string
    gameId: string
    hand: Card[]
    activePlayer: string
    username: string
    translation
}

export interface EndScreenProps {
    authToken: string
    setUserLocation: (userLocation: UserLocation) => void
    winner: string
    username: string
    translation
}
