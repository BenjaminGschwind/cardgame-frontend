import React from 'react'
import { Box, Button, ListItem } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { SidebarLink } from '../../types/types'

/*
The SidebarItem component is used to render a single item in the sidebar.
 */
export default function SidebarItem(props: SidebarLink) {
    const active: boolean = useLocation().pathname === props.path

    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2,
            }}
        >
            <Link to={props.path} className={'sidebarLink'}>
                <Button
                    className={'sidebarButton'}
                    startIcon={<props.icon />}
                    disableRipple
                    sx={{
                        backgroundColor: active && 'rgba(255,255,255, 0.08)',
                        borderRadius: 2,
                        fontFamily: 'Roboto',
                        textTransform: 'none',
                        fontSize: 16,
                        color: active ? '#39A189' : '#D1D5DB',
                        fontWeight: active && 'fontWeightBold',
                        height: 45,
                        px: 3,
                        '& .MuiButton-startIcon': {
                            color: active ? '#39A189' : '#D1D5DB',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255, 0.08)',
                        },
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{props.name}</Box>
                </Button>
            </Link>
        </ListItem>
    )
}
