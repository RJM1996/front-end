import React, { Component } from 'react'
import SearchUI from '@/components/searchUI/SearchUI'
import { getSearchAPI } from '@/store/modules/demo/demo.store.js'
import { formListData } from './data/data'

class SearchDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formListData: []
    }
  }
  render() {
    return (
      <div className='g-content'>
        {/* <h1>条件查询</h1> */}
        <SearchUI formListData={this.state.formListData} ifDownload onSearch={this.onSearch} />
      </div>
    )
  }
  // 查询
  onSearch = (data) => {
    console.log('查询', data)
  }
  componentDidMount() {
    getSearchAPI()
      .then((res) => {
        const formList = JSON.parse(JSON.stringify(formListData))
        formList.forEach((item) => {
          if (res[item.name]) {
            item.children = res[item.name]
          }
        })
        this.setState({
          formListData: formList
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default SearchDemo
