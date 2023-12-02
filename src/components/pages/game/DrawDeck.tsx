import React from 'react'
import './cardgame.css'
import Back from '../../../assets/playing-cards/Back.svg'
import Grid from '@mui/material/Grid'
import { DrawDeckProps } from '../../../types/props'
import { publishMauMauInteraction } from '../../../types/GameWebsocketFunctions'
import { MauMauCommands } from '../../../types/types'

/**
 * The DrawDeck provides the ability to draw a new card.
 */
export default function DrawDeck({
    authToken,
    gameId,
    username,
    activePlayer,
}: DrawDeckProps) {
    /**
     * function that publishes a draw card request if it is the users turn.
     */
    function drawCard() {
        if (activePlayer === username) {
            publishMauMauInteraction(
                authToken,
                gameId,
                MauMauCommands.DRAW_FROM_PILE
            )
        }
    }
    return (
        <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
            minHeight={157}
        >
            <Grid item minWidth={104}>
                <img
                    onClick={() => drawCard()}
                    className="draw-deck"
                    width={100}
                    src={Back}
                    alt={'draw deck'}
                />
            </Grid>
        </Grid>
    )
}
