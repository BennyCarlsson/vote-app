import React from "react"
import { Button, Input, Divider } from "semantic-ui-react"
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
      <div style={styles.container}>
        <div>
          <Button
            primary
            style={{ backgroundColor: "#4dd0e1" }}
            size="massive"
            onClick={() => this.createVote()}
          >
            Create Vote!
          </Button>
        </div>
        <div>
          <Divider horizontal>or join a vote</Divider>
        </div>
        <div>
          <Input
            focus
            size="massive"
            icon={{ name: "sign in", style: { color: "#f44336" } }}
            iconPosition="left"
            placeholder="Enter vote code.."
          />
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}
