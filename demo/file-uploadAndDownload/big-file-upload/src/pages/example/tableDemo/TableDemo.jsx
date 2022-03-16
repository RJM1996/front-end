import React, { Component } from 'react'
import { Button, Space } from 'antd'
import TableUI from '@/components/tableUI/TableUI'
import ModalUI from '@/components/modalUI/ModalUI'
import FormItemBase from '@/components/formUI/FormItemBase'
import { getTableAPI } from '@/store/modules/demo/demo.store.js'
import { columns, actions } from './data/tableDemo.js'

export default class TableDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      table: {
        loading: false,
        list: [],
        pagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: [10, 20, 30, 40, 50],
          total: 0
        }
      },
      actionModal: {
        title: '',
        visible: false,
        hideCancel: true,
        handleOk: this.handleModalOk,
        handleCancel: this.handleModalCancel
      },
      actionType: '',
      sortedInfo: null
    }
  }
  //  本地不会改变的数据
  columns = columns.concat({
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    render: (text, record) => {
      return (
        <Space size='middle'>
          {actions.map((item, index) => {
            if (
              (item.key === 'stop' && ['1', '2', '3'].includes(record.key)) ||
              (item.key === 'restart' && ['1', '2'].includes(record.key)) ||
              (item.key === 'view' && ['1'].includes(record.key))
            ) {
              return (
                <a
                  key={item.key}
                  onClick={() => {
                    this.actionClick(item, record)
                  }}>
                  {item.title}
                </a>
              )
            }
          })}
        </Space>
      )
    }
  })
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows)
    }
  }
  selectOpts = [
    {
      label: 'reason01',
      value: 'reason01'
    },
    {
      label: 'reason02',
      value: 'reason02'
    },
    {
      label: 'reason03',
      value: 'reason03'
    }
  ]
  selectChange = (value, selectOpts) => {
    console.log(value, selectOpts)
  }
  modalSlot = {
    restart: '案件重启成功，请继续进行调解。',
    stop: (
      <div>
        <p>请选择暂停调解原因：</p>
        <FormItemBase
          type='select'
          label='暂停调解原因'
          onChange={this.selectChange}
          children={this.selectOpts}></FormItemBase>
      </div>
    ),
    view: '查看'
  }
  showModal = (visible) => {
    this.setState({
      actionModal: {
        ...this.state.actionModal,
        visible: visible
      }
    })
  }
  actionClick = (action, row) => {
    this.setState({
      actionType: action.key
    })
    console.log(action, row)
    this.setState(
      {
        actionModal: {
          ...this.state.actionModal,
          title: action.title
        }
      },
      () => {
        this.showModal(true)
      }
    )
  }
  handleModalOk = () => {
    console.log('ok')
    this.showModal(false)
  }
  handleModalCancel = () => {
    console.log('cancel')
    this.showModal(false)
  }
  pageChange = (page, pageSize, sorter) => {
    this.updateSortedInfo(sorter)
    let req = {
      page,
      pageSize
    }
    if (sorter) {
      req = {
        ...req,
        sorter: {
          field: sorter.field,
          order: sorter.order
        }
      }
    }

    this.getTable(req)
  }
  getTable = (reqData = {}) => {
    this.setState({
      table: {
        ...this.state.table,
        loading: true
      }
    })
    const { current, pageSize } = this.state.table.pagination
    reqData = {
      page: current,
      pageSize: pageSize,
      ...reqData
    }
    getTableAPI(reqData)
      .then((res) => {
        const table = {
          loading: false,
          list: res.list,
          pagination: {
            ...this.state.pagination,
            total: res.total
          }
        }
        this.setState({
          table
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  updateSortedInfo = (sortedInfo) => {
    this.setState({
      sortedInfo
    })
  }
  updateColumns = () => {
    let { sortedInfo } = this.state
    sortedInfo = sortedInfo || {}
    this.columns.forEach((column) => {
      if (column.sorter) {
        column.sortOrder = sortedInfo.columnKey === column.key && sortedInfo.order
      }
    })
  }

  render() {
    this.updateColumns()
    return (
      <div className="g-content">
        <Space size={20}>
          <Button
            type='primary'
            onClick={() => {
              this.updateSortedInfo(null)
              this.getTable()
            }}>
            获取列表
          </Button>
        </Space>
        <TableUI
          {...this.state.table}
          columns={this.columns}
          onChange={this.pageChange}
          uniqueKey='name'
          rowSelection={this.rowSelection}></TableUI>
        <TableUI></TableUI>
        {/* 操作确认弹窗 */}
        <ModalUI width={400} {...this.state.actionModal}>
          {this.modalSlot[this.state.actionType]}
        </ModalUI>
      </div>
    )
  }
}
