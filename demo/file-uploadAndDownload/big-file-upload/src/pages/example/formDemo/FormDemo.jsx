import './style/index.less'
import React, { Component } from 'react'
import FormUI from '@/components/formUI/FormUI'
import { formListData, formListChange, formListDefaultValue, formListRules } from './data/data'
import { Button } from 'antd'

class FormDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 14
      }
    }
    const initialValues = {
      nameDefault: 'nameDefault',
      selectDefault: 1,
      select_mul: [1],
      rangeType: ['2020-01-01', '2020-01-31'],
      radioDefault: 1,
      fileMame: ['xxx']
    }
    return (
      <div className="g-content">
        <div className='form-demo'>
          <h1>表单默认值</h1>
          <FormUI formListData={formListDefaultValue} layout={layout} initialValues={initialValues} />
          <p>下拉默认选中第一项-defaultFirst</p>
          <FormUI formListData={formListDefaultValue} layout={layout} defaultFirst />
        </div>
        <div className='form-demo'>
          <h1>按钮提交 && 表单项change事件</h1>
          <FormUI
            onRef={(ref) => this.onRef(ref, 'formBtn')}
            formListData={formListChange}
            layout={layout}
            btnClick={this.btnClick}
            itemChange={this.itemChange}
          />
        </div>
        <div className='form-demo'>
          <h1>提交表单-校验表单</h1>
          <FormUI
            onRef={(ref) => this.onRef(ref, 'formSubmit')}
            formListData={formListRules}
            layout={layout}
            btnClick={this.btnClick}
            onFile={this.onFile}
          />
          <div>
            <Button onClick={this.submit} type='primary'>
              提交
            </Button>
            <Button>取消</Button>
          </div>
        </div>
        <div className='form-demo'>
          <h1>常规表单</h1>
          <FormUI formListData={formListData} layout={layout} />
        </div>
      </div>
    )
  }
  onRef = (ref, name) => {
    this[name] = ref
  }
  // 按钮点击事件
  btnClick = (key) => {
    console.log('click', key)
    // 获取表单数据
    this.formSubmit.getValues()
  }
  // 表单项change事件
  itemChange = (key, value) => {
    console.log('change', key, value)
  }
  // 文件上传
  onFile = (data) => {
    console.log('文件上传成功', data)
  }
  submit = () => {
    this.formSubmit
      .submit()
      .then((res) => {
        console.log('提交成功', res)
        // 注：表单中存在文件上传，需要后端返回的文件相关数据，可以调用getValues方法，或直接绑定onFile方法
      })
      .catch((err) => {
        console.log('提交失败', err)
      })
  }
}

export default FormDemo
