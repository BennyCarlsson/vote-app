import React from 'react'
import firebase from 'firebase'
import { getQueryParameter } from '../../utils/urlParser'
import Suggestion from './Suggestion'
import { List } from 'semantic-ui-react'

export default class SuggestionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomRef: undefined,
      suggestions: []
    }
  }

  componentDidMount() {
    this.initDatabaseSocket()
  }

  initDatabaseSocket = () => {
    const ref = firebase.database().ref('rooms/' + getQueryParameter('room'))
    this.setState({ roomRef: ref })

    ref.on('value', snapshot => {
      const value = snapshot.val()
      if (value) {
        this.setState({ suggestions: value.suggestions })
      }
    })
  }

  render() {
    return (
      <List>
        {this.state.suggestions ? (
          Object.keys(this.state.suggestions).map((suggestionKey, index) => (
            <Suggestion
              text={this.state.suggestions[suggestionKey].suggestion}
              suggestionId={suggestionKey}
              votes={this.state.suggestions[suggestionKey].votes || {}}
              key={index}
            />
          ))
        ) : (
          <div />
        )}
      </List>
    )
  }
}
