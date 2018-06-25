import React, { Component } from 'react'
import styled from 'styled-components'

import colors from '../../colors'
import SearchInput from './SearchInput'

import Select from '../Select/Select'

const DisconnectButton = styled(
  ({ onClick, className, profile }) =>
    <button className={className} onClick={onClick}>
      Disconnect {profile} profile
    </button>
)`
  display: inline-block;
  background: transparent;
  border: none;
  text-decoration: underline;
  padding: 0;
`

class SearchBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: this.getSelectedOptionFromProps(props),
      options: this.getOptionsFromProps(props)
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      selectedOption: this.getSelectedOptionFromProps(props),
      options: this.getOptionsFromProps(props)
    })
  }

  getSelectedOptionFromProps(props) {
    return props.profile && props.profile.ref ? 'relevance' : 'recent'
  }

  getOptionsFromProps(props) {
    return (
      props.profile && props.profile.ref
        ? [{ key: 'relevance', value: 'Best match' }]
        : []
    ).concat([
      { key: 'recentlyPosted',  value: 'Recently posted' },
    ]).concat(
      props.hasPosition
        ? [{ key: 'distance', value: 'Distance' }]
        : []
    ).concat([
      { key: 'startDate',       value: 'Start date' },
      { key: 'duration',        value: 'Duration' },
    ])
  }

  onSelect(selected) {
    this.setState({ selectedOption: selected, selectExpanded: false })
    this.props.setOrderByOption(selected)
  }

  clearProfile() {
    this.props.clearProfile()
  }

  render() {
    const { className, search, onSearch, profile } = this.props

    return (
      <div className={[className].join(' ')}>
      <div className="container">
        <SearchInput value={search} onChange={onSearch} />

        <Select onSelect={this.onSelect.bind(this)} prefix="<strong>Sort: </strong>" options={this.state.options} />

        {
          this.state.selectedOption === 'relevance' &&
            <p className="pull-left" style={{ fontSize: '12px', color: 'white', fontWeight: 200, marginTop: '-6px' }}>
              The results are ordered to match with your {profile.ref} profile. <DisconnectButton profile={profile.ref} onClick={this.clearProfile.bind(this)} />
            </p>
        }
      </div>
    </div>
    )
  }
}

const StyledSearchBox = styled(SearchBox)`
  background: ${colors.primary};
  color: white;
  padding-top: 1em;
  margin-bottom: 1.5em;
  font-weight: 200;
`

export default StyledSearchBox
