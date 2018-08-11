import React, { Component, Fragment } from "react"
import { Button } from "semantic-ui-react"
import firebase from "firebase"
import { config } from "../superSecretFile"
import "../App.css"
import { getQueryParameter, addUrlParameter } from "./utils/urlParser"

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      roomId: undefined
    }
  }
  componentDidMount() {
    firebase.initializeApp(config)
    const roomId = getQueryParameter("room")
    if (roomId) {
      this.setState({ roomId: roomId })
    }
  }
  createVote = async () => {
    await this.setState({ roomId: 123 })
    this.updateUrl()
    firebase
      .database()
      .ref("rooms/" + this.state.roomId)
      .set({
        question: "Vad ska vi äta idag?",
        timeStamp: new Date().getTime()
      })
  }

  updateUrl = () => {
    if (!window.history.pushState) {
      alert("Your browser does not support this site")
      return false
    }
    addUrlParameter("room", "123")
  }

  render() {
    return (
      <div className="App">
        {this.state.roomId ? (
          <h3>{this.state.roomId}</h3>
        ) : (
          <Fragment>
            <Button size="massive" onClick={() => this.createVote()}>
              Create Vote!
            </Button>
          </Fragment>
        )}
      </div>
    )
  }
}

export default App
