// 基础表单项封装
import React, { Component, Fragment, useEffect, useState } from 'react'
import { Input, Button, Select, DatePicker, Radio, Upload, message, Tooltip, Cascader, Tag, Space, Popover } from 'antd'
import { CloudUploadOutlined, ExclamationCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import moment from 'moment'

const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

function SelectUI(props) {
  const selectOpts =
    props.children &&
    props.children.map((item, index) => (
      <Option {...item} key={index}>
        {item.label}
      </Option>
    ))
  const { itemChange, onChange, updateItem, defaultFirst, ...rest } = props
  // onChange事件
  const selectOnChange = (value, option) => {
    // 自定义受控组件
    onChange(value, selectOpts)
    // 向视图暴露接口
    itemChange && itemChange(props.name, value)
  }
  // 默认选中第一项
  useEffect(() => {
    if (defaultFirst) {
      const defaultValue = props.children[0].value
      updateItem({
        [props.name]: defaultValue
      })
    }
  })
  return (
    <Select
      allowClear
      showSearch
      placeholder={'请选择' + props.label}
      optionFilterProp='children'
      dropdownMatchSelectWidth={false}
      {...rest}
      onChange={selectOnChange}>
      {selectOpts}
    </Select>
  )
}

function CascaderUI(props) {
  const { children, ...rest } = props

  return <Cascader allowClear placeholder={'请选择' + props.label} options={children} {...rest} />
}

function RadioUI(props) {
  const { itemChange, onChange, updateItem, defaultFirst, ...rest } = props
  const radioOnChange = (value) => {
    // 自定义受控组件
    onChange(value)
    // 向视图暴露接口
    itemChange && itemChange(props.name, value.target.value)
  }
  const radioOpts =
    Array.isArray(rest.children) &&
    rest.children.map((item, index) => (
      <Fragment key={index}>{props.ifButton ? <Radio.Button {...item}>{item.label}</Radio.Button> : <Radio {...item}>{item.label}</Radio>}</Fragment>
    ))
  // 默认选中第一项
  useEffect(() => {
    if (defaultFirst) {
      const defaultValue = rest.children[0].value
      updateItem({
        [props.name]: defaultValue
      })
    }
  })
  return (
    <Radio.Group {...rest} onChange={radioOnChange}>
      {radioOpts}
    </Radio.Group>
  )
}

function TooltipUI(props) {
  const tooltipTitle = props.tips.map((item, index) => <p key={index}>{item}</p>)
  return (
    <Tooltip arrowPointAtCenter {...props} overlayClassName='tooltip-content' title={tooltipTitle}>
      <ExclamationCircleOutlined />
    </Tooltip>
  )
}

function DateUI(props) {
  let { type, value, ...rest } = props
  const placeholderSelect = '请选择' + props.label
  const dateChange = (_, dateValue) => {
    const value = typeof dateValue === 'object' ? (dateValue.join('') ? dateValue : null) : dateValue || null
    props.updateItem({
      [props.name]: value
    })
  }
  if (type === 'dateType') {
    value = value ? moment(value) : null
    return <DatePicker value={value} placeholder={placeholderSelect} className='w-100' {...rest} onChange={dateChange} />
  }
  value = value ? [moment(value[0]), moment(value[1])] : null
  return (
    // placeholder={[placeholderSelect + '开始日期', placeholderSelect + '结束日期']}
    <RangePicker value={value} className='w-100' {...rest} onChange={dateChange} />
  )
}

function PoptipInput(props) {
  const { keywordList, placeholder, onKeywordChange, id, onChange, value } = props
  const [selected, setSelected] = useState('')
  useEffect(() => {
    // 这里是监控到的最新值
    onKeywordChange(selected)
  }, [selected, onKeywordChange])
  const onBtnClick = (type) => {
    return (e) => {
      setSelected(type !== selected ? type : '')
    }
  }

  const content = (
    <div>
      <p style={{ paddingBottom: '5px' }}>搜索指定内容</p>
      <Space>
        {keywordList &&
          keywordList.map((item, index) => (
            <Button size='small' key={item.key} type={selected === item.key ? 'primary' : 'default'} onClick={onBtnClick(item.key)}>
              {item.title}
            </Button>
          ))}
      </Space>
    </div>
  )

  return (
    <Popover content={content} placement='bottomLeft' trigger='hover'>
      <Input allowClear placeholder={placeholder || '请输入要查询的字段'} id={id} value={value} onChange={onChange}></Input>
    </Popover>
  )
}

class UploadUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 上传文件
      fileLoading: false, // 展示文件列表
      fileName: this.props.fileList || '',
      fileList: [],
      imgUrl: ''
    }
  }
  render() {
    const { btnClick, fileLoading, bottomTips, ...rest } = this.props

    const uploadButton = (
      <>
        <div>{fileLoading ? <LoadingOutlined /> : <PlusOutlined />}</div>
      </>
    )

    const uploadWrap = {
      default: <Input suffix={<CloudUploadOutlined />} placeholder={this.props.placeholder || '请上传文件'} disabled value={this.state.fileName} />,
      'picture-card': this.state.imgUrl ? <img src={this.state.imgUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton
    }
    return (
      <Fragment>
        <Upload
          className='d-ib'
          maxCount={1}
          showUploadList={this.state.fileLoading}
          {...rest}
          fileList={this.state.fileList}
          onChange={this.fileChange}>
          {uploadWrap[this.props.listType || 'default']}
          {bottomTips && <p className='bottom-tips'>{bottomTips}</p>}
        </Upload>
        {this.props.tips && <TooltipUI tips={this.props.tips} className='upload-tips' />}
        {this.props.btn &&
          this.props.btn.map(
            (item, index) =>
              !item.hidden && (
                <Button key={index} onClick={() => btnClick(item.name)} type={item.type || 'primary'} className='upload-btns'>
                  {item.title}
                </Button>
              )
          )}
      </Fragment>
    )
  }
  // 上传文件
  fileChange = (info) => {
    const status = info.file.status
    if (status === 'done') {
      this.setState({
        fileLoading: false
      })
      const res = info.file.response
      if (+res.code === 200) {
        // 上传成功
        // message.success('文件上传成功')
        this.setState({
          fileName: info.file.name,
          imgUrl: res.data.voucherUrl
        })
        this.props.updateItem({
          [this.props.name]: [info.file.name],
          fileData: res.data
        })
        this.props.onFile(res.data)
      } else {
        message.error(res.msg || '文件上传失败')
      }
    } else if (status === 'error') {
      // 上传失败
      this.setState({
        fileLoading: false
      })
      message.error('文件上传失败')
    } else {
      // 上传中
      this.setState({
        fileLoading: true,
        fileList: [info.file]
      })
    }
  }
}

function InputNumber(props) {
  const onChange = (e) => {
    const value = e.target.value
    props.onChange(value ? +value : null)
  }
  return <Input allowClear placeholder={'请输入' + props.label} {...props} type='number' onChange={onChange} />
}

function FormItemBase(props) {
  const type = props.type
  const placeholderInput = '请输入' + props.label
  const { updateItem, btnClick, itemChange, itemBlur, onFile, onKeywordChange, ...rest } = props
  const inputBlur = (e) => {
    itemBlur && itemBlur(e.target.defaultValue, props.name)
  }
  switch (type) {
    // 输入框
    case 'input':
      return <Input allowClear placeholder={placeholderInput} maxLength={props.max} {...rest} onPressEnter={inputBlur} onBlur={inputBlur} />
    // 密码输入框
    case 'inputPassword':
      return <Input.Password allowClear placeholder={placeholderInput} {...rest} />
    // 数字输入框
    case 'inputNumber':
      return <InputNumber {...rest} />
    // 描述框
    case 'textarea':
      return (
        <>
          <TextArea allowClear autoSize placeholder={props.placeholder || placeholderInput} {...rest} maxLength={props.max} />
          {props.tips && <TooltipUI tips={props.tips} className='upload-tips' />}
        </>
      )
    // 下拉选择框
    case 'select':
      return <SelectUI {...rest} itemChange={itemChange} updateItem={updateItem} />
    // 级联选择
    case 'cascader':
      return <CascaderUI {...rest} />
    // 单选框
    case 'radio':
      return <RadioUI {...rest} itemChange={itemChange} updateItem={updateItem} />
    // 时间选择器
    case 'dateType':
    case 'rangeType':
      return <DateUI updateItem={updateItem} {...rest} />
    // 上传文件
    case 'file':
      return <UploadUI updateItem={updateItem} onFile={onFile} {...rest} btnClick={btnClick} />
    // 文字提示
    case 'tooltip':
      return <TooltipUI {...rest} />
    // 按钮
    case 'btn':
      return (
        <Button type={props.btnType || 'primary'} onClick={() => btnClick(props.name)}>
          {props.title}
        </Button>
      )
    // 标签
    case 'tag':
      return (
        <Space size={props.size}>
          {props.tagsArr.map((tag, index) => (
            <Tag key={index} color='default' onClick={() => itemChange(props.name, tag)}>
              {tag}
            </Tag>
          ))}
        </Space>
      )
    // 文字展示
    case 'text':
      return <p style={{ lineHeight: '32px', margin: '0px 0px 0px 2px' }}>{props.value}</p>
    // 自定义展示
    case 'custom':
      return props.value || <></>
    case 'poptipInput':
      return <PoptipInput {...rest} onKeywordChange={onKeywordChange} />
    default:
      return <Fragment />
  }
}

FormItemBase.propTypes = {
  type: PropTypes.string.isRequired, // 表单项类型
  name: PropTypes.oneOfType([
    // 表单项键值
    PropTypes.string,
    PropTypes.array
  ]),
  label: PropTypes.string, // 表单标题
  required: PropTypes.bool, // 是否必填
  dataType: PropTypes.string // 校验数据类型
}

export default FormItemBase
