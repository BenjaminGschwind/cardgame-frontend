import React from 'react'
import { Navigate } from 'react-router-dom'

/*
The ProtectedRoute component is a wrapper for any page that should only be accessible
to users who fulfill a certain condition.
For example, the shop page should only be accessible to users who are logged in.
The condition is passed in as a boolean value, and if the condition is not met,
 the user is redirected to the home page.
 */
export default function ProtectedRoute({
    page,
    claim,
}: {
    page: JSX.Element
    claim: boolean
}): JSX.Element {
    return claim ? page : <Navigate to="/" replace />
}
