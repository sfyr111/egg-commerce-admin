/**
 * create by yangran on 2018/3/6
 */

import React from 'react'
import qs from 'qs'
import { connect } from 'react-redux'
import { getCategories, updataCategorie, setCurrentCategories } from '../../redux/categories.redux'

import { Table, Input, Card, Button, message } from 'antd';

import './categories-list.styl'

@connect(
  state => state,
  { getCategories, updataCategorie, setCurrentCategories }
)
class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'UUID',
      dataIndex: 'id',
      width: '25%',
    }, {
      title: '名称',
      dataIndex: 'name',
      width: '50%',
      render: (text, record) => this.renderEditableCell(text, record, 'name'),
    }, {
      title: '状态',
      dataIndex: 'status',
      width: '10%',
      render: (text, record) => this.renderDropdownCell(text, record, 'status'),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable
                ? <span>
                    <a onClick={() => this.save(record.id)}>保存</a>
                    <a onClick={() => this.cancel(record.id)}>取消</a>
                  </span>
                : <span>
                    <a onClick={() => this.edit(record.id)}>编辑</a>
                    {record.parentId !== '0'
                      ? <a onClick={() => props.history.push(`/product/list?categoryId=${record.id}`)}>商品列表</a>
                      : <a onClick={() => props.setCurrentCategories(record) && props.history.push(`/categories/list?parentId=${record.id}`)}>查看子分类</a>}
                    <a onClick={() => message.error('权限不足')}>删除</a>
                  </span>
            }
          </div>
        );
      },
    }];
    this.cacheData = props.categories.list.map(item => ({ ...item }));
  }

  renderEditableCell(text, record, column) {
    return (
      <div>
        {record.editable
          ? <Input style={{ margin: '-5px 0' }} value={text} onChange={e => this.handleChange(e.target.value, record.id, column)} />
          : text
        }
      </div>
    )
  }
  renderDropdownCell(text, record, column) {
    // 可增加功能
    text === 1 ? text = '正常' : '废弃'
    return (
      <div>
        {record.editable
          ? text
          : text}
      </div>
    )
  }
  handleChange(value, id, column) {
    const newData = [...this.state.data]
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(id) {
    const newData = [...this.props.categories.list]
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item })) // 缓存数据
    }
  }
  save(id) {
    const newData = [...this.state.data];
    const target = newData.filter(item => id === item.id)[0];
    const preTarget = this.cacheData.filter(item => id === item.id)[0];
    if (target) {
      if (target.name !== preTarget.name) this.props.updataCategorie(id, target.name)
      delete target.editable;
      this.setState({ data: newData })
      this.cacheData = []
    }
  }
  cancel(id) {
    const newData = [...this.state.data];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  componentDidMount() {
    this.feachCategoriesList(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) this.feachCategoriesList(nextProps)
  }

  feachCategoriesList = props => {
    const { parentId } = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    this.props.getCategories(parentId ? parentId : 0)
  }

  render() {
    const { parentId } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    return (
      <div id="categories-list">
        <Card title={parentId ? `一级分类 UUID: ${parentId}` : `一级分类`}>
          <Table bordered rowKey={record => record.id} dataSource={this.props.categories.list} columns={this.columns} />
        </Card>
      </div>
    )
  }
}


export default CategoriesList