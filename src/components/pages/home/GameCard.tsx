import React from 'react'
import { GameCardProps } from '../../../types/props'
import { GameType } from '../../../types/types'
import CardGame from '../../../assets/Playing-Cards.svg'
import DiceGame from '../../../assets/Playing-Dice.svg'
import '../home/home-styles/gameCard.css'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'

/*
game card which is used to display the different games
 */
export default function GameCard({
    gameType,
    handleCreateLobby,
    translation,
}: GameCardProps) {
    /**
     * maps the game type to the corresponding image
     * @param gameType the game type
     */
    const mapGameTypeToImage = (gameType: GameType) => {
        if (gameType === GameType.MauMau) return CardGame
        if (gameType === GameType.Schwimmen) return CardGame
        if (gameType === GameType.Maexxle) return DiceGame
    }

    /**
     * handles the click on the create lobby button
     */
    const handleClickCreateLobby = () => {
        handleCreateLobby(gameType)
    }

    return (
        <Card className="gameCard" sx={{ width: '200px;' }}>
            <CardMedia
                className="game-image"
                image={mapGameTypeToImage(gameType)}
                title="gameImage"
            />
            <CardContent className="gameType-label">
                <Typography gutterBottom variant="h5" component="div">
                    {
                        Object.entries(GameType).find(
                            ([key, val]) => val === gameType
                        )?.[0]
                    }
                </Typography>
            </CardContent>
            <CardActions className="create-lobby-and-rules-wrapper">
                <Button
                    size="small"
                    className="create-lobby-button"
                    onClick={handleClickCreateLobby}
                >
                    {translation.createLobby}
                </Button>
            </CardActions>
        </Card>
    )
}
