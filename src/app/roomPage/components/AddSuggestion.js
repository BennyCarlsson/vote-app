import React from "react"
import firebase from "firebase"
import { Input, Form, Button } from "semantic-ui-react"
import { getQueryParameter } from "../../utils/urlParser"

export default class AddSuggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newSuggestion: "",
      roomRef: undefined
    }
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref("rooms/" + getQueryParameter("room") + "/suggestions")
    this.setState({ roomRef: ref })
  }

  onAddingSuggestion() {
    if (this.state.newSuggestion) {
      this.state.roomRef.push({
        suggestion: this.state.newSuggestion,
        votes: 0
      })
    }
    this.setState({ newSuggestion: "" })
  }

  render() {
    return (
      <div>
        <Form onSubmit={() => this.onAddingSuggestion()}>
          <Form.Field>
            <input
              placeholder="Add new suggestion"
              onChange={e => this.setState({ newSuggestion: e.target.value })}
              value={this.state.newSuggestion}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}
