import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Transfer } from 'antd'

export default class TransferUI extends Component {
  state = {
    dataSource: [], // 完整列表
    targetKeys: [] // 右侧框中的列表key集合
  }

  componentDidMount() {
    this.initData()
  }

  getData = (params) => {
    const { dataSource, targetKeys } = this.state
    return { dataSource, targetKeys }
  }
  initData = () => {
    console.log('initData', this.props)
    const { dataSource, targetKeys } = this.props
    this.setState({ dataSource, targetKeys })
  }

  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1

  handleChange = (targetKeys) => {
    console.log('targetKeys', targetKeys)
    this.setState({ targetKeys })
  }

  handleSearch = (dir, value) => {
    console.log('search:', dir, value)
  }

  render() {
    let { listStyle } = this.props
    listStyle = {
      width: 300,
      height: 300,
      ...listStyle
    }
    return (
      <Transfer
        showSearch
        listStyle={listStyle}
        dataSource={this.state.dataSource}
        targetKeys={this.state.targetKeys}
        filterOption={this.filterOption}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        titles={['未分配权限', '已分配权限']}
        render={(item) => item.title}
      />
    )
  }
}

TransferUI.propTypes = {
  listStyle: PropTypes.object,
  dataSource: PropTypes.array.isRequired,
  targetKeys: PropTypes.array.isRequired
}
