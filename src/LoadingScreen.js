import React from "react";
import logo from './icons/loading.svg';

export const QueryInProgress = () => (
    <div className="loading-logo">
        <div>Searching on database for books...</div>
        <img src={logo}/>
    </div>
)

export const UpdateInProgress = () => (
    <div className="loading-logo">
        <div>Update in progress...</div>
        <img src={logo}/>
    </div>
)