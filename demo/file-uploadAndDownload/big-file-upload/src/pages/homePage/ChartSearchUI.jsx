import React from 'react'
import { Space, Select, Radio, DatePicker } from 'antd'
import moment from 'moment'

class ChartSearchUI extends React.Component {
  state = {}
  searchFormData = {}

  triggerPropsOnChange = (name, value) => {
    this.searchFormData[name] = value
    this.props.onChange(this.searchFormData)
  }

  onSelectChange = (name, value, option) => {
    this.triggerPropsOnChange(name, value)
  }
  onRadioGroupChange = (name, e) => {
    const value = e.target.value
    this.triggerPropsOnChange(name, value)
  }
  onDateRangeChange = (name, date, dateStr) => {
    console.log(name, date, dateStr)
    this.triggerPropsOnChange(name, dateStr)
  }

  initSearchForm = () => {
    // 使用表单默认值初始化 searchFormData
    this.props.formList.forEach((item) => {
      this.searchFormData[item.name] = item.defaultValue
    })
  }

  componentDidMount() {
    this.initSearchForm()
  }
  render() {
    const { formList } = this.props
    this.initSearchForm()
    return (
      <div>
        <Space>
          {formList.map((item) => {
            if (item.type === 'select') {
              return (
                <Select
                  key={item.name}
                  defaultValue={item.defaultValue}
                  dropdownMatchSelectWidth={false}
                  onSelect={(value, option) => {
                    this.onSelectChange(item.name, value, option)
                  }}
                  style={{ width: 100 }}>
                  {item.children.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              )
            }
            if (item.type === 'radioGroup') {
              return (
                <Radio.Group
                  key={item.name}
                  defaultValue={item.defaultValue}
                  onChange={(e) => {
                    this.onRadioGroupChange(item.name, e)
                  }}>
                  {item.children.map((opt) => (
                    <Radio.Button key={opt.value} value={opt.value}>
                      {opt.label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              )
            }
            if (item.type === 'dateRange') {
              return (
                <DatePicker.RangePicker
                  key={item.name}
                  allowClear={false}
                  disabled={item.disabled}
                  disabledDate={item.disabledDate}
                  value={[moment(item.defaultValue[0]), moment(item.defaultValue[1])]}
                  onChange={(date, dateStr) => {
                    this.onDateRangeChange(item.name, date, dateStr)
                  }}
                />
              )
            }
          })}
        </Space>
      </div>
    )
  }
}

export default ChartSearchUI
