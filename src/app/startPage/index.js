import React from "react"
import { Button } from "semantic-ui-react"
import firebase from "firebase"
import { addUrlParameter, getNewId } from "../utils"
import { Page } from "../constants/page"

export default class StartPage extends React.Component {
  updateUrl = id => {
    if (!window.history.pushState) {
      alert("Your browser does not support this site")
      return false
    }
    addUrlParameter("room", id)
  }

  createVote = async () => {
    const id = await getNewId()
    console.log("id", id)
    this.props.changePage(Page.RoomPage)
    this.updateUrl(id)
    firebase
      .database()
      .ref("rooms/" + id)
      .set({
        question: "Question!",
        timeStamp: new Date().getTime()
      })
  }

  render() {
    global.asd = () => this.createVote()
    return (
      <Button size="massive" onClick={() => this.createVote()}>
        Create Vote!
      </Button>
    )
  }
}
