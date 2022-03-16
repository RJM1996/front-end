/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, memo, useMemo, useCallback, useLayoutEffect, useImperativeHandle } from 'react'


export default function Example() {
  const [count, setCount] = useState(0)

  // 类似于componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 更新文档的标题
    console.log('useEffect', count)
    // document.title = `You clicked ${count} times`
  }, [count])

  return (
    <div>
      <div className='g-content'>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <button onClick={() => setCount(count)}>Click me too</button>
      </div>
      {/* 
      <Counter />
      <Counter1 />
      <Counter2 />
      <Counter3 />
      <Counter4 />
      <Counter5 number={2} />
      <Counter6 /> 
      <Counter7 />
      <LayoutEffect />
      <Parent />
      <Parent1 />
      <div className='g-content'>
        <Number1 />
        <Number2 />
      </div>
      */}
    </div>
  )
}

function useNumber() {
  let [number, setNumber] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setNumber((number) => number + 1)
    }, 1000)
  }, [])
  return [number, setNumber]
}
// 每个组件调用同一个 hook，只是复用 hook 的状态逻辑，并不会共用一个状态
function Number1() {
  let [number, setNumber] = useNumber()
  return (
    <div>
      <button
        onClick={() => {
          setNumber(number + 1)
        }}>
        {number}
      </button>
    </div>
  )
}
function Number2() {
  let [number, setNumber] = useNumber()
  return (
    <div>
      <button
        onClick={() => {
          setNumber(number + 1)
        }}>
        {number}
      </button>
    </div>
  )
}

function Child1(props, parentRef) {
  // 子组件内部自己创建 ref
  let focusRef = useRef()
  let inputRef = useRef()
  useImperativeHandle(parentRef, () => {
    return {
      focusRef,
      inputRef,
      hello: () => {
        console.log('hello')
      }
    }
  })
  return (
    <div>
      <span>inputRef: </span>
      <input type='text' ref={inputRef} />
      <br />
      <span>focusRef: </span>
      <input type='text' ref={focusRef} />
    </div>
  )
}
const ForwardRefChild1 = React.forwardRef(Child1)
function Parent1() {
  let [number, setNumber] = useState(0)
  // 在使用类组件的时候，创建 ref 返回一个对象，该对象的 current 属性值为空
  // 只有当它被赋给某个元素的 ref 属性时，才会有值
  // 所以父组件（类组件）创建一个 ref 对象，然后传递给子组件（类组件），子组件内部有元素使用了
  // 那么父组件就可以操作子组件中的某个元素
  // 但是函数组件无法接收 ref 属性 <Child ref={xxx} /> 这样是不行的
  // 所以就需要用到 forwardRef 进行转发
  const parentRef = useRef() //{current:''}
  function getFocus() {
    console.log(parentRef.current)
    const { inputRef, focusRef, hello } = parentRef.current
    focusRef.current.focus()
    inputRef.current.value = 'hello'
    hello()
  }
  return (
    <div className='g-content'>
      <ForwardRefChild1 ref={parentRef} />
      <button onClick={() => setNumber({ number: number + 1 })}>+</button>
      <button onClick={getFocus}>获得焦点</button>
    </div>
  )
}

function Parent() {
  let [number, setNumber] = useState(0)
  return (
    <div className='g-content'>
      <Child number={number} />
      <button onClick={() => setNumber((number) => number + 1)}>+</button>
    </div>
  )
}
let input
function Child(props) {
  const inputRef = useRef()
  console.log('input===inputRef', input === inputRef)
  input = inputRef
  function getFocus() {
    inputRef.current.focus()
    inputRef.current.value = props.number
  }
  return (
    <div className='g-content'>
      <span>number: {props.number}</span>
      <input type='text' ref={inputRef} />
      <button onClick={getFocus}>获得焦点</button>
    </div>
  )
}

function LayoutEffect() {
  const [color, setColor] = useState('lightcoral')
  useLayoutEffect(() => {
    alert(color)
  })
  useEffect(() => {
    console.log('color', color)
  })
  return (
    <div className='g-content'>
      <div id='myDiv' style={{ background: color }}>
        颜色
      </div>
      <button onClick={() => setColor('lightcoral')}>红</button>
      <button onClick={() => setColor('lightyellow')}>黄</button>
      <button onClick={() => setColor('lightblue')}>蓝</button>
    </div>
  )
}

function Counter2() {
  let [number, setNumber] = useState(0)
  function alertNumber() {
    setTimeout(() => {
      // alert 只能获取到点击按钮时的那个状态
      alert(number)
    }, 500)
  }
  return (
    <div className='g-content'>
      <p>number: {number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={alertNumber}>alertNumber</button>
    </div>
  )
}

function Counter() {
  let [number, setNumber] = useState(0)
  function lazy() {
    setTimeout(() => {
      // setNumber(number+1);
      // 这样每次执行时都会去获取一遍 state，而不是使用点击触发时的那个 state
      setNumber((number) => number + 1)
    }, 300)
  }
  return (
    <div className='g-content'>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={lazy}>lazy</button>
    </div>
  )
}

function Counter5(props) {
  console.log('Counter5 render')
  // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
  function getInitState() {
    console.log('getInitState')
    return { number: props.number }
  }
  let [counter, setCounter] = useState(getInitState)
  return (
    <div className='g-content'>
      <p>number: {counter.number}</p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>+</button>
      <button onClick={() => setCounter(counter)}>setCounter</button>
    </div>
  )
}

function Counter1() {
  const [counter, setCounter] = useState({ name: '计数器', number: 0 })
  console.log('render Counter1')
  // 如果你修改状态的时候，传的状态值没有变化，则不重新渲染
  return (
    <div className='g-content'>
      <p>
        {counter.name}:{counter.number}
      </p>
      <button onClick={() => setCounter({ ...counter, number: counter.number + 1 })}>+</button>
      <button onClick={() => setCounter(counter)}>++</button>
    </div>
  )
}

function SubCounter({ onClick, data }) {
  console.log('SubCounter render')
  return <button onClick={onClick}>{data.number}</button>
}
const SubCounterMemo = memo(SubCounter)

function Counter6() {
  console.log('Counter6 render')
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(0)
  const data = { number }
  const addClick = () => {
    setNumber(number + 1)
  }
  return (
    <div className='g-content'>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <SubCounterMemo data={data} onClick={addClick} />
    </div>
  )
}

let oldData, oldAddClick
function Counter3() {
  console.log('Counter render')
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(0)
  // 父组件更新时，这里的变量和函数每次都会重新创建，那么子组件接受到的属性每次都会认为是新的
  // 所以子组件也会随之更新，这时候可以用到 useMemo
  // 有没有后面的依赖项数组很重要，否则还是会重新渲染
  // 如果后面的依赖项数组没有值的话，即使父组件的 number 值改变了，子组件也不会去更新
  // const data = useMemo(()=>({number}),[]);
  const data = useMemo(() => ({ number }), [number])
  console.log('data===oldData ', data === oldData)
  oldData = data

  // 有没有后面的依赖项数组很重要，否则还是会重新渲染
  const addClick = useCallback(() => {
    setNumber(number + 1)
  }, [number])
  console.log('addClick===oldAddClick ', addClick === oldAddClick)
  oldAddClick = addClick
  return (
    <div className='g-content'>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <SubCounterMemo data={data} onClick={addClick} />
    </div>
  )
}

function Counter4() {
  let [number, setNumber] = useState(0)
  let [text, setText] = useState('')
  // 相当于componentDidMount 和 componentDidUpdate
  useEffect(() => {
    let $timer = setInterval(() => {
      setNumber((number) => number + 1)
    }, 1000)
    console.log('开启一个新的定时器', $timer)
    // useEffect 如果返回一个函数的话，该函数会在组件卸载和更新时调用
    // useEffect 在执行副作用函数之前，会先调用上一次返回的函数
    // 如果要清除副作用，要么返回一个清除副作用的函数
    return () => {
      console.log('destroy effect')
      clearInterval($timer)
    }
  })
  // }, []) //要么在这里传入一个空的依赖项数组，这样就不会去重复执行
  return (
    <div className='g-content'>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      <p>{number}</p>
      <button>+</button>
    </div>
  )
}

function Counter7() {
  let [number, setNumber] = useState(0)
  let [text, setText] = useState('')
  // 相当于componentDidMount 和 componentDidUpdate
  useEffect(() => {
    let $timer = setInterval(() => {
      setNumber((number) => number + 1)
    }, 1000)
    console.log('useEffect', $timer)
  }, [text]) // 数组表示 effect 依赖的变量，只有当这个变量发生改变之后才会重新执行 efffect 函数
  return (
    <div className='g-content'>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      <p>{number}</p>
      <button>+</button>
    </div>
  )
}
