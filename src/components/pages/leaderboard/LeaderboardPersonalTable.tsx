import React from 'react'
import './leaderboard.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function LeaderboardPersonalTable({ stats, translation }) {
    /*
    renders the personal leaderboard table
    */
    return (
        <TableContainer
            component={Paper}
            sx={{ width: '69%', margin: 'auto', maxHeight: 600 }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width={'20%'}>{translation.username}</TableCell>
                        <TableCell>{translation.gamesPlayed}</TableCell>
                        <TableCell>MauMau {translation.wins}</TableCell>
                        <TableCell>Schwimmen {translation.wins}</TableCell>
                        <TableCell>Mäxxle {translation.wins}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{stats.username}</TableCell>
                        <TableCell>{stats.gamesPlayed}</TableCell>
                        <TableCell>{stats.mauMauWins}</TableCell>
                        <TableCell>{stats.schwimmenWins}</TableCell>
                        <TableCell>{stats.maexxleWins}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
