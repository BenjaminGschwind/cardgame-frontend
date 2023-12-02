import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import './home-styles/languageDropdown.css'

/*
Dropdown to select the language of the website.
 */
export default function LanguageDropdown({ language, setLanguage }) {
    /**
     * Handles the change of the language.
     * @param event The event that triggered the change.
     */
    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string)
    }

    return (
        <FormControl variant={'filled'} className="language-dropdown">
            <Select value={language} label="Language" onChange={handleChange}>
                <MenuItem value={'English'}>English</MenuItem>
                <MenuItem value={'Deutsch'}>Deutsch</MenuItem>
                <MenuItem value={'Francais'}>Francais</MenuItem>
                <MenuItem value={'Espanol'}>Espanol</MenuItem>
                <MenuItem value={'日本'}>日本</MenuItem>
            </Select>
        </FormControl>
    )
}
