import React from 'react'
import './pageNotFound.css'

/*
The 404 page that is displayed when the user tries to access a page that does not exist.
 */
export default function PageNotFound({ translation }) {
    return (
        <div className={'root'}>
            <div className={'label'}>404</div>
            <h1 className={'title'}>{translation.secretPlace}</h1>
            <h2 className={'description'}>{translation.description}</h2>
        </div>
    )
}
