import React from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../redux/categories.redux'
import { Card } from 'antd';

@connect(
  state => state,
  { getCategories }
)
class CategoriesList extends React.Component {

  componentDidMount() {
    this.props.getCategories(this.props.match.params.id)
  }

  render() {

    return (
      <div id="categories-list">
        <Card>

        </Card>
      </div>
    )
  }
}

export default CategoriesList