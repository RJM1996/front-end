import React, { Component, createRef } from 'react'
import { Space, message, Button } from 'antd'
import SearchTableUI from '@/components/searchTableUI/SearchTableUI'
import ModalUI from '../../../components/modalUI/ModalUI'
import FormUI from '../../../components/formUI/FormUI'
import TransferUI from '../../../components/transferUI/TransferUI'
import { getRoleList, getAllPermissions, editRoleSubmit } from '@/store/modules/permissionManage/roleManage.store'
import { columns, searchFormList, editModalFormList } from './data/roleManage'

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 10
  }
}

class RoleManage extends Component {
  state = {
    search: {
      searchFormList
      // downloadUrl: '/api/download' // 下载链接
    },
    table: {
      loading: false,
      columns,
      list: [],
      total: 0,
      uniqueKey: 'id',
      selection: false // 多选功能开关
    },
    modalTitle: '新建角色',
    modalVisible: false,
    editModalFormList,
    editModalFormData: {},
    permissionData: {
      allList: [],
      allocated: []
    }
  }
  refSearchTable = createRef()
  refFormUI = createRef()
  refTransferUI = createRef()

  // 点击查询,翻页,排序都会触发
  onSearch = (query) => {
    this.queryData = {
      keyword: query.keywordKey,
      keywordContent: query.keywordValue,
      page: query.page,
      pageSize: query.pageSize
    }
    this._getTableAPI(this.queryData)
  }
  // 不同查询项之间的联动
  onSearchChange = (name, value) => {}
  onTableAction = (action, row) => {
    const actionMap = {
      edit: () => {
        let { editModalFormData } = this.state
        editModalFormData = { ...row }
        const req = { id: row.id }
        this._getAllPermissions(req)
        this.setState({
          modalTitle: '编辑角色',
          modalVisible: true,
          editModalFormData
        })
      },
      delete: () => {
        alert('删除' + row.id)
      },
      viewUser: () => {
        // 跳转用户列表
        this.props.history.push(`/userManage?roleId=${row.id}`)
      }
    }

    actionMap[action] && actionMap[action]()
  }
  onModalOk = () => {
    this.refFormUI.current
      .submit()
      .then((result) => {
        let { editModalFormData } = this.state
        const permissionData = this.refTransferUI.current.getData()

        const req = {
          id: editModalFormData.id,
          ...result,
          hasAction: permissionData.targetKeys
        }
        this._editRoleSubmit(req)
      })
      .catch((err) => {})
  }
  onModalCancel = () => {
    this.setState({ modalVisible: false })
  }
  onAddRole = () => {
    this._getAllPermissions()
    this.setState({
      modalTitle: '新建角色',
      modalVisible: true,
      editModalFormData: {}
    })
  }
  _getTableAPI(req = {}) {
    const { table } = this.state
    table.loading = true
    this.setState({
      table
    })
    req = {
      page: 1,
      pageSize: 10,
      ...req
    }
    getRoleList(req)
      .then((res) => {
        const { table } = this.state
        table.list = res.list
        table.total = res.total
        table.loading = false
        this.setState({
          table
        })
      })
      .catch((error) => {})
  }
  _getAllPermissions(req = {}) {
    this.setState({
      permissionData: {
        allList: [],
        allocated: []
      }
    })
    getAllPermissions(req)
      .then((result) => {
        const { allAction, hasAction } = result
        this.setState({
          permissionData: {
            allList: allAction || [],
            allocated: hasAction || []
          }
        })
      })
      .catch((err) => {})
  }
  _editRoleSubmit(req = {}) {
    editRoleSubmit(req)
      .then((result) => {
        message.success('提交成功')
        this.onModalCancel()
        this._getTableAPI(this.queryData)
      })
      .catch((err) => {
        message.error(err.message || '提交失败')
      })
  }

  // 修改 columns, 一般用于设置操作列
  modifyColumns() {
    const { table } = this.state
    table.columns.forEach((column) => {
      if (column.key === 'action') {
        column.render = (text, record) => {
          return (
            <Space>
              <a onClick={() => this.onTableAction('viewUser', record)}>查看用户</a>
              <a onClick={() => this.onTableAction('edit', record)}>编辑</a>
              {/* <a onClick={() => this.onTableAction('delete', record)}>删除</a> */}
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
    this._getTableAPI()
  }
  render() {
    const { table, search, modalVisible, editModalFormList, editModalFormData, modalTitle, permissionData } = this.state

    return (
      <div>
        <SearchTableUI ref={this.refSearchTable} {...table} {...search} onSearch={this.onSearch} onSearchChange={this.onSearchChange}>
          <div style={{ textAlign: 'right' }}>
            <Button type='primary' onClick={this.onAddRole}>
              新建角色
            </Button>
          </div>
        </SearchTableUI>
        {/* 编辑用户 - 弹窗 */}
        <ModalUI title={modalTitle} width={650} visible={modalVisible} handleOk={this.onModalOk} handleCancel={this.onModalCancel}>
          <FormUI ref={this.refFormUI} formListData={editModalFormList} initialValues={editModalFormData} layout={layout} />
          {permissionData.allList.length ? (
            <TransferUI ref={this.refTransferUI} dataSource={permissionData.allList} targetKeys={permissionData.allocated} />
          ) : (
            '获取数据中...'
          )}
        </ModalUI>
      </div>
    )
  }
}

export default RoleManage

RoleManage.propTypes = {}
