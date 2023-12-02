import React from 'react'
import './cardgame.css'
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import { SkipButtonProps } from '../../../types/props'
import { publishMauMauInteraction } from '../../../types/GameWebsocketFunctions'
import { MauMauCommands } from '../../../types/types'
import CLUBS from '../../../assets/cardSuits/club.png'
import DIAMONDS from '../../../assets/cardSuits/diamond.png'
import HEARTS from '../../../assets/cardSuits/heart.png'
import SPADES from '../../../assets/cardSuits/spade.png'

/*
The SkipButton component provides the ability to end the turn. Indicates the current valid color.
*/
export default function SkipButton({
    authToken,
    gameId,
    username,
    activePlayer,
    currentValidColor,
    translation,
}: SkipButtonProps) {
    /*
    publishes a pass request if it is the users turn by calling the publishMauMauInteraction function.
    */
    function skip() {
        if (activePlayer === username) {
            publishMauMauInteraction(authToken, gameId, MauMauCommands.PASS)
        }
    }

    /*
    function that evaluates the image of the current Suit based on the currentValidColor.
    */
    function evaluateSuit() {
        if (currentValidColor === 'CLUBS') return CLUBS
        if (currentValidColor === 'DIAMONDS') return DIAMONDS
        if (currentValidColor === 'HEARTS') return HEARTS
        if (currentValidColor === 'SPADES') return SPADES
    }

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-evenly"
            direction="column"
            minHeight={155}
        >
            <Grid item>
                <img
                    src={evaluateSuit()}
                    width="42"
                    height="42"
                    alt={'suitToPlay'}
                ></img>
            </Grid>
            {activePlayer === username && (
                <Grid item>
                    <Button onClick={() => skip()} variant="contained">
                        {translation.endTurn}
                    </Button>
                </Grid>
            )}
        </Grid>
    )
}
