import React, { createContext,useState,useContext } from "react";

const CityCOntext = createContext();

export const CityProvider = ({ children }) => {
    return(
        <CityCOntext.Provider value = {{city,setCity}}>
            {children}
        </CityCOntext.Provider>
    )
}

export const useCity = () => useContext(CityCOntext)