import React, { useState } from 'react'
import './cardgame.css'
import Grid from '@mui/material/Grid'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Heart from '../../../assets/cardSuits/heart.png'
import Club from '../../../assets/cardSuits/club.png'
import Spade from '../../../assets/cardSuits/spade.png'
import Diamond from '../../../assets/cardSuits/diamond.png'
import { PersonalHandProps } from '../../../types/props'
import { mapCardToImage } from './CardGame'
import {
    Card,
    CardSuit,
    ChooseSuit,
    MauMauCommands,
} from '../../../types/types'
import { publishMauMauInteraction } from '../../../types/GameWebsocketFunctions'

/**
 * The PersonalHand component renders the hand cards of the users and provides the functionality to play them.
 */

export default function PersonalHand({
    authToken,
    gameId,
    hand,
    activePlayer,
    username,
    translation,
}: PersonalHandProps) {
    //state of the choose card suit popup when playing a jack
    const [chooseSuit, setChooseSuit] = useState<ChooseSuit>({
        dialogOpen: false,
        card: null,
    })
    // opens the popup when playing a jack
    const handleOpen = (card: Card) => {
        setChooseSuit({ dialogOpen: true, card: card })
    }
    // closes the popup
    const handleClose = () => {
        setChooseSuit({ dialogOpen: false, card: null })
    }
    /**
     * Function that opens the chooseSuit dialog if the provided card is a jack,
     * else publishes a discard request by calling the publishMauMauInteraction function.
     * @param card the card that the user wants to play
     */
    function discard(card: Card) {
        if (activePlayer === username) {
            if (card.value === 'J') {
                handleOpen(card)
            } else {
                publishMauMauInteraction(
                    authToken,
                    gameId,
                    MauMauCommands.DISCARD,
                    card
                )
            }
        }
    }

    /**
     * Function that publishes a play request by calling the publishMauMauInteraction function.
     * @param card card that the user wants to play.
     * @param cardSuit the cardSuit the user wishes.
     */
    function play(card: Card, cardSuit: CardSuit) {
        publishMauMauInteraction(
            authToken,
            gameId,
            MauMauCommands.PLAY,
            card,
            cardSuit
        )
    }
    if (!hand) return <div>{translation.loading}</div>
    // renders the cards which are on a players hand as well as the popup when playing a jack

    return (
        <div>
            <Grid
                container
                minHeight={155}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {hand.map((card, index) => (
                    <Grid
                        item
                        sx={{ margin: -3 }}
                        key={card.suit + card.value + index}
                    >
                        <img
                            className="card"
                            onClick={() => discard(card)}
                            onDragEnd={() => discard(card)}
                            width={100}
                            src={mapCardToImage(card)}
                            alt={'PersonalCard'}
                        />
                    </Grid>
                ))}
            </Grid>

            <Dialog open={chooseSuit.dialogOpen} onClose={handleClose}>
                <DialogTitle>{translation.chooseCardSuit}</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        minHeight={80}
                        minWidth={280}
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={3}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    onClick={() => {
                                        play(chooseSuit.card, CardSuit.HEARTS)
                                        handleClose()
                                    }}
                                    className="cardSuit-chooser"
                                    src={Heart}
                                    alt={'Heart'}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    onClick={() => {
                                        play(chooseSuit.card, CardSuit.CLUBS)
                                        handleClose()
                                    }}
                                    className="cardSuit-chooser"
                                    src={Club}
                                    alt={'Club'}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    onClick={() => {
                                        play(chooseSuit.card, CardSuit.DIAMONDS)
                                        handleClose()
                                    }}
                                    className="cardSuit-chooser"
                                    src={Diamond}
                                    alt={'Diamond'}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    onClick={() => {
                                        play(chooseSuit.card, CardSuit.SPADES)
                                        handleClose()
                                    }}
                                    className="cardSuit-chooser"
                                    src={Spade}
                                    alt={'Spade'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}
