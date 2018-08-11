import React, { Component, Fragment } from "react"
import StartPage from "./startPage"
import RoomPage from "./roomPage"
import firebase from "firebase"
import { config } from "../superSecretFile"
import "../App.css"
import { getQueryParameter } from "./utils/urlParser"
import { Page } from "./constants/page"

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      page: Page.StartPage
    }
  }

  changePage = page => {
    console.log("asd", page)
    this.setState({ page: page })
  }

  componentDidMount() {
    firebase.initializeApp(config)
    const roomId = getQueryParameter("room")
    if (roomId) {
      this.setState({ page: Page.RoomPage })
    }
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
