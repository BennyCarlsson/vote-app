import React from "react"
import firebase from "firebase"
import { getQueryParameter } from "../../utils/urlParser"
import {
  Segment,
  Dimmer,
  Loader,
  Image
} from "../../../../node_modules/semantic-ui-react"
import colors from "../../constants/colors"

export default class Result extends React.Component {
  state = {
    question: "",
    suggestions: undefined,
    voteMax: 0,
    loaded: false
  }
  componentDidMount() {
    firebase
      .database()
      .ref("rooms/" + getQueryParameter("room"))
      .once("value")
      .then(snapshot => {
        this.setValues(snapshot.val())
      })
  }

  setValues = data => {
    const question = data.question
    console.log(data)
    const suggestions = Object.values(data.suggestions).sort((a, b) => {
      return (
        (a.votes ? Object.keys(a.votes).length : 0) <
        (b.votes ? Object.keys(b.votes).length : 0)
      )
    })
    const voteMax = Object.keys(suggestions[0].votes).length
    this.setState({ question, suggestions, voteMax, loaded: true })
  }
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1>Result of voting on: "{this.state.question}"</h1>
        </div>
        <div style={styles.content}>
          {this.state.loaded ? (
            this.state.suggestions.map((suggestion, index) => {
              const numberOfVotes = suggestion.votes
                ? Object.keys(suggestion.votes).length
                : 0
              if (numberOfVotes === this.state.voteMax) {
                return (
                  <Segment
                    className="first-place"
                    size="massive"
                    key={index}
                    style={{ backgroundColor: colors.PRIMARY }}
                  >
                    <h2>
                      {suggestion.suggestion} {numberOfVotes}
                    </h2>
                  </Segment>
                )
              } else {
                return (
                  <Segment size="large" key={index} style={{ opacity: 0.5 }}>
                    <h4>
                      {suggestion.suggestion} {numberOfVotes}
                    </h4>
                  </Segment>
                )
              }
            })
          ) : (
            <Dimmer active>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: "column"
  },
  content: {
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%"
  }
}
