import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    Tooltip,
} from '@mui/material'
import { QuestionMark } from '@mui/icons-material'
import React from 'react'

/*
The Tooltip component provides a tooltip for the maumau rules in game
*/
export default function RuleTooltip({ translation }) {
    const rules = (
        <List>
            <ListItem>
                <ListItemText primary={translation.tooltipOne}></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText primary={translation.tooltipTwo}></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText primary={translation.tooltipThree}></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText primary={translation.tooltipFour}></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText primary={translation.tooltipFive}></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText primary={translation.tooltipSix}></ListItemText>
            </ListItem>
        </List>
    )

    return (
        <Tooltip title={rules} placement="top-end">
            <IconButton>
                <QuestionMark
                    sx={{ color: 'white' }}
                    fontSize="large"
                ></QuestionMark>
            </IconButton>
        </Tooltip>
    )
}
