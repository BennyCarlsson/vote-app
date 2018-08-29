import React from "react"
import firebase from "firebase"
import { Button } from "semantic-ui-react"
import { addUrlParameter, getNewId } from "../../utils"
import { Page } from "../../constants/page"
import { LASTING_MINUTES } from "../../constants/configs"

export default class CreateVoteButton extends React.Component {
  updateUrl = id => {
    if (!window.history.pushState) {
      alert("Your browser does not support this site")
      return false
    }
    addUrlParameter("room", id)
  }

  createVote = async () => {
    const id = await getNewId()
    this.updateUrl(id)
    firebase
      .database()
      .ref("rooms/" + id)
      .set({
        question: "",
        expires: new Date().getTime() + 60000 * LASTING_MINUTES
      })
    this.props.changePage(Page.RoomPage)
  }

  render() {
    return (
      <Button
        primary
        style={{ backgroundColor: "#4dd0e1" }}
        size="massive"
        onClick={() => this.createVote()}
      >
        Create a voting room!
      </Button>
    )
  }
}
