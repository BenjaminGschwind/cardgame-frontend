import React from 'react'
import './cardgame.css'
import { Avatar, Card, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import OtherPlayersHand from './OtherPlayersHand'
import { PlayerProps } from '../../../types/props'
import DefaultPic from '../../../assets/player-profile-pics/0.jpg'
import Pic1 from '../../../assets/player-profile-pics/1.jpg'

/*
The Player component renders the PlayerTiles for the corresponding player and the hand-cards of the player.
*/
export default function Player({
    player,
    alignment,
    renderCards,
    activePlayer,
}: PlayerProps) {
    /**
     * The function maps the players imageId to a profile-picture
     * @returns the profile picture
     */
    const mapImageIdToImage = () => {
        if (player.imageId === 0) return DefaultPic
        if (player.imageId === 1) return Pic1
    }
    /**
     * function that indicates which player has the turn.
     */
    function playersTurn() {
        if (activePlayer === player.username) {
            return 'lightgreen'
        } else {
            return ''
        }
    }

    const playerTilesList = (
        <Card
            sx={{
                maxWidth: 140,
                maxHeight: 169,
                margin: 1,
                backgroundColor: playersTurn(),
            }}
        >
            <Avatar
                sx={{
                    height: 100,
                    width: 100,
                    ml: 'auto',
                    mr: 'auto',
                    mt: 1,
                }}
                alt="PlayerImg"
                src={mapImageIdToImage()}
            />
            <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {player.username.length > 8
                        ? player.username.substring(0, 8) + '..'
                        : player.username}
                </Typography>
            </CardContent>
        </Card>
    )
    /*
     when the player is displayed on the left of screen the cards which the player is holding should
     be displayed to the right
    */
    function renderCardsRight() {
        if (renderCards === 'right') {
            return (
                <Grid item sx={{ paddingLeft: 4 }}>
                    <OtherPlayersHand player={player} />
                </Grid>
            )
        }
    }
    /*
     when the player is displayed on the right of screen the cards which the player is holding should
     be displayed to the left
    */
    function renderCardsLeft() {
        if (renderCards === 'left') {
            return (
                <Grid item sx={{ paddingRight: 4 }}>
                    <OtherPlayersHand player={player} />
                </Grid>
            )
        }
    }
    return (
        // renders the player and conditional rendering of their cards
        <Grid container justifyContent={alignment} alignItems="center">
            {renderCardsLeft()}
            <Grid item>
                <div className="player-tiles">
                    <div className="first-row">{playerTilesList}</div>
                </div>
            </Grid>
            {renderCardsRight()}
        </Grid>
    )
}
