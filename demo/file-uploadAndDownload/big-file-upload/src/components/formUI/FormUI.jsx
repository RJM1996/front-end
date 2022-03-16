import { Form, Row, Col } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormItem from './FormItem'
import less from 'less'
import './index.less'

// 判断表单类型
function getItemType(type, ifMul) {
  switch (type) {
    case 'rangeType':
    case 'file':
    case 'cascader':
      return 'array'
    case 'select':
      return ifMul ? 'array' : 'string'
    case 'inputNumber':
      return 'number'
    default:
      return ''
  }
}

// 数字取值范围校验
function validateNumberRange(value, rangeArr) {
  const rangeStr = rangeArr.split('')
  // 根据range进行取值范围校验
  // 先取出括号
  const leftBracket = rangeStr[0]
  const rightBracket = rangeStr[rangeStr.length - 1]
  // 再取出最大最小值
  const range = rangeArr.split(',')
  // max 和 min 表示数字的最大值和最小值; 例如: [1, max) 表示最小为1, 最大不限
  const min = range[1].includes('min') ? Number.MIN_SAFE_INTEGER : parseInt(range[0].substring(1))
  const max = range[1].includes('max') ? Number.MAX_SAFE_INTEGER : parseInt(range[1])
  // 然后判断 4 种区间: (), [], (], [)
  const bracket = leftBracket + rightBracket
  const bracketMap = {
    '()': () => value > min && value < max,
    '[]': () => value >= min && value <= max,
    '(]': () => value > min && value <= max,
    '[)': () => value >= min && value < max
  }
  return bracketMap[bracket]()
}

// 校验规则
function getItemRules(item) {
  if (item.rule) return item.rule
  let { required, trigger, dataType } = item
  // 数据类型：
  dataType = dataType && item.type !== 'inputNumber' ? dataType : getItemType(item.type, item.type === 'select' && item.mode === 'multiple')
  // 触发方式
  const triggerArr = ['input', 'inputNumber', 'textarea']
  trigger = trigger ? trigger : triggerArr.indexOf(item.type) > -1 ? 'onBlur' : 'onChange'
  let rules = [
    {
      required,
      message: ' ',
      type: dataType,
      trigger
    }
  ]
  if (dataType !== 'string') {
    rules.push({
      type: dataType,
      trigger,
      message: ' '
    })
  }
  // 文本展示删除type校验
  if (item.type === 'text') return []
  // 数字输入框取值范围
  if (item.type === 'inputNumber') {
    rules.push({
      trigger: 'onBlur',
      validator: (_, value) => {
        if (item.range) {
          // 取值范围
          const flag = validateNumberRange(value, item.range)
          if (!flag) return Promise.reject(new Error('取值范围：' + item.range))
        }
        if (item.dataType === 'integer') {
          // 整数
          const flag = Number.isInteger(value)
          if (!flag) return Promise.reject(new Error('必须为整数'))
        }
        return Promise.resolve()
      }
    })
  }
  return rules
}

function FormItemRow(props) {
  let searchDom = null
  // 查询按钮
  if (props.formType === 'search') {
    searchDom = <Col flex='auto'>{props.children}</Col>
  }
  return (
    <Row gutter={24}>
      {props.formListData.map((item, index) => {
        let rules = getItemRules(item)
        let className = item.className
        if (item.type === 'file') {
          className = className ? className + ' upload-file-list' : 'upload-file-list'
        }
        const itemAttrs = {
          // Form.item相关属性
          label: item.label,
          name: item.name,
          valuePropName: item.valuePropName,
          rules: rules,
          validateFirst: true,
          colon: item.colon,
          className: className,
          labelCol: item.labelCol,
          wrapperCol: item.wrapperCol
        }
        const formItemSpan = props.itemLabel
        const { dataType, itemSpan, labelCol, wrapperCol, ...rest } = item
        const formItemAttrs = {
          // 表单项相关
          ...rest,
          updateItem: props.updateItem,
          btnClick: props.btnClick,
          itemChange: props.itemChange,
          itemBlur: props.itemBlur,
          onFile: props.onFile,
          onKeywordChange: props.onKeywordChange
        }
        return (
          <Col key={`formlist_ ${index}`} span={item.itemSpan ? item.itemSpan : formItemSpan}>
            <Form.Item {...itemAttrs} label={itemAttrs.label ? <span>{itemAttrs.label}</span> : ''}>
              <FormItem {...formItemAttrs} />
            </Form.Item>
          </Col>
        )
      })}
      {searchDom}
    </Row>
  )
}

class FormUI extends Component {
  formRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {}
    this.keywordKey = null
  }
  render() {
    const minWidth = this.props.minWidth
    return (
      <div className={`form-ui minWidth${minWidth}`}>
        <Form
          name='nest-messages'
          ref={this.formRef}
          scrollToFirstError
          {...this.props.layout}
          initialValues={this.props.initialValues}
          labelAlign={this.props.labelAlign}>
          <FormItemRow {...this.props} onKeywordChange={this.onKeywordChange} updateItem={this.updateItem} />
        </Form>
      </div>
    )
  }
  // 该函数将会传递到组件 PoptipInput 中, 用于获取关键词的key
  onKeywordChange = (key) => {
    // 将关键词的key保存起来
    this.keywordKey = key
  }
  // 获取表单数据
  getValues = () => {
    let data = this.formRef.current.getFieldsValue(true)
    // 如果关键词输入框有值,则把关键词的key也加入表单数据
    if (this.keywordKey !== null) {
      data = { ...data, keywordKey: this.keywordKey }
    }

    console.log(data)
    return data
  }
  // 重置表单
  reset = () => {
    this.formRef.current.resetFields()
  }
  // 更新表单项
  updateItem = (value) => {
    this.formRef.current.setFieldsValue({
      ...value
    })
  }
  // 提交表单
  submit = () => {
    return this.formRef.current.validateFields()
  }
  componentDidMount() {
    // 绑定ref
    this.props.onRef && this.props.onRef(this)
    less.modifyVars({
      '@primry-color': 'blue'
    })
  }
}
FormUI.propTypes = {
  formListData: PropTypes.array.isRequired, // 表单结构
  minWidth: PropTypes.number, // label最小宽度
  layout: PropTypes.object, // 表单布局
  initialValues: PropTypes.object, // 回填默认展示数据
  labelAlign: PropTypes.string, // label对齐方式
  formType: PropTypes.string, // 表单引用类型，SearchUI内部使用的属性
  itemLabel: PropTypes.oneOfType([
    // 表单Col排列，【24：一排一个；12：一排两个；。。。】,支持数组
    PropTypes.number,
    PropTypes.array
  ]),
  // 事件
  btnClick: PropTypes.func, // 按钮点击事件，返回(name)
  itemChange: PropTypes.func, // 下拉、单选change事件，返回(name, value)
  onFile: PropTypes.func // 上传文件成功，返回后端返回数据
}
// 默认值
FormUI.defaultProps = {
  formListData: [],
  layout: {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    }
  },
  initialValues: {},
  labelAlign: 'right',
  itemLabel: 24
}

export default FormUI
