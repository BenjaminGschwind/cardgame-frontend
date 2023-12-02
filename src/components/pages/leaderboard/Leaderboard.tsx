import React from 'react'
import './leaderboard.css'
import LeaderboardGlobalTable from './LeaderboardGlobalTable'
import LeaderboardPersonalTable from './LeaderboardPersonalTable'
import { getPersonalLeaderboard } from '../../../types/RestFunctions'
import { getGlobalLeaderboard } from '../../../types/RestFunctions'
import { useState, useEffect } from 'react'
import TopBarLeaderboard from './TopBarLeaderboard'
import { UserRole } from '../../../types/types'

export default function Leaderboard({ authToken, translation, userRole }) {
    const [globalLeaderboard, setGlobalLeaderboard] = useState([])
    const [personalLeaderboard, setPersonalLeaderboard] = useState([])
    /*
    functions get called by useEffect when page loads
    and make a get request and save the return in state
    */
    function getGlobalLeaderboardData() {
        getGlobalLeaderboard().then((data) =>
            setGlobalLeaderboard(data.leaderboard)
        )
    }
    function getPersonalLeaderboardData() {
        getPersonalLeaderboard(authToken).then((data) =>
            setPersonalLeaderboard(data)
        )
    }
    /*
    useEffect gets called when page loads
    */
    useEffect(() => {
        getGlobalLeaderboardData()
        if (userRole === UserRole.REGISTERED) {
            getPersonalLeaderboardData()
        }
    }, [])

    /* 
    only render personal Table when logged in
    */
    function renderPersonalTable() {
        if (userRole === UserRole.REGISTERED) {
            return (
                <div>
                    <h2>{translation.personalStats}</h2>
                    <LeaderboardPersonalTable
                        stats={personalLeaderboard}
                        translation={translation}
                    />
                </div>
            )
        }
    }
    /*
    renders global statistics Table if there are global statistics
    */
    function renderGlobalTable() {
        if (globalLeaderboard.length !== 0) {
            return (
                <div>
                    <h2>{translation.globalStats}</h2>
                    <LeaderboardGlobalTable
                        stats={globalLeaderboard}
                        translation={translation}
                    />
                </div>
            )
        } else {
            return <h2>{translation.noGlobalStats}</h2>
        }
    }

    return (
        <div>
            <TopBarLeaderboard translation={translation} />
            {renderGlobalTable()}
            {renderPersonalTable()}
        </div>
    )
}
