import {
    Avatar,
    Card,
    CardContent,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import React from 'react'
import './lobby-styles/playerTiles.css'
import DefaultPic from '../../../assets/player-profile-pics/0.jpg'
import { LobbyPlayerTilesProps } from '../../../types/props'
import { LobbyMemberState } from '../../../types/types'
import {
    CheckCircleOutline,
    RadioButtonUnchecked,
    Star,
    PersonRemove,
    StarHalf,
} from '@mui/icons-material'
import {
    publishKickPlayer,
    publishPromotePlayer,
} from '../../../types/LobbyWebsocketFunctions'

/*
The PlayerTiles component returns a list of tiles containing the members and bots.
A couple of information for the tiles gets calculated, for example if the member is lobby host or ready.
*/
export default function PlayerTiles({
    authToken,
    lobbyState,
    personalPlayerState,
    translation,
}: LobbyPlayerTilesProps) {
    /**
     * Calculates the readystate of a lobby member based on the lobbyMemberState received from the lobbyState.
     * @param player the LobbyMemberState of the particular lobby member.
     * @returns An Icon that indicates if the player is ready or not.
     */
    const calculateReadyCheck = (player: LobbyMemberState) => {
        return player.readyCheck ? (
            <CheckCircleOutline sx={{ color: 'green' }} />
        ) : (
            <RadioButtonUnchecked sx={{ color: 'red' }} />
        )
    }

    /**
     * Calculates the Rank of the lobby member.
     * @param player the LobbyMemberState of the particular lobby member.
     * @returns a star icon if host else null
     */
    const calculatePlayerRank = (player: LobbyMemberState) => {
        return player.rank === 'HOST' ? <Star sx={{ color: 'gold' }} /> : null
    }

    /**
     * function that gets called when the user tries to promote a player.
     * @param player the player that should be promoted
     */
    const handlePromotePlayer = (player: LobbyMemberState) => {
        publishPromotePlayer(lobbyState.lobbyCode, authToken, player.username)
    }

    /**
     * Calculates the promote icon
     * @param player the player that should be promoted
     */
    const calculatePlayerPromotion = (player: LobbyMemberState) => {
        return personalPlayerState.rank === 'HOST' && player.rank !== 'HOST' ? (
            <Tooltip title={translation.promotion} arrow>
                <IconButton
                    aria-label="promote"
                    sx={{ color: 'gold' }}
                    onClick={() => handlePromotePlayer(player)}
                    size="small"
                >
                    <StarHalf fontSize="inherit" />
                </IconButton>
            </Tooltip>
        ) : null
    }

    /**
     * function that gets called when the user tries to kick a player. Calls the corresponding websocket function.
     * @param player the LobbyMemberState of the particular lobby member that should be kicked.
     */
    const handleKickPlayer = (player: LobbyMemberState) => {
        publishKickPlayer(lobbyState.lobbyCode, authToken, player.username)
    }

    /**
     * Calculates the kick icon
     * @param player he LobbyMemberState of the particular lobby member.
     * @returns PersonRemoveIcon if the player is not host else null
     */
    const calculatePlayerKick = (player: LobbyMemberState) => {
        return personalPlayerState.rank === 'HOST' && player.rank !== 'HOST' ? (
            <Tooltip title={translation.kick} arrow>
                <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleKickPlayer(player)}
                    size="small"
                >
                    <PersonRemove fontSize="inherit" />
                </IconButton>
            </Tooltip>
        ) : null
    }

    /**
     * maps the lobbyMembers to tiles
     */
    const playerTilesList = lobbyState.playerList.map((player, index) => (
        <Grid item xs={3} key={index}>
            <Card className={'playerCard'}>
                <Avatar
                    sx={{
                        height: 100,
                        width: 100,
                        ml: 'auto',
                        mr: 'auto',
                        mt: 1,
                    }}
                    alt="PlayerImg"
                    src={DefaultPic}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        className={'playerCard-Name'}
                    >
                        {player.username.length > 6
                            ? player.username.substring(0, 6) + '..'
                            : player.username}
                    </Typography>
                    <div className={'playerCard-infos'}>
                        {calculateReadyCheck(player)}
                        {calculatePlayerRank(player)}
                        {calculatePlayerPromotion(player)}
                        {calculatePlayerKick(player)}
                    </div>
                </CardContent>
            </Card>
        </Grid>
    ))

    /**
     * maps the botMembers to tiles
     */
    let botTilesList = lobbyState.botList.map((bot, index) => (
        <Grid item xs={3} key={index}>
            <Card className={'playerCard'}>
                <Avatar
                    sx={{
                        height: 100,
                        width: 100,
                        ml: 'auto',
                        mr: 'auto',
                        mt: 1,
                    }}
                    alt="PlayerImg"
                    src={DefaultPic}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        className={'playerCard-Name'}
                    >
                        {bot.username.length > 6
                            ? bot.username.substring(0, 6) + '..'
                            : bot.username}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    ))

    botTilesList = botTilesList.reverse()

    return (
        <>
            <Grid container spacing={2}>
                {playerTilesList}
                {botTilesList}
            </Grid>
        </>
    )
}
