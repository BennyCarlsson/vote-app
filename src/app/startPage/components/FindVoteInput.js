import React from "react"
import firebase from "firebase"
import { Input, Form } from "semantic-ui-react"
import { addUrlParameter } from "../../utils"
import { Page } from "../../constants/page"

export default class FindVoteInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { input: "" }
  }

  // Todo duplicate in CreateVoteButton
  updateUrl = id => {
    if (!window.history.pushState) {
      alert("Your browser does not support this site")
      return false
    }
    addUrlParameter("room", id)
  }

  findRoom = async () => {
    console.log("finding room")
    const roomId = this.state.input
    // Todo roomids is case sensitive
    // Todo duplicate in ../utils extract it to a function there
    await firebase
      .database()
      .ref("rooms/" + roomId)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          this.updateUrl(roomId)
          this.props.changePage(Page.RoomPage)
        } else {
          console.log("room id doesn't exist")
        }
      })
  }

  render() {
    return (
      <Form onSubmit={() => this.findRoom()}>
        <Input
          onChange={e => this.setState({ input: e.target.value })}
          focus
          size="massive"
          icon={{ name: "sign in", style: { color: "#f44336" } }}
          iconPosition="left"
          placeholder="Enter vote code.."
          value={this.state.input}
        />
      </Form>
    )
  }
}
