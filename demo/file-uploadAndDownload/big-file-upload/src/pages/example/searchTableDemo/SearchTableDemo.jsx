import React, { Component, createRef } from 'react'
import SearchTableUI from '@/components/searchTableUI/SearchTableUI'
import { columns, searchFormList } from './data/searchTableDemo'
import { getTableAPI, getSearchAPI, getListAPI } from '@/store/modules/demo/demo.store.js'
import { Button, Space, message } from 'antd'

class SearchTableDemo extends Component {
  state = {
    search: {
      searchFormList,
      downloadUrl: '/api/download' // 下载链接
    },
    table: {
      loading: false,
      columns,
      list: [],
      total: 0,
      uniqueKey: 'name',
      selection: false // 多选功能开关
    }
  }
  refSearchTable = createRef()

  // 点击查询,翻页,排序都会触发
  onSearch = (query) => {
    this._getTableAPI(query)
  }
  onBtnClick = (type) => {
    console.log('批量', type)
    const { current } = this.refSearchTable
    const rows = current.selectedRows
    console.log(rows)

    const { table } = this.state
    table.selection = !table.selection
    this.setState({ table })
  }
  // 不同查询项之间的联动
  onSearchChange = (name, value) => {
    console.log(name, value)
    if (name === 'applicant') {
      const req = {
        [name]: value
      }
      this._getListAPI(req)
    }
  }
  onTableAction = (action) => {
    console.log('操作:', action)
    if (action === 'delete') {
      setTimeout(() => {
        message.success('删除成功')
        // 操作成功后刷新列表
        this.refSearchTable.current.onSearch()
      }, 500)
    }
  }
  _getTableAPI(req = {}) {
    const { table } = this.state
    table.loading = true
    this.setState({
      table
    })
    getTableAPI(req)
      .then((res) => {
        const { table } = this.state
        table.list = res.list
        table.total = res.total
        table.loading = false
        this.setState({
          table
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  _getSearchAPI(req = {}) {
    getSearchAPI(req)
      .then((result) => {
        const { search } = this.state
        search.searchFormList.forEach((item) => {
          if (item.type === 'select') {
            item.children = result[item.name]
          }
        })
        this.setState({
          search
        })
      })
      .catch((err) => {})
  }
  _getListAPI(req = {}) {
    getListAPI(req)
      .then((result) => {
        const { search } = this.state
        search.searchFormList.forEach((item) => {
          if (item.name === 'productName') {
            item.children = result
          }
        })
        this.setState({
          search
        })
      })
      .catch((err) => {})
  }

  // 修改 columns, 一般用于设置操作列
  modifyColumns() {
    const { table } = this.state
    table.columns.forEach((column) => {
      if (column.key === 'action') {
        column.render = (text, record) => {
          return (
            <Space>
              <a onClick={() => this.onTableAction('delete')}>删除</a>
              <a onClick={() => this.onTableAction('start')}>启用</a>
            </Space>
          )
        }
      }
    })
    this.setState({
      table
    })
  }

  componentDidMount() {
    this.modifyColumns()
    this._getSearchAPI()
    this._getTableAPI()
  }
  render() {
    const { table, search } = this.state
    return (
      <div>
        <SearchTableUI ref={this.refSearchTable} {...table} {...search} onSearch={this.onSearch} onSearchChange={this.onSearchChange}>
          <Space>
            <Button onClick={() => this.onBtnClick('delete')}>批量删除</Button>
            <Button onClick={() => this.onBtnClick('restart')}>批量重启</Button>
          </Space>
        </SearchTableUI>
      </div>
    )
  }
}

export default SearchTableDemo
