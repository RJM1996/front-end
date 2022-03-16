import './style/homePage.less'
import React, { Component } from 'react'
import EchartsUI from '@/components/echartsUI/EchartsUI.jsx'
import InfoCardGroup from './InfoCardGroup'
import ChartSearchUI from './ChartSearchUI'
import { Card, Row, Col, Divider, Badge, Space, Skeleton, message, Empty } from 'antd'
import { lineChart, pieChart, statusSearchFormList, amountSearchFormList } from './data/homePage'
import { getDate } from '@/common/util'
import {
  getApplicantList,
  getCardInfoList,
  getOneCardInfo,
  getCaseStatus,
  getCaseAmount
} from '../../store/modules/homePage/homePage.store'
import moment from 'moment'

const color = ['#3D8AFF', '#1BC1AD', '#F5AC48', '#FF514D', '#FF874F', '#747FFF']
const defaultStatusQuery = {
  applicant: -1, // -1代表全部
  frequency: 'day',
  quickRange: 'week',
  statusDateRange: [getDate(7), getDate(1)]
}
const defaultAmountQuery = {
  amountDateRange: [getDate(7), getDate(1)],
  totalAmount: 'open'
}

class EchartsDemo extends Component {
  state = {
    cardList: [],
    lineChart: lineChart,
    pieChart: pieChart,
    totalAmount: '0',
    amountType: 'open',
    applicantAmountList: [],
    // 案件状态统计的搜索框
    statusSearchFormList: statusSearchFormList,
    // 案件金额统计的搜索框
    amountSearchFormList: amountSearchFormList
  }
  tmpCardList = [] // 临时存储 cardList

  _getCardInfoList = () => {
    getCardInfoList({})
      .then((res) => {
        this.tmpCardList = res
        this._getApplicantList()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  _getApplicantList = () => {
    getApplicantList({})
      .then((res) => {
        const list = res['applicant'] || []
        this.updateCardList(list)
        this.setApplicantSelectList(list)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  _getOneCardInfo = (req = {}) => {
    getOneCardInfo(req)
      .then((res) => {
        const name = res.keyName
        this.setState(({ cardList }) =>
          cardList.map((item) => {
            if (item.keyName === name) {
              item.content = res.content
            }
            return item
          })
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }
  _getCaseStatus = (req = {}) => {
    req = {
      ...defaultStatusQuery,
      ...req
    }
    if (req.quickRange !== 'custom') {
      req.statusDateRange = this.getDefaultValue(req.quickRange)
    }
    getCaseStatus(req)
      .then((res) => {
        const tmpLine = JSON.parse(JSON.stringify(lineChart))
        tmpLine.xAxis.data = res.xAxisData
        tmpLine.series = res.series
        this.setState({
          lineChart: tmpLine
        })
      })
      .catch((err) => {
        message.error(err || '获取数据失败')
      })
  }
  _getCaseAmount = (req = {}) => {
    // 设置默认查询条件
    req = {
      ...defaultAmountQuery,
      ...req
    }
    getCaseAmount(req)
      .then((res) => {
        console.log(res)
        const tmpPie = JSON.parse(JSON.stringify(pieChart))
        const tmpSeries = res.series.map((item) => {
          const newItem = {
            name: item.orgName,
            value: item.amount,
            percent: item.percent
          }
          return newItem
        })
        tmpPie.series[0].data = tmpSeries
        this.setState({
          pieChart: tmpPie,
          totalAmount: res.totalAmount || 0,
          applicantAmountList: tmpSeries || [],
          amountType: req.totalAmount
        })
      })
      .catch((err) => {
        message.error(err || '获取数据失败')
      })
  }

  // 设置案件状态统计中的申请人下拉列表
  setApplicantSelectList(res) {
    const statusSearchFormList = this.state.statusSearchFormList.map((item) => {
      if (item.name === 'applicant') {
        item.children = [].concat({ label: '全部', value: -1 }, res)
      }
      return item
    })
    this.setState({
      statusSearchFormList: statusSearchFormList
    })
  }
  // 更新卡片列表, 设置申请人下拉列表, 设置模块类型, tip展示等等
  updateCardList(res) {
    this.tmpCardList.forEach((item) => {
      // 前两项增加申请人下拉列表
      if (item.keyName === 'sumFilingAmount' || item.keyName === 'countCase') {
        item.applicant = [].concat({ label: '全部', value: -1 }, res)
      }
      // 后三项设置类型为pieChart
      if (['ratioPaybackAmount', 'ratioClosedCase', 'ratioWithdrawnCase'].includes(item.keyName)) {
        item.type = 'pieChart'
        // 结案比例增加tip
        if (item.keyName === 'ratioClosedCase') {
          item.tip = '结案包括：纠纷处理达成一致、纠纷处理未达成一致、调解期到期三种情况'
        }
      }
    })
    this.setState({
      cardList: this.tmpCardList
    })
  }
  // 近一周,近一月...对应的日期范围
  getDefaultValue(key, customDate) {
    const map = {
      week: [getDate(7), getDate(1)],
      month: [getDate(30), getDate(1)],
      quarterly: [getDate(90), getDate(1)],
      halfYear: [getDate(180), getDate(1)],
      custom: customDate || [getDate(7), getDate(1)]
    }
    return map[key]
  }
  getDisabledDate(current, frequency) {
    if (!current) return false
    // 统计维度选日，自定义时间范围不能超过半年；
    // 统计维度选周，自定义时间范围不能超过两年；
    // 统计维度选月，自定义时间范围不能超过五年
    const map = {
      day: current < moment().subtract(180, 'days') || current > moment().subtract(1, 'days').endOf('day'),
      week: current < moment().subtract(720, 'days') || current > moment().subtract(1, 'days').endOf('day'),
      month: current < moment().subtract(1800, 'days') || current > moment().subtract(1, 'days').endOf('day')
    }
    return map[frequency]
  }

  onApplicantChange = (keyName, value, options) => {
    console.log(keyName, value)
    const req = {
      type: keyName,
      applicant: +value
    }
    this._getOneCardInfo(req)
  }
  // 筛选条件改变
  onSearchChange = (data, type) => {
    console.log(type, data)

    if (type === 'status') {
      const formList = this.state.statusSearchFormList
      formList.forEach((item) => {
        item.defaultValue = data[item.name]
        if (item.type === 'dateRange') {
          item.defaultValue = this.getDefaultValue(data.quickRange, data[item.name])
          item.disabled = data.quickRange !== 'custom'
          item.disabledDate = (current) => this.getDisabledDate(current, data.frequency)
        }
      })
      this.setState({
        statusSearchFormList: formList
      })
      const req = {
        ...data,
        applicant: +data.applicant
      }
      this._getCaseStatus(req)
    }
    if (type === 'amount') {
      const formList = this.state.amountSearchFormList
      formList.forEach((item) => {
        item.defaultValue = data[item.name]
      })
      this.setState({
        amountSearchFormList: formList
      })
      const req = {
        ...data
      }
      this._getCaseAmount(req)
    }
  }

  componentDidMount() {
    this._getCardInfoList()
    this._getCaseStatus()
    this._getCaseAmount()
  }
  render() {
    return (
      <div className={'g-content'} style={{ minWidth: '1400px' }}>
        {/* 上方 8 个卡片 */}
        <div className='case-info-card'>
          {this.state.cardList.length ? (
            <InfoCardGroup list={this.state.cardList} onSelect={this.onApplicantChange}></InfoCardGroup>
          ) : (
            <Skeleton active />
          )}
        </div>
        {/* 案件状态统计和案件金额统计 */}
        <div className={'case-info-chart'}>
          <Row gutter={[32, 32]}>
            {/* 案件状态统计 */}
            <Col span={12}>
              <Card className={'status-count'}>
                <h1>案件状态统计</h1>
                <Divider style={{ margin: '10px 0' }} />
                <ChartSearchUI
                  formList={this.state.statusSearchFormList}
                  onChange={(data) => {
                    this.onSearchChange(data, 'status')
                  }}></ChartSearchUI>
                {this.state.lineChart.xAxis.data.length > 0 ? (
                  <EchartsUI idName='statusChart' options={this.state.lineChart} height={400}></EchartsUI>
                ) : (
                  <Empty style={{ margin: '120px auto' }}></Empty>
                )}
              </Card>
            </Col>
            {/* 案件金额统计 */}
            <Col span={12}>
              <Card className={'amount-count'}>
                <h1>案件金额统计</h1>
                <Divider style={{ margin: '10px 0' }} />
                <ChartSearchUI
                  formList={this.state.amountSearchFormList}
                  onChange={(data) => {
                    this.onSearchChange(data, 'amount')
                  }}></ChartSearchUI>
                {this.state.applicantAmountList.length !== 0 ? (
                  <div style={{ display: 'flex', marginTop: '60px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <EchartsUI
                        idName='amountChart'
                        options={this.state.pieChart}
                        width={300}
                        height={300}></EchartsUI>
                      <div className='inner-title'>
                        <div>{this.state.amountType === 'open' ? '立案总金额' : '结案总金额'}</div>
                        <div style={{ fontSize: '22px' }}>¥ {this.state.totalAmount}</div>
                      </div>
                    </div>
                    <div className={'applicant-amount'} style={{ flex: 1, margin: 'auto' }}>
                      {this.state.applicantAmountList.map((row, index) => (
                        <Space
                          key={row.name}
                          size={10}
                          split={<Divider type='vertical' />}
                          style={{ margin: '10px 0' }}>
                          <Badge style={{ width: '100px' }} color={color[index]} text={row.name} />
                          <span style={{ display: 'inline-block', width: '30px' }}>{row.percent}%</span>
                          <span>¥ {this.formatAmount(row.value)}</span>
                        </Space>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Empty style={{ margin: '120px auto' }}></Empty>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  formatAmount = (value) => {
    // 数值大于千万单位转为万元
    let param = {}
    let k = 10000,
      sizes = ['元', '万元', '亿', '万亿'],
      i
    if (value < k) {
      value = value % 10 ? value : value + '.00'
      param.value = value
      param.unit = '元'
    } else {
      i = Math.floor(Math.log(value) / Math.log(k))
      param.value = (value / Math.pow(k, i)).toFixed(2)
      param.unit = sizes[i]
    }
    return param.value + param.unit
  }
}

export default EchartsDemo
