import React from 'react'
import { Card, Row, Col, Select, Tooltip, Spin } from 'antd'
import RateCircle from './RateCircle'
import { InfoCircleOutlined } from '@ant-design/icons'
import caseAmount from '../../assets/img/立案总金额.png'
import caseTotal from '../../assets/img/案件总数量.png'
import mediators from '../../assets/img/调解人员.png'
import applicantNum from '../../assets/img/申请人数量.png'
import totalAmountSettlement from '../../assets/img/结案总金额.png'

const InfoCardGroup = (props) => {
  const { list, onSelect } = props
  if (list.length) {
    return (
      <Row gutter={[32, 32]}>
        {list.map((li) => {
          return (
            <Col key={li.keyName} span={6}>
              <InfoCard {...li} onSelect={onSelect}></InfoCard>
            </Col>
          )
        })}
      </Row>
    )
  }
  return <Spin></Spin>
}

const InfoCard = (props) => {
  const { keyName, title, type, content, applicant, tip, onSelect } = props
  const circle = {
    width: 80,
    r: 35
  }
  const applicantChange = (keyName, value, options) => {
    onSelect && onSelect(keyName, value, options)
  }
  const iconMap = {
    sumFilingAmount: caseAmount,
    countCase: caseTotal,
    countUserValid: mediators,
    countApplyValid: applicantNum,
    sumClosedAmount: totalAmountSettlement
  }
  return (
    <Card>
      {type === 'pieChart' ? (
        <>
          <div className='rate-content'>
            <div>
              {title}
              {tip && (
                <Tooltip title={tip}>
                  <InfoCircleOutlined style={{ marginLeft: '10px' }} />
                </Tooltip>
              )}
            </div>
            <div className={'percentage'}>{content + '%'}</div>
          </div>
          <div className='rate-chart'>
            <RateCircle {...circle} percent={content}></RateCircle>
          </div>
        </>
      ) : (
        <>
          <div className='icon'>
            <img src={iconMap[keyName]} alt='1' style={{ width: '64px' }} />
          </div>
          <div className={`content ${!applicant && 'no-select'}`}>
            <div>
              <div style={{ display: 'inline-block' }}>{title}</div>
              {applicant && (
                <div className='applicant-select'>
                  <Select
                    defaultValue={-1} // -1代表全部
                    style={{ width: 90 }}
                    bordered={false}
                    dropdownMatchSelectWidth={false}
                    onSelect={(value, options) => {
                      applicantChange(keyName, value, options)
                    }}>
                    {applicant.map((opt) => {
                      return (
                        <Select.Option key={opt.value} value={opt.value}>
                          {opt.label}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </div>
              )}
            </div>
            {content &&
              content.map((item) => (
                <div key={item.num}>
                  {item.label ? (
                    <>
                      <span>{item.label + '：'}</span>
                      <span>{item.num}</span>
                    </>
                  ) : (
                    <span className={'bold-num'}>{item.num}</span>
                  )}
                  <span>{item.unit}</span>
                </div>
              ))}
          </div>
        </>
      )}
    </Card>
  )
}

export default InfoCardGroup
