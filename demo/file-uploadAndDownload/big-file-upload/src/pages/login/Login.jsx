// 登录页面
import './style/login.less'
import React, { useRef, useState } from 'react'
import FormUI from '@/components/formUI/FormUI'
import { Button, message } from 'antd'
import { loginAPI } from '../../store/modules/login/login.store.js'

const formListData = [
  {
    type: 'input',
    name: 'username',
    placeholder: '请输入您的用户名',
    required: true
  },
  {
    type: 'inputPassword',
    name: 'password',
    placeholder: '请输入您的密码',
    required: true
  }
]
const layout = {
  labelCol: {
    span: 0
  },
  wrapperCol: {
    span: 24
  }
}

const Login = (props) => {
  // 创建一个 formRef 用于接收 FormUI 的 ref
  let formRef = useRef()
  const [loading, setLoading] = useState(false)
  const login = () => {
    formRef.current
      .submit()
      .then((formRes) => {
        // 校验通过, 开始登录
        setLoading(true)
        loginAPI(formRes)
          .then((res) => {
            setLoading(false)
            props.history.push({ pathname: '/' })
            message.success('登录成功')
          })
          .catch((err) => {
            setLoading(false)
            console.log('login', err, err.message)
          })
      })
      .catch((err) => {
        message.error('请输入用户名和密码')
      })
  }

  return (
    <div id='login'>
      <div className={'input-box'}>
        <div className={'content'}>
          <p>Hi，欢迎使用</p>
          <FormUI ref={formRef} formListData={formListData} layout={layout} />
          <Button type='primary' loading={loading} onClick={login} className={'login-btn'}>
            立即登录
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
