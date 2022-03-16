import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'

const defaultConfig = {
  okText: '确定',
  keyboard: false
}

class ModalUI extends Component {
  static success = function (config) {
    Modal.success({
      ...defaultConfig,
      ...config
    })
  }
  static warn = function (config) {
    Modal.warn({
      ...defaultConfig,
      ...config
    })
  }
  static info = function (config) {
    Modal.info({
      ...defaultConfig,
      ...config
    })
  }
  static error = function (config) {
    Modal.error({
      ...defaultConfig,
      ...config
    })
  }
  render() {
    const { title, okText, visible, hideCancel, handleOk, handleCancel, ...rest } = this.props
    let footer = [
      <Button key='cancel' onClick={handleCancel}>
        取消
      </Button>,
      <Button key='submit' type='primary' onClick={handleOk}>
        {okText || '确定'}
      </Button>
    ]
    if (hideCancel) {
      footer = footer.slice(1, 2)
    }
    return (
      <Modal
        title={title || '提示'}
        destroyOnClose
        keyboard={false}
        maskClosable={false}
        visible={visible}
        onCancel={handleCancel}
        footer={footer}
        {...rest}>
        {this.props.children}
      </Modal>
    )
  }
}
// 定义props的类型
ModalUI.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  hideCancel: PropTypes.bool,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
}

export default ModalUI
