import { createContext, ReactNode, useCallback, useState } from "react";


interface IgraphOrListContext {
    state: boolean;
    handleState: () => void;
}

export const graphOrListContext = createContext({} as IgraphOrListContext);

interface IGraphOrListProviderProps {
    children: ReactNode
}


export const GraphOrListProvider: React.FC<IGraphOrListProviderProps> = ({ children }) => {
    const [state, setState] = useState(false);

    const handleState = ()=> setState(!state);

    return (
        <graphOrListContext.Provider
            value={
                {
                    state,
                    handleState
                }
            }>
            {children}
        </graphOrListContext.Provider>
    )

};