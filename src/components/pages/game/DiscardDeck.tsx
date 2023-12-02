import React from 'react'
import './cardgame.css'
import Grid from '@mui/material/Grid'
import { DiscardDeckProps } from '../../../types/props'
import { mapCardToImage } from './CardGame'

/**
 * The DiscardDeck shows the top card on the discard deck.
 * It will be marked with a green border if it is the users turn.
 */
export default function DiscardDeck({
    username,
    topCard,
    activePlayer,
}: DiscardDeckProps) {
    /**
     * indicates that it is your turn
     */
    function playersTurn() {
        if (activePlayer === username) {
            return 'yourTurn'
        }
    }

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            direction="row"
            minHeight={157}
        >
            <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                direction="row"
                minHeight={157}
                width={104}
            >
                <Grid item>
                    <img
                        className={playersTurn()}
                        width={100}
                        src={mapCardToImage(topCard)}
                        alt={'topCard'}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
