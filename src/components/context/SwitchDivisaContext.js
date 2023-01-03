import React, { createContext, useState } from 'react'

export const SwitchDivisaContext = createContext(null);

const SwitchDivisaProvider = (props) => {

    const [switchDivisaContexto, setSwitchDivisaContexto] = useState(false);

    return (
        <SwitchDivisaContext.Provider value={{ switchDivisaContexto, setSwitchDivisaContexto }}>
            {props.children}
        </SwitchDivisaContext.Provider>
    )
}

export default SwitchDivisaProvider