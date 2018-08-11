import React from "react"
import { Button } from "semantic-ui-react"
import firebase from "firebase"
import { addUrlParameter } from "../utils/urlParser"
import { Page } from "../constants/page"

export default class StartPage extends React.Component {
  updateUrl = id => {
    if (!window.history.pushState) {
      alert("Your browser does not support this site")
      return false
    }
    addUrlParameter("room", id)
  }

  createVote = id => {
    this.props.changePage(Page.RoomPage)
    this.updateUrl(123)
    firebase
      .database()
      .ref("rooms/" + id)
      .set({
        question: "Vad ska vi äta idag?",
        timeStamp: new Date().getTime()
      })
  }

  render() {
    return (
      <Button size="massive" onClick={() => this.createVote(123)}>
        Create Vote!
      </Button>
    )
  }
}
