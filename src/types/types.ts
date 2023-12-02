export enum GameType {
    MauMau = 'MAU_MAU',
    Schwimmen = 'SCHWIMMEN',
    Maexxle = 'MAEXXLE',
}

export enum Difficulty {
    Hard = 'HARD',
    Medium = 'MEDIUM',
    Easy = 'EASY',
}

export enum UserLocation {
    HOME = 'HOME',
    LOBBY = 'LOBBY',
    GAME = 'GAME',
}

export enum UserRole {
    GUEST = 'GUEST',
    REGISTERED = 'REGISTERED',
}

export enum Visibility {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export enum LobbyIntention {
    JOIN = 'JOIN',
    CREATE = 'CREATE',
}

export interface SidebarLink {
    name: string
    icon: any
    path: string
}

export interface FormInput {
    username: string
    password: string
}

export interface LobbyMemberState {
    username: string
    imageId: number
    readyCheck: boolean
    rank: string
}

export interface Rule {
    rule: string
}

export interface LobbyState {
    gameType: GameType
    playerList: LobbyMemberState[]
    lobbyCode: string
    visibility: Visibility
    amountBots: number
    amountPlayers: number
    afkTimer: number
    rules: Rule[]
    difficulty: Difficulty
    botList: LobbyMemberState[]
}

export interface ChatMessage {
    username: string
    timestamp: string
    content: string
}

export interface PlayerState {
    username: string
    imageId: number
    cardCount: number
}

export interface GameState {
    players: PlayerState[]
    activePlayer: string
    currentValidColor: string
    gameFinished: boolean
    roundCounter: number
    amountDrawDeck: number
    amountDiscardDeck: number
    topCardDiscardDeck: string
    gameId: string
    currentValidValue: string
}

export enum CardSuit {
    CLUBS = 'C',
    DIAMONDS = 'D',
    HEARTS = 'H',
    SPADES = 'S',
}

export enum CardValue {
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    TEN = '10',
    JACK = 'J',
    QUEEN = 'Q',
    KING = 'K',
    ACE = 'A',
}

export interface Card {
    suit: CardSuit
    value: CardValue
}

export enum MauMauCommands {
    DRAW_FROM_PILE = 'drawFromDrawpile',
    DISCARD = 'discard',
    PLAY = 'play',
    GET_HAND = 'getHand',
    PASS = 'pass',
}

export interface GameStateResponse {
    gameStateString: string
}

export interface InteractionResponse {
    statusCode: number
    response: string
    status: string
}

export interface ChooseSuit {
    dialogOpen: boolean
    card: Card
}
