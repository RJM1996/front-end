import React, { Component, createRef } from 'react'
import { Space, message } from 'antd'
import SearchTableUI from '@/components/searchTableUI/SearchTableUI'
import ModalUI from '../../../components/modalUI/ModalUI'
import FormUI from '../../../components/formUI/FormUI'
import { getSearchParams } from '../../../common/util'
import { getUserList, editUserSubmit, getRoleSelect } from '@/store/modules/permissionManage/userManage.store'
import { columns, searchFormList, editModalFormList } from './data/userManage'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

class UserManage extends Component {
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
      uniqueKey: 'name',
      selection: false // 多选功能开关
    },
    modalVisible: false,
    editModalFormList,
    editModalFormData: {}
  }
  refSearchTable = createRef()
  refFormUI = createRef()

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
  }
  onTableAction = (action, row) => {
    console.log('操作:', action, row)
    if (action === 'edit') {
      let { editModalFormList, editModalFormData } = this.state
      editModalFormData = { ...row }
      editModalFormList.forEach((item) => {
        if (item.type === 'text') {
          item.value = row[item.key]
        }
      })
      this.setState({
        modalVisible: true,
        editModalFormList,
        editModalFormData
      })
    }
  }
  onModalOk = () => {
    this.refFormUI.current
      .submit()
      .then((result) => {
        console.log(result)
        // TODO 编辑确认,提交后端
        const { editModalFormData } = this.state
        const req = {
          roleId: result.roleName,
          id: editModalFormData.id
        }
        editUserSubmit(req)
          .then((result) => {
            message.success('提交成功')
            this.onModalCancel()
            this._getTableAPI(this.queryData)
          })
          .catch((err) => {
            message.error(err.message || '提交失败')
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  onModalCancel = () => {
    this.setState({ modalVisible: false })
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
    getUserList(req)
      .then((res) => {
        console.log(res)
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
  _getRoleSelect() {
    getRoleSelect({})
      .then((result) => {
        // 设置角色下拉列表
        const { editModalFormList } = this.state
        editModalFormList[3].children = result['roleList']
        this.setState({ editModalFormList })
      })
      .catch((err) => {
        console.log(err)
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
              <a onClick={() => this.onTableAction('edit', record)}>编辑</a>
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
    const search = this.props.location.search
    const query = getSearchParams(search)
    this.modifyColumns()
    this._getTableAPI(query)
    this._getRoleSelect()
  }
  render() {
    const { table, search, modalVisible, editModalFormList, editModalFormData } = this.state

    return (
      <div>
        <SearchTableUI ref={this.refSearchTable} {...table} {...search} onSearch={this.onSearch} onSearchChange={this.onSearchChange}></SearchTableUI>
        {/* 编辑用户 - 弹窗 */}
        <ModalUI title='编辑用户' width={400} visible={modalVisible} handleOk={this.onModalOk} handleCancel={this.onModalCancel}>
          <FormUI ref={this.refFormUI} formListData={editModalFormList} initialValues={editModalFormData} layout={layout} />
        </ModalUI>
      </div>
    )
  }
}

export default UserManage

UserManage.propTypes = {}
