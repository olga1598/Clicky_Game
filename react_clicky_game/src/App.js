import React, { Component } from 'react';
import fishes from "./fishes.json";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import AllFishes from "./components/AllFishes";
import Footer from "./components/Footer";

import './App.css';


class App extends Component {
  state = { 
    fishes,
    message: "",
    score: 0,
    topScore: 0,
    wasClicked: []
  };

  //After clicking on image - uptate states
  update = (id) => {
    
    let fishes = [...this.state.fishes];
    const thisIndex = this.state.fishes.findIndex(character => character.id === id);
    console.log(thisIndex);

    let isClicked = fishes[thisIndex].clicked;
    console.log("First click " + isClicked);

    // if guessed correctly, score will increase and messages will update
    if (!isClicked) {
      fishes[thisIndex].clicked = true;
      console.log( fishes[thisIndex].clicked );
      console.log( fishes[thisIndex].id );

      let newScore = this.state.score + 1;

      // if max score achieved, update message
      if (newScore === fishes.length) {
        this.setState({ 
          message: "You've reached the maximum score and you are the winner!"
        })
      }
      else {
        this.setState({ 
          message: "Correct!"
        })
      }
      //setting up new scores
      this.setState({ score: newScore, topScore: Math.max(newScore, this.state.topScore) })
    }
    // else reset score and update message
    else {
      this.setState({ 
        score: 0,
        message: "Sorry, you've lost, play again."
      })
      fishes.map(character => {
        character.clicked = false;
        return character;
      });
    }
    this.setState({ fishes: fishes });
    return fishes;
  }

  //Shuffle the images after each click
  shuffleArray = (array) => {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};

  //When click on image
  handleCharacterClick = id => {
    console.log("Clicked");
    this.update(id);
    this.setState({
      fishes: this.shuffleArray(this.state.fishes)
    })
  }

  //Shuffle the images all the time the page loads up
  //Display the first message in NavBar
  componentDidMount = () => {
    this.setState({ 
      fishes: this.shuffleArray(this.state.fishes),
      message: "Click each fish image only once"
    })
  }

  render() { 
    return (     
      
      <div className="container-fluid">
          <NavBar message={this.state.message} score={this.state.score} topScore={this.state.topScore} />
          <div className="row row-center">
            <Header />
          </div>
          <main className="container">
            <div className="row row-center character-row">
              {this.state.fishes.map(fish => (
                <AllFishes 
                id={fish.id} key={fish.id} 
                handleCharacterClick={this.handleCharacterClick}
                name={fish.name} image={fish.image} />
              ))}
            </div>
          </main>
          <Footer />
      </div>  
       
    );
  }
}

 
export default App;
