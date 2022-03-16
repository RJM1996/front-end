import PropTypes from 'prop-types'
import React, { Component } from 'react'
import FormUI from '../formUI/FormUI'
import { Button, Row, Col } from 'antd'
import { download } from '../../common/util'

class SearchUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemLabel: 8
    }
  }
  render() {
    let { layout, downloadUrl, ...rest } = this.props
    if (!layout) {
      layout = {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      }
    }
    return (
      <div className='search-ui' style={{ background: '#fff' }}>
        <FormUI onRef={this.onRef} formType='search' itemLabel={this.state.itemLabel} layout={layout} labelAlign='left' {...rest}>
          <Row justify='end' gutter={[20]}>
            <Col>
              <Button type='primary' onClick={this.searchClick}>
                查询
              </Button>
            </Col>
            {downloadUrl && (
              <Col>
                <Button type='primary' onClick={this.downloadClick}>
                  导出
                </Button>
              </Col>
            )}
            <Col>
              <Button onClick={this.reset}>重置</Button>
            </Col>
          </Row>
        </FormUI>
      </div>
    )
  }
  onRef = (ref) => {
    this.formRef = ref
  }
  // 获取查询表单数据
  getSearchForm = () => {
    const data = { ...this.formRef.getValues() }
    return data
  }
  // 查询
  searchClick = () => {
    const data = this.formRef.getValues()
    this.props.onSearch(data)
  }
  // 导出
  downloadClick = () => {
    const data = this.formRef.getValues()
    let { downloadUrl } = this.props
    download(downloadUrl, data)
  }
  // 重置
  reset = () => {
    const { onReset } = this.props
    onReset && onReset()
    this.formRef.reset()
  }
  // 更新
  updateItem = (value) => {
    this.formRef.updateItem(value)
  }
  getValues = () => {
    this.formRef.getValues()
  }
  // 监听屏幕尺寸变化
  screenChange = () => {
    window.addEventListener('resize', this.resize)
  }
  resize = (e) => {
    const width = e.currentTarget.innerWidth
    this.setState({
      itemLabel: width >= 1700 ? 6 : width <= 1200 ? 12 : 8
    })
  }
  componentDidMount() {
    this.screenChange()
    const width = window.innerWidth
    this.setState({
      itemLabel: width >= 1700 ? 6 : width <= 1200 ? 12 : 8
    })
  }
  componentWillUnmount() {
    this.setState = () => {
      return
    }
    window.removeEventListener('resize', this.screenChange)
  }
}

SearchUI.propTypes = {
  onSearch: PropTypes.func,
  onDownload: PropTypes.func,
  layout: PropTypes.any,
  showDownload: PropTypes.any
}

export default SearchUI
