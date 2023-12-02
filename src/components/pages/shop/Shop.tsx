import React from 'react'
import './shop.css'

/*
R.I.P. to the shop page. It was a good page, but it had to go.
 */
export default function Shop({ translation }) {
    return (
        <div>
            <h1>{translation.shopPage}</h1>
            <h2>{translation.comingSoon}</h2>
        </div>
    )
}
