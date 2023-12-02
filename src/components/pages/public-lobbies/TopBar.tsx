import React from 'react'
import './publicLobbies.css'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

const TopBar = ({ translation }) => {
    /*
    renders the top bar on the leaderboard page
    */
    return (
        <div className="PublicLobbies">
            <Box sx={{ flexGrow: 1, paddingBottom: '2%' }}>
                <AppBar className="appBar" color="default" position="static">
                    <Toolbar>
                        <h1>{translation.publicLobbies}</h1>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
export default TopBar
