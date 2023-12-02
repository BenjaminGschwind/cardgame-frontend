import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { Box, Divider } from '@mui/material'
import CardITLogo from '../../assets/logo/CardIT_Logo_Darkmode.png'
import SidebarItem from './SidebarItem'
import {
    FormatListBulleted,
    Games,
    Groups,
    Home,
    Leaderboard,
    LocalGroceryStore,
    Settings,
} from '@mui/icons-material'
import { SidebarLink, UserLocation } from '../../types/types'
import { SidebarProps } from '../../types/props'

/*
The sidebar component.
 */
export default function Sidebar({
    page,
    userLocation,
    translation,
}: SidebarProps) {
    /**
     * The links that are displayed in the sidebar.
     */
    const sidebarItems: SidebarLink[] = [
        {
            name: translation.home,
            icon: Home,
            path: '/',
        },
        {
            name: translation.publicLobbies,
            icon: FormatListBulleted,
            path: '/public-lobbies',
        },
        {
            name: translation.shop,
            icon: LocalGroceryStore,
            path: '/shop',
        },
        {
            name: translation.leaderboard,
            icon: Leaderboard,
            path: '/leaderboard',
        },
        {
            name: translation.settings,
            icon: Settings,
            path: '/settings',
        },
    ]

    /**
     * The links that are displayed in the sidebar if the user is in a lobby or game.
     */
    const securedSidebarItems: SidebarLink[] = [
        {
            name: translation.lobby,
            icon: Groups,
            path: '/lobby',
        },
        {
            name: translation.game,
            icon: Games,
            path: '/game',
        },
    ]
    let securedItem: JSX.Element = null
    if (userLocation != UserLocation.HOME) {
        if (userLocation === UserLocation.LOBBY) {
            securedItem = (
                <SidebarItem
                    key={securedSidebarItems[0].name}
                    name={securedSidebarItems[0].name}
                    icon={securedSidebarItems[0].icon}
                    path={securedSidebarItems[0].path}
                />
            )
        } else if (userLocation === UserLocation.GAME) {
            securedItem = (
                <SidebarItem
                    key={securedSidebarItems[1].name}
                    name={securedSidebarItems[1].name}
                    icon={securedSidebarItems[1].icon}
                    path={securedSidebarItems[1].path}
                />
            )
        }
    }
    return (
        <div>
            <div className={'sidebar'}>
                <Link to={'/'}>
                    <img
                        className={'logo'}
                        src={CardITLogo}
                        alt={'CardIT Logo'}
                    />
                </Link>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {sidebarItems.map((item) => {
                        return (
                            <SidebarItem
                                key={item.name + item.path}
                                name={item.name}
                                icon={item.icon}
                                path={item.path}
                            />
                        )
                    })}
                    {securedItem}
                </Box>
            </div>
            <div className={'content'}>{page}</div>
        </div>
    )
}
