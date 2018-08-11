import React from "react"
import firebase from "firebase"
import { Input, Form, Button } from "semantic-ui-react"
import { getQueryParameter } from "../../utils/urlParser"

export default class AddSuggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newQuestion: "",
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
    this.state.roomRef.push(this.state.newQuestion)
    this.setState({ newQuestion: "" })
  }

  render() {
    return (
      <div>
        <Form onSubmit={() => this.onAddingSuggestion()}>
          <Form.Field>
            <input
              placeholder="Add new suggestion"
              onChange={e => this.setState({ newQuestion: e.target.value })}
              value={this.state.newQuestion}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}
