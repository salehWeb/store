import React, { createContext, useContext, useReducer } from 'react'

export const context = createContext()
export const StateProvider = ({ reducer, initalState, children }) => {
    return (
        <context.Provider value={useReducer(reducer, initalState)}>
            {children}
        </context.Provider>
    )
}

export const useStateVaule = () => useContext(context)