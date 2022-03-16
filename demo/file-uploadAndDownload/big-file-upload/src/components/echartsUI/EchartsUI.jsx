import React, { Component } from 'react'
import * as echarts from 'echarts'
import './echartsUI.less'
import store from '@/store'

export default class EchartsUI extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.myChart = null
  }
  //初始化
  initCharts = () => {
    const { idName, options, width, height } = this.props
    const parent = document.getElementsByClassName('chart-parent')[0]
    const myChartId = document.getElementById(idName || 'myChart')

    const self = this
    setTimeout(() => {
      const parentWidth = parent.offsetWidth + 'px'
      const parentHeight = parent.offsetHeight + 'px'
      const childWi = width ? width + 'px' : parentWidth
      const childHi = height ? height + 'px' : parentHeight
      myChartId.style.width = childWi
      myChartId.style.height = childHi
      self.myChart = echarts.init(myChartId)
      self.myChart && self.myChart.setOption(options)
    })

    // 当页面大小发送变化和菜单收缩时重绘图表
    window.addEventListener('resize', function () {
      setTimeout(() => {
        self.resize(width, height)
      })
    })
    store.subscribe(() => {
      setTimeout(() => {
        self.resize(width, height)
      }, 200)
    })
  }
  // 重绘图表
  resize(width, height) {
    const parent = document.getElementsByClassName('chart-parent')[0]
    if (parent) {
      const parentWidth = parent.offsetWidth + 'px'
      const parentHeight = parent.offsetHeight + 'px'
      const childWi = width ? width + 'px' : parentWidth
      const childHi = height ? height + 'px' : parentHeight
      const opt = {
        width: childWi,
        height: childHi,
      }
      // console.log(opt)
      this.myChart && this.myChart.resize(opt)
    }
  }

  // props改变时重新设置options
  componentDidUpdate(prevProps, prevState) {
    this.myChart && this.myChart.setOption(this.props.options)
  }
  componentWillUnmount() {
    this.myChart && this.myChart.dispose()
    this.myChart = null
  }
  componentDidMount() {
    console.log('componentDidMount')
    this.initCharts()
  }
  render() {
    const { idName } = this.props
    return (
      <div className='chart-parent'>
        <div id={idName || 'myChart'} style={{ height: `${this.props.height}px` }}></div>
      </div>
    )
  }
}
