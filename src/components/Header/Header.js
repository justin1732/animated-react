import React from "react"
import "./Header.css"

class Header extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSearch(this.props.search)
    }
    render() {
        return(
            <div className="header">
                <h1>Anime Search</h1>
                <h2>Search for and Save Interesting Anime!</h2>
                <form>
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Let's goooo" value={this.props.search} onChange={this.props.updateInput}></input>
                        <button className="btn input-group-append" onClick={this.handleSubmit}>Search</button>
                    </div>
                </form>          
            </div>
        )
    }
}

export default Header