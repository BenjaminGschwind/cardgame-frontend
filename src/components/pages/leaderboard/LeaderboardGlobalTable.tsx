import React from 'react'
import './leaderboard.css'
import { useState, useEffect } from 'react'
import { Sort } from '@mui/icons-material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function LeaderboardGlobalTable({ stats, translation }) {
    /*
     saves to data to be displayed in the table
    */
    const [globalStats, setStats] = useState(stats)
    /*
    saves by which value should be sorted by. Default is MauMau
    */
    const [sortField, setSortField] = React.useState('mauMauWins')
    /*
    get called whenever the value to be sorted by changes
    */
    useEffect(() => {
        sortLeaderboard()
    }, [sortField])

    /*
    sorts the leaderboard data by the selected value
    */
    const sortLeaderboard = () => {
        const sortedLeaderboard = [...globalStats].sort(function (a, b) {
            return b[sortField] - a[sortField]
        })
        setStats(sortedLeaderboard)
    }

    /*
    displays which value the table is sorted by in its header
    */
    const game = (game) => {
        switch (game) {
            case 'gamesPlayed':
                return translation.gamesplayed
            case 'mauMauWins':
                return 'MauMau ' + translation.wins
            case 'schwimmenWins':
                return 'Schwimmen ' + translation.wins
            case 'maexxleWins':
                return 'Mäxxle ' + translation.wins
            default:
                return 'best player'
        }
    }
    /*
    renders the global leaderboard table
    */
    return (
        <TableContainer
            component={Paper}
            sx={{ width: '89%', margin: 'auto', maxHeight: 600 }}
        >
            <Table
                sx={{ minWidth: 890 }}
                stickyHeader
                aria-label="sticky table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell width={'17%'}>
                            {translation.orderedBy} {game(sortField)}
                        </TableCell>
                        <TableCell width={'17%'}>
                            {translation.username}
                        </TableCell>
                        <TableCell
                            className="hovern"
                            onClick={() => {
                                setSortField('gamesPlayed')
                            }}
                        >
                            <Sort fontSize="inherit" />
                            {translation.gamesPlayed}
                        </TableCell>
                        <TableCell
                            className="hovern"
                            onClick={() => {
                                setSortField('mauMauWins')
                            }}
                        >
                            <Sort fontSize="inherit" />
                            MauMau {translation.wins}
                        </TableCell>
                        <TableCell
                            className="hovern"
                            onClick={() => {
                                setSortField('schwimmenWins')
                            }}
                        >
                            <Sort fontSize="inherit" />
                            Schwimmen {translation.wins}
                        </TableCell>
                        <TableCell
                            className="hovern"
                            onClick={() => {
                                setSortField('maexxleWins')
                            }}
                        >
                            <Sort fontSize="inherit" />
                            Mäxxle {translation.wins}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {globalStats.map((val, key) => (
                        <TableRow key={key}>
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>{val.username}</TableCell>
                            <TableCell>{val.gamesPlayed}</TableCell>
                            <TableCell>{val.mauMauWins}</TableCell>
                            <TableCell>{val.schwimmenWins}</TableCell>
                            <TableCell>{val.maexxleWins}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
