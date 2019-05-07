import React, { Component } from "react";
import "./style.css";

class Character extends Component {

    render() {
        return (
            <div className="card">
                <button id={this.props.id} className="fish-button" onClick={() => this.props.handleCharacterClick(this.props.id)}>
                    <div className="img-container">
                        <img alt={this.props.name} src={this.props.image} />
                    </div>
                </button>
            </div>
        )
    }
}

export default Character;