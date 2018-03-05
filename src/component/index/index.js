/**
 * create by yangran on 2018/3/1
 */

import React from 'react'
import { connect } from 'react-redux'
import { Card, Col, Row } from 'antd';
import { getCount} from '../../redux/statistics.redux'

@connect(
  state => state.statistics,
  { getCount }
)
class Index extends React.Component {

  componentDidMount() {
    this.props.getCount()
  }

  render() {
    const { userCount, orderCount, productCount } = this.props
    return (
      <div id="index">
        <div style={{ background: '#f0f2f5', padding: '' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="用户总数" bordered={true} hoverable={true}>{userCount}</Card>
            </Col>
            <Col span={8}>
              <Card title="商品总数" bordered={true} hoverable={true}>{productCount}</Card>
            </Col>
            <Col span={8}>
              <Card title="订单总数" bordered={true} hoverable={true}>{orderCount}</Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Index