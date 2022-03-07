import React, { Component } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (

            <nav className="navbar fixed-top">
                <span className="navbar-brand mb-0 h1">📖 Anime Search</span>
                <div>
                    <Link to="/">Search</Link>
                    <Link to="/saved">Saved</Link>
                </div>
            </nav>

        )
    }
};

export default Navbar;