import React, { Component } from "react"
import { Button } from "semantic-ui-react"
import firebase from "firebase"
import { config } from "../superSecretFile"
import "../App.css"

class App extends Component {
  componentDidMount() {
    firebase.initializeApp(config)
  }
  createVote = () => {
    firebase
      .database()
      .ref("users/")
      .set({
        username: "toffe",
        email: "busToffe@example.com"
      })
  }

  render() {
    return (
      <div className="App">
        <Button size="massive" onClick={() => this.createVote()}>
          Create Vote!
        </Button>
      </div>
    )
  }
}

export default App
