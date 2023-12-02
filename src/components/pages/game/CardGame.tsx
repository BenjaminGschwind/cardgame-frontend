import React from 'react'
import './cardgame.css'
import { useState } from 'react'
import LayoutFourPlayers from './Layouts/LayoutFourPlayers'
import LayoutTwoPlayers from './Layouts/LayoutTwoPlayers'
import LayoutThreePlayers from './Layouts/LayoutThreePlayers'
import LayoutFivePlayers from './Layouts/LayoutFivePlayers'
import LayoutSixPlayers from './Layouts/LayoutSixPlayers'
import LayoutSevenPlayers from './Layouts/LayoutSevenPlayers'
import LayoutEightPlayers from './Layouts/LayoutEightPlayers'
import { useGameState } from '../../../types/hooks/useGameState'
import { CardGameProps } from '../../../types/props'
import {
    Card,
    CardSuit,
    CardValue,
    InteractionResponse,
    PlayerState,
} from '../../../types/types'
import SEVEN_C from '../../../assets/playing-cards/7C.svg'
import SEVEN_D from '../../../assets/playing-cards/7D.svg'
import SEVEN_S from '../../../assets/playing-cards/7S.svg'
import SEVEN_H from '../../../assets/playing-cards/7H.svg'
import EIGHT_C from '../../../assets/playing-cards/8C.svg'
import EIGHT_D from '../../../assets/playing-cards/8D.svg'
import EIGHT_S from '../../../assets/playing-cards/8S.svg'
import EIGHT_H from '../../../assets/playing-cards/8H.svg'
import NINE_C from '../../../assets/playing-cards/9C.svg'
import NINE_D from '../../../assets/playing-cards/9D.svg'
import NINE_S from '../../../assets/playing-cards/9S.svg'
import NINE_H from '../../../assets/playing-cards/9H.svg'
import TEN_C from '../../../assets/playing-cards/10C.svg'
import TEN_D from '../../../assets/playing-cards/10D.svg'
import TEN_S from '../../../assets/playing-cards/10S.svg'
import TEN_H from '../../../assets/playing-cards/10H.svg'
import JACK_C from '../../../assets/playing-cards/JC.svg'
import JACK_D from '../../../assets/playing-cards/JD.svg'
import JACK_S from '../../../assets/playing-cards/JS.svg'
import JACK_H from '../../../assets/playing-cards/JH.svg'
import QUEEN_C from '../../../assets/playing-cards/QC.svg'
import QUEEN_D from '../../../assets/playing-cards/QD.svg'
import QUEEN_S from '../../../assets/playing-cards/QS.svg'
import QUEEN_H from '../../../assets/playing-cards/QH.svg'
import KING_C from '../../../assets/playing-cards/KC.svg'
import KING_D from '../../../assets/playing-cards/KD.svg'
import KING_S from '../../../assets/playing-cards/KS.svg'
import KING_H from '../../../assets/playing-cards/KH.svg'
import ACE_C from '../../../assets/playing-cards/AC.svg'
import ACE_D from '../../../assets/playing-cards/AD.svg'
import ACE_S from '../../../assets/playing-cards/AS.svg'
import ACE_H from '../../../assets/playing-cards/AH.svg'
import EndScreen from './EndScreen'

/*
The CardGame component consists of the Layout,
DiscardDeck, DrawDeck, OtherPlayersHand, PersonalHand, RuleTooltip and SkipButton components.
It represents a card game
*/
export default function CardGame({
    authToken,
    username,
    setUserLocation,
    translation,
}: CardGameProps) {
    const personalChannelURL = 'http://localhost:8080/game/personal/channel'
    const personalGameStateURL = 'http://localhost:8080/game/personal/state'

    /**
     * handCards state keeps the current hand cards of the user
     */
    const [handCards, setHandCards] = useState<Card[]>()

    /**
     * The Function parses a string representation of a card into a card object.
     * @param element string representation of a card.
     * @returns the card object
     */
    const getCard = (element: string) => {
        let cardAttributes = element.split(':')
        let card: Card = {
            suit: Object.values(CardSuit).find(
                (item) => item === cardAttributes[0]
            ),
            value: Object.values(CardValue).find(
                (item) => item === cardAttributes[1]
            ),
        }
        return card
    }
    /**
     * The function receives the hand string from the backend and parses it to a Card object array
     * @param handString
     */
    const parseHand = (handString: string) => {
        let hand = handString.split(';')
        let cards: Card[] = hand.map((element) => getCard(element))

        setHandCards(cards)
    }

    /**
     * Function that gets called when the user receives a personal interaction response from the backend.
     * @param interactionResponse the interaction response.
     */
    const handleInteractionResult = (
        interactionResponse: InteractionResponse
    ) => {
        if (
            interactionResponse.status === 'CREATED' &&
            interactionResponse.statusCode === 201
        ) {
            parseHand(interactionResponse.response)
        }
    }

    /**
     * the useGameState hook.
     */
    const [gameState, gameID] = useGameState(
        personalGameStateURL,
        personalChannelURL,
        authToken,
        handleInteractionResult
    )

    if (!gameState && !gameID && !handCards) return <div>loading...</div>

    /**
     * Function that returns the user index in the players array
     * @returns the index of yourself in the players array
     */
    function getOwnIndex() {
        for (let i = 0; i < gameState.players.length; i++) {
            if (gameState.players[i].username === username) {
                return i
            }
        }
    }

    /**
     * create array of your opponents only and in correct order so opponents are
     * displayed on the screen in the order they turn
     * @returns Array of PlayerStates containing only opponents.
     */
    function getOpponentsOnly() {
        let opponents: PlayerState[] = []
        let ownIndex = getOwnIndex()
        for (let i = ownIndex + 1; i < gameState.players.length; i++) {
            opponents.push(gameState.players[i])
        }
        for (let i = 0; i < ownIndex; i++) {
            opponents.push(gameState.players[i])
        }
        return opponents
    }

    /**
     * Returns the endScreen when the game is finished
     */
    if (gameState.gameFinished)
        return (
            <div className="endScreen-wrapper">
                <EndScreen
                    authToken={authToken}
                    setUserLocation={setUserLocation}
                    winner={gameState.activePlayer}
                    username={username}
                    translation={translation}
                />
            </div>
        )

    /**
     * Returns the gameLayout based on the number of players in the game.
     * @param numberPlayers amount of players participating in the game.
     * @returns the game layout.
     */
    const whichLayout = (numberPlayers: number) => {
        switch (numberPlayers) {
            case 2:
                return (
                    <LayoutTwoPlayers
                        authToken={authToken}
                        gameId={gameID}
                        username={username}
                        opponents={getOpponentsOnly()}
                        gameState={gameState}
                        hand={handCards}
                        getCard={getCard}
                        translation={translation}
                    />
                )
            case 3:
                return (
                    <LayoutThreePlayers
                        authToken={authToken}
                        gameId={gameID}
                        username={username}
                        opponents={getOpponentsOnly()}
                        gameState={gameState}
                        hand={handCards}
                        getCard={getCard}
                        translation={translation}
                    />
                )
            case 4:
                return (
                    <LayoutFourPlayers
                        authToken={authToken}
                        gameId={gameID}
                        username={username}
                        opponents={getOpponentsOnly()}
                        gameState={gameState}
                        hand={handCards}
                        getCard={getCard}
                        translation={translation}
                    />
                )
            case 5:
                return (
                    <LayoutFivePlayers
                        authToken={authToken}
                        gameId={gameID}
                        username={username}
                        opponents={getOpponentsOnly()}
                        gameState={gameState}
                        hand={handCards}
                        getCard={getCard}
                        translation={translation}
                    />
                )
            case 6:
                return (
                    <LayoutSixPlayers
                        authToken={authToken}
                        gameId={gameID}
                        username={username}
                        opponents={getOpponentsOnly()}
                        gameState={gameState}
                        hand={handCards}
                        getCard={getCard}
                        translation={translation}
                    />
                )
            case 7:
                return (
                    <LayoutSevenPlayers
                        authToken={authToken}
                        gameId={gameID}
                        username={username}
                        opponents={getOpponentsOnly()}
                        gameState={gameState}
                        hand={handCards}
                        getCard={getCard}
                        translation={translation}
                    />
                )
            case 8:
                return (
                    <LayoutEightPlayers
                        authToken={authToken}
                        gameId={gameID}
                        username={username}
                        opponents={getOpponentsOnly()}
                        gameState={gameState}
                        hand={handCards}
                        getCard={getCard}
                        translation={translation}
                    />
                )
            default:
                return 'illegal number of players'
        }
    }

    return (
        <div className="layout-wrapper">
            {whichLayout(gameState.players.length)}
        </div>
    )
}

/**
 * maps a card object to a card image.
 * @param card the card object.
 * @returns the image.
 */
export function mapCardToImage(card: Card) {
    if (card.value === '7' && card.suit === 'H') return SEVEN_H
    if (card.value === '7' && card.suit === 'D') return SEVEN_D
    if (card.value === '7' && card.suit === 'S') return SEVEN_S
    if (card.value === '7' && card.suit === 'C') return SEVEN_C
    if (card.value === '8' && card.suit === 'H') return EIGHT_H
    if (card.value === '8' && card.suit === 'D') return EIGHT_D
    if (card.value === '8' && card.suit === 'S') return EIGHT_S
    if (card.value === '8' && card.suit === 'C') return EIGHT_C
    if (card.value === '9' && card.suit === 'H') return NINE_H
    if (card.value === '9' && card.suit === 'D') return NINE_D
    if (card.value === '9' && card.suit === 'S') return NINE_S
    if (card.value === '9' && card.suit === 'C') return NINE_C
    if (card.value === '10' && card.suit === 'H') return TEN_H
    if (card.value === '10' && card.suit === 'D') return TEN_D
    if (card.value === '10' && card.suit === 'S') return TEN_S
    if (card.value === '10' && card.suit === 'C') return TEN_C
    if (card.value === 'J' && card.suit === 'H') return JACK_H
    if (card.value === 'J' && card.suit === 'D') return JACK_D
    if (card.value === 'J' && card.suit === 'S') return JACK_S
    if (card.value === 'J' && card.suit === 'C') return JACK_C
    if (card.value === 'Q' && card.suit === 'H') return QUEEN_H
    if (card.value === 'Q' && card.suit === 'D') return QUEEN_D
    if (card.value === 'Q' && card.suit === 'S') return QUEEN_S
    if (card.value === 'Q' && card.suit === 'C') return QUEEN_C
    if (card.value === 'K' && card.suit === 'H') return KING_H
    if (card.value === 'K' && card.suit === 'D') return KING_D
    if (card.value === 'K' && card.suit === 'S') return KING_S
    if (card.value === 'K' && card.suit === 'C') return KING_C
    if (card.value === 'A' && card.suit === 'H') return ACE_H
    if (card.value === 'A' && card.suit === 'D') return ACE_D
    if (card.value === 'A' && card.suit === 'S') return ACE_S
    if (card.value === 'A' && card.suit === 'C') return ACE_C
}
