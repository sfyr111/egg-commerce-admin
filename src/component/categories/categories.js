/**
 * create by yangran on 2018/3/1
 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCategories, setCurrentCategories } from '../../redux/categories.redux'
import { Card, Col, Row } from 'antd'

@withRouter
@connect(
  state => state,
  { getCategories, setCurrentCategories: setCurrentCategories }
)
class Categories extends React.Component {

  componentDidMount() {
    this.props.getCategories(0)
  }

  pushCategoriesList = (item) => {
    this.props.setCurrentCategories(item)
    this.props.history.push(`/categories/${item.id}`)
    console.log(item)
  }

  render() {
    const { categories } = this.props
    return (
      <div id="categories">
        <div style={{ background: '#f0f2f5', padding: '' }}>
          <Row gutter={16}>
            {categories.list.length > 0
              ? categories.list.map(item => (
                <Col span={8} key={item.id}>
                  <div onClick={() => this.pushCategoriesList(item)}>
                    <Card title={item.name} bordered={true} hoverable={true}>状态: {item.status === 1 ? '正常' : '关闭'}</Card>
                  </div>
                </Col>))
              : null}
          </Row>
        </div>
      </div>
    )
  }
}

export default Categories