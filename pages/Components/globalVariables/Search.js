import { createContext, useState } from "react";


const SearchContext  = createContext("")
export function SearchContextProvider({children}){
    const [search, setSearch] = useState(null)

    return (
        <SearchContext.Provider value = {{search ,setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}
export default SearchContext;