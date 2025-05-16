'use client'
import React from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
    const [searchPage, setSearchPage] = React.useState(1)
    
    return (
        <UserContext.Provider value={{searchPage, setSearchPage}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider