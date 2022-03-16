import './tableUI.less'
import React, { Component } from 'react'
import { Table, Tooltip } from 'antd'

class TableUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        // 分页相关配置
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: [10, 20, 30, 40],
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total, range) => `共 ${total} 条记录`,
        ...props.pagination
      },
      sorter: {}
    }
  }
  // 当 props 改变时, 修改 state
  static getDerivedStateFromProps(props, currentState) {
    // 如果 pagination 是 false, 则不进行分页
    if (!props.pagination) {
      return {
        pagination: false
      }
    }
    return {
      pagination: {
        ...currentState.pagination,
        ...props.pagination
      }
    }
  }
  // 翻页,改变每页条数,跳页时触发
  pageChange = (page, pageSize, sorter) => {
    this.setState((preState, props) => {
      // 当每页展示条数改变时, 页码需要变成 1
      let current = pageSize !== preState.pagination.pageSize ? 1 : page
      
      // 当排序触发时, 需要将页码变为1
      if (Object.keys(preState.sorter).length && sorter.order !== preState.sorter.order) {
        current = 1
      }
      // 增加asc属性 正倒序排列
      sorter.asc = sorter.order === 'ascend'
      // 触发父组件传进来的 pageChange
      props.onChange(current, pageSize, sorter)
      return {
        pagination: {
          ...this.state.pagination,
          current,
          pageSize
        },
        sorter: sorter
      }
    })
  }
  // 分页、排序、筛选变化时触发
  handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination
    this.pageChange(current, pageSize, sorter)
  }

  render() {
    const { columns, list, loading, rowSelection, pagination, onChange, uniqueKey, rowClick, rowClassName, ...rest } = this.props
    let localColumns = []
    if (columns && columns.length) {
      localColumns = [].concat(columns)
    }
    localColumns.forEach((column) => {
      if (column.tooltip) {
        column.render = (text, record) => {
          return (
            <Tooltip title={column.content || text} placement={column.ellipsis ? 'topLeft' : 'top'}>
              <span>{column.content || text || '--'}</span> 
            </Tooltip>
          )
        }
      }
    })

    return (
      <Table
        className={'table-ui'}
        rowSelection={rowSelection && { ...rowSelection }}
        columns={localColumns}
        dataSource={list}
        loading={loading}
        bordered={true}
        pagination={this.state.pagination}
        onChange={this.handleTableChange}
        onRow={record => {
          return {
            onClick: (e) => {
              rowClick && rowClick(record)
            }
          }
        }}
        rowKey={(record) => {
          return record.key || record.id || record[uniqueKey]
        }}
        rowClassName={rowClassName}
        {...rest}
      />
    )
  }
}

export default TableUI
