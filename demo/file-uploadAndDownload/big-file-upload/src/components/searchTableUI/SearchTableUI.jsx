/**
 * desc: 查询列表页面的封装
 * author: rongjunming
 * time: 2021年07月30日10:18:49
 */

import React, { Component } from 'react'
import SearchUI from '@/components/searchUI/SearchUI'
import TableUI from '@/components/tableUI/TableUI'
import PropTypes from 'prop-types'

class SearchTableUI extends Component {
  state = {
    searchFormList: [],
    table: {
      loading: false,
      list: [],
      columns: [],
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: [10, 20, 30, 40, 50],
        total: 0
      },
      selection: false,
      uniqueKey: '' // 用于指定列表每行的唯一key
    },
    sortedInfo: null // 用于恢复排序状态
  }
  queryData = {} // 保存查询条件
  selectedRows = [] // 多选, 记录已选择的行
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows)
      this.selectedRows = selectedRows
    }
  }

  // 用于重置排序状态
  updateSortedInfo = (sortedInfo) => {
    this.setState({ sortedInfo }, () => {
      let { sortedInfo, table } = this.state
      sortedInfo = sortedInfo || {}
      table.columns.forEach((column) => {
        if (column.sorter) {
          column.sortOrder = sortedInfo.columnKey === column.key && sortedInfo.order
        }
      })
      this.setState({
        table
      })
    })
  }
  // 设置翻页数据
  updatePageData(page = 1, pageSize = 10) {
    const { pagination } = this.state.table
    pagination.current = page
    pagination.pageSize = pageSize
    this.setState({
      table: {
        ...this.state.table,
        pagination
      }
    })
  }
  // 更新查询条件输入值, 主要用于回填, 设置默认条件等
  updateSearchForm = (value, reset) => {
    reset && this.refs['refSearchUI'].reset()
    this.refs['refSearchUI'].updateItem({
      ...value
    })
  }

  // event method
  // 点重置的时候,需要把之前保存的查询条件清空
  onReset = () => {
    this.queryData = {}
    console.log(JSON.stringify(this.queryData))
  }
  onSearch = (data = {}) => {
    console.log(JSON.stringify(this.queryData))
    // 每次点击查询都要将页码和排序恢复为默认状态
    this.updateSortedInfo(null)
    this.updatePageData()
    this.queryData = {
      ...this.queryData,
      ...data
    }
    // 如果输入框没有值,那么所选的关键词也就没有意义
    if (!this.queryData['keywordValue']) {
      delete this.queryData['keywordKey']
      delete this.queryData['keywordValue']
    }
    console.log(this.queryData, data)
    const req = {
      page: 1,
      pageSize: 10,
      ...this.queryData
    }
    this.props.onSearch(req)
  }
  onTableChange = (page, pageSize, sorter) => {
    this.updateSortedInfo(sorter)
    this.updatePageData(page, pageSize)
    let req = {
      page,
      pageSize,
      ...this.queryData
    }
    if (sorter.order) {
      req = {
        ...req,
        sorter: {
          field: sorter.field,
          asc: sorter.order === 'ascend'
        }
      }
    }
    this.props.onSearch(req)
  }
  onSearchChange = (name, value) => {
    this.props.onSearchChange(name, value)
  }

  // lifeCycle
  // 当 props 改变时, 修改 state
  static getDerivedStateFromProps(props, currentState) {
    return updateStateByProps(currentState, props)
  }
  componentDidMount() {
    const state = updateStateByProps(this.state, this.props)
    this.setState(state)
  }
  render() {
    const { table, searchFormList } = this.state

    return (
      <div>
        <div className='g-content'>
          <SearchUI
            ref='refSearchUI'
            minWidth={100}
            labelAlign='right'
            formListData={searchFormList}
            downloadUrl={this.props.downloadUrl}
            onSearch={this.onSearch}
            onReset={this.onReset}
            itemChange={this.onSearchChange}
          />
        </div>
        <div className='g-content'>
          {/* 可以放置列表上方的一些按钮 */}
          {this.props.children}
          {/* Table列表 */}
          <TableUI {...table} scroll={{ x: 1200 }} onChange={this.onTableChange} rowSelection={table.selection && this.rowSelection}></TableUI>
        </div>
      </div>
    )
  }
}

SearchTableUI.propTypes = {
  // data
  downloadUrl: PropTypes.string, // 导出的URL
  searchFormList: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  selection: PropTypes.bool, // 是否可多选
  uniqueKey: PropTypes.string.isRequired, // 用于指定列表每行的唯一key
  // func
  onSearch: PropTypes.func,
  onSearchChange: PropTypes.func
}

export default SearchTableUI

// 根据 props 设置 state
const updateStateByProps = (state, props) => {
  const { searchFormList, total, ...tableProps } = props
  let { table } = state
  table = {
    ...table,
    ...tableProps
  }
  table.pagination.total = total
  return {
    table,
    searchFormList
  }
}
