"use strict";

import {router} from "./main.js";

export function AuthGuard(){
    const user = sessionStorage.getItem("user");
    const protectedRoutes = ["", "/", "/home", "/about", "/contact", "/events", "/gallery", "/home", "/login", "/opportunities", "/privacypolicy", "/termsofservice"];
    console.log("In authguard");
    console.log(location.hash.slice(1));
    if(!user && protectedRoutes.includes(location.hash.slice(1))){
        console.log("[AUTHGUARD] Unauthorized access detected. Redirecting to login page");
        router.navigate("/login");
        //location.hash = '';
        return;
    }}