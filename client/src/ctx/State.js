import {useState, createContext} from 'react'

export const StateCtx = createContext()

export const StateProvider = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [search, setSearch] = useState("")

    return (
    <StateCtx.Provider value={{
        showSidebar,
        setShowSidebar,
        search,
        setSearch
    }}>
        {children}
    </StateCtx.Provider>
    )
}