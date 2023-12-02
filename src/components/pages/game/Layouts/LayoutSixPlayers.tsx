import React from 'react'
import '../cardgame.css'
import Player from '../Player'
import DrawDeck from '../DrawDeck'
import DiscardDeck from '../DiscardDeck'
import PersonalHand from '../PersonalHand'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SkipButton from '../SkipButton'
import Chatroom from '../../chat/Chatroom'
import { CardGameLayoutProps } from '../../../../types/props'
import RuleTooltip from '../RuleTooltip'

export default function LayoutSixPlayers({
    authToken,
    gameId,
    username,
    gameState,
    hand,
    opponents,
    getCard,
    translation,
}: CardGameLayoutProps) {
    return (
        <Box>
            <Grid
                container
                minHeight="100vh"
                direction="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={12} container>
                    <Grid item xs={4}>
                        <Player
                            activePlayer={gameState.activePlayer}
                            player={opponents[3]}
                            alignment={'center'}
                            renderCards={'right'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Player
                            activePlayer={gameState.activePlayer}
                            player={opponents[2]}
                            alignment={'center'}
                            renderCards={'right'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Player
                            activePlayer={gameState.activePlayer}
                            player={opponents[1]}
                            alignment={'center'}
                            renderCards={'right'}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={6} container>
                        <Grid item xs={6}>
                            <Player
                                activePlayer={gameState.activePlayer}
                                player={opponents[4]}
                                alignment={'flex-start'}
                                renderCards={'right'}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ paddingRight: 0.2 }}>
                            <DrawDeck
                                authToken={authToken}
                                gameId={gameId}
                                username={username}
                                activePlayer={gameState.activePlayer}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6} container>
                        <Grid item xs={6} container>
                            <Grid item xs={6} sx={{ paddingLeft: 0.2 }}>
                                <DiscardDeck
                                    username={username}
                                    activePlayer={gameState.activePlayer}
                                    topCard={getCard(
                                        gameState.topCardDiscardDeck
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SkipButton
                                    authToken={authToken}
                                    gameId={gameId}
                                    username={username}
                                    activePlayer={gameState.activePlayer}
                                    currentValidColor={
                                        gameState.currentValidColor
                                    }
                                    translation={translation}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Player
                                activePlayer={gameState.activePlayer}
                                player={opponents[0]}
                                alignment={'flex-end'}
                                renderCards={'left'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    <Grid
                        item
                        container
                        xs={4}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                    >
                        <Grid item paddingRight={0.5} paddingBottom={0.5}>
                            <RuleTooltip translation={translation} />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={4}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-end"
                    >
                        <Grid item>
                            <PersonalHand
                                authToken={authToken}
                                gameId={gameId}
                                username={username}
                                activePlayer={gameState.activePlayer}
                                hand={hand}
                                translation={translation}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={4}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Grid
                            item
                            paddingRight={0.5}
                            paddingBottom={0.5}
                            sx={{ height: '15rem' }}
                        >
                            <Chatroom
                                authToken={authToken}
                                translation={translation}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
