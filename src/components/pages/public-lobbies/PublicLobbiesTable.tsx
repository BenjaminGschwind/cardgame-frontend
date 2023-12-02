import React from 'react'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { PublicLobbyTableProps } from '../../../types/props'

export default function StickyHeadTable({
    data,
    translation,
    setLobbyCode,
    handleJoin,
}: PublicLobbyTableProps) {
    /**
     * Method for handling the click on the join-lobby-button
     */
    const handleLobbyJoin = () => {
        handleJoin()
    }

    const table = () => {
        if (data.length === 0) {
            return <h2>{translation.noPublicLobbies}</h2>
        } else {
            return (
                <TableContainer
                    component={Paper}
                    sx={{ maxHeight: 600, margin: 'auto', width: '50%' }}
                >
                    <Table
                        sx={{ minWidth: 400 }}
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell width={'30%'}>
                                    {translation.game}
                                </TableCell>
                                <TableCell>
                                    {translation.numberPlayers}
                                </TableCell>
                                <TableCell>{translation.join}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((val, key) => {
                                setLobbyCode(val.lobbyCode)
                                return (
                                    <TableRow key={key}>
                                        <TableCell>
                                            {val.gameType === 'MAU_MAU'
                                                ? 'MauMau'
                                                : val.gameType}
                                        </TableCell>
                                        <TableCell>
                                            {val.amountPlayers}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                onClick={handleLobbyJoin}
                                            >
                                                {translation.join}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }

    return <div>{table()}</div>
}
