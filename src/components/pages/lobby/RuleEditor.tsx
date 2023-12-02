import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { GameType } from '../../../types/types'
import './lobby-styles/ruleEditor.css'

export default function RuleEditor({
    gameType,
    translation,
}: {
    gameType: GameType
    translation
}) {
    const MauMauRules = (
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

    const maexxleRules = (
        <List>
            <ListItem>
                <ListItemText
                    primary={translation.tooltipOneMaexxle}
                ></ListItemText>
            </ListItem>
        </List>
    )
    const schwimmenRules = (
        <List>
            <ListItem>
                <ListItemText
                    primary={translation.tooltipOneSchwimmen}
                ></ListItemText>
            </ListItem>
        </List>
    )

    const evaluateRules = () => {
        switch (gameType) {
            case GameType.MauMau:
                return MauMauRules
            case GameType.Maexxle:
                return maexxleRules
            case GameType.Schwimmen:
                return schwimmenRules
        }
    }
    return <div className="rules-wrapper">{evaluateRules()}</div>
}
