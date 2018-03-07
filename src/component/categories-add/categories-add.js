/**
 * create by yangran on 2018/3/6
 */
import React from 'react'
import { connect } from 'react-redux'
import { getCategories, setCurrentCategories, addCategorie } from '../../redux/categories.redux'
import { Card, Menu, Dropdown, Button, Icon, message, Input } from 'antd'

import './categories-add.styl'

@connect(
  state => state,
  { getCategories, setCurrentCategories, addCategorie }
)
class CategoriesAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.props.getCategories()
  }

  handleMenClick = ({ key }) => {
    const current = key === '0' ? { id: 0, name: '一级分类' } : this.props.categories.list.find(item => item.id === key)
    this.props.setCurrentCategories(current)
  }

  handleButtonClick = () => {
    const name = this.state.name.trim()
    const { current } = this.props.categories
    this.props.addCategorie(current.id, name)
    this.clean()
  }

  clean = () => {
    this.setState({
      name: ''
    })
    this.props.setCurrentCategories({ parentId: 0 })
  }

  handleInputChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  menu = (list) => {
    const menuList = [...list, { id: 0, name: '一级分类' }]
    return (
      <Menu onClick={this.handleMenClick}>
        {menuList.map(item => <Menu.Item key={item.id}>{item.name}</Menu.Item>)}
      </Menu>
    )
  }



  render() {
    const { current, list } = this.props.categories
    return (
      <div id="categories-add">
        <Card title='添加分类'>
          <Card bordered={false}>
            选择分类
            <Dropdown overlay={this.menu(list)}>
              <Button style={{ marginLeft: 8 }}>
                {current.name ? current.name : '选择一级分类'}
                <Icon type="down" />
              </Button>
            </Dropdown>
          </Card>
          <Card bordered={false}>
            分类名称
            <Input value={this.state.name} style={{ width: 200, marginLeft: 8 }} onChange={this.handleInputChange} placeholder="分类名称" />
          </Card>
          <Card bordered={false}>
            <section style={{ width: 200, marginLeft: 8, paddingLeft: 52 }}>
              <Button type="primary" onClick={this.handleButtonClick}>添加</Button>
            </section>
          </Card>
        </Card>
      </div>
    )
  }
}

export default CategoriesAdd