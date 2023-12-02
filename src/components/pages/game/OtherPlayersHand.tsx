import React from 'react'
import './cardgame.css'
import Grid from '@mui/material/Grid'
import { OtherPlayersHandProps } from '../../../types/props'

/**
 * The OtherPlayersHand component displays the amount of cards the opponents still have on their hand.
 */
export default function OtherPlayersHand({ player }: OtherPlayersHandProps) {
    /*
     creates an array the size of the number of cards the player has,
     then maps over this array and displays one upside down card for each array entry
    */
    function loopCards() {
        const arr = [...Array(player.cardCount).keys()]
        return arr.map((card) => (
            <Grid item sx={{ margin: -4.4 }} key={card}>
                <img
                    width={80}
                    src={require('../../../assets/playing-cards/Back.svg')}
                    alt={'BackOfCard'}
                />
            </Grid>
        ))
    }
    return (
        <Grid
            container
            minHeight={180}
            alignItems="center"
            justifyContent="center"
            direction="row"
        >
            {loopCards()}
        </Grid>
    )
}
