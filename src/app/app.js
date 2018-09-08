import React, { Component, Fragment } from "react"
import StartPage from "./startPage"
import RoomPage from "./roomPage"
import firebase from "firebase"
import { config } from "../superSecretFile"
import "../App.css"
import { getQueryParameter } from "./utils"
import { Page } from "./constants/page"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: Page.StartPage
    }
  }

  changePage = page => {
    this.setState({ page: page })
  }

  componentDidMount() {
    firebase.initializeApp(config)
    this.login()
    const roomId = getQueryParameter("room")
    if (roomId) {
      this.setState({ page: Page.RoomPage })
    }
  }

  login() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // ...
      })
  }

  render() {
    return (
      <div className="App">
        {this.state.page === Page.RoomPage ? (
          <RoomPage />
        ) : (
          <Fragment>
            <StartPage changePage={this.changePage} />
          </Fragment>
        )}
      </div>
    )
  }
}

export default App
