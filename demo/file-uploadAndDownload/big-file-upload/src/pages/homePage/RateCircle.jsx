import React from 'react'
import PropTypes from 'prop-types'

// 自定义百分比圆环
const RateCircle = (props) => {
  const { width, r, percent } = props
  // 计算圆环长度(百分比)
  const getRingPercent = (percent, r) => {
    let perimeter = Math.PI * 2 * r //周长
    const strokeDasharray = (percent / 100) * perimeter + ' ' + perimeter
    return strokeDasharray
  }
  const strokeWidth = 10
  return (
    <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
      <circle cx={width / 2} cy={width / 2} r={r} strokeWidth={strokeWidth} stroke='#f0f0f0' fill='none'></circle>
      {percent !== 0 && (
        <circle
          cx={width / 2}
          cy={width / 2}
          r={r}
          strokeWidth={strokeWidth}
          stroke='#3D8AFF'
          fill='none'
          strokeLinecap='round'
          transform={`matrix(0,-1,1,0,0,${width})`}
          strokeDasharray={getRingPercent(percent, r)}></circle>
      )}
    </svg>
  )
}
RateCircle.propTypes = {
  width: PropTypes.number,
  r: PropTypes.number,
  percent: PropTypes.number
}
RateCircle.defaultProps = {
  width: 120,
  r: 30,
  percent: 80
}
export default RateCircle
