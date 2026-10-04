import React from "react";
import logo from "../assets/logo.jpeg";

function Logo({ width = "100px" }) {
    return (
        <img
            src={logo}
            alt="MyBlog Logo"
            style={{ width: width }}
            className="object-contain"
        />
    );
}

export default Logo;