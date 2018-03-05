import React from 'react'

class CategoriesList extends React.Component {

  render() {
    console.log(this.props.match.params.id)
    return 'CategoriesList'
  }
}

export default CategoriesList