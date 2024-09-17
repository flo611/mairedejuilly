import React from "react";
import {createRoot} from "react-dom/client";

import { Provider } from "./provider";

const Router = ()=>{
    const container=document.getElementById("root");
    const root= createRoot(container);
    root.render(
        <>
        <Provider router={Provider}/>
        </>
    );
};

export default Router;
