const { useEffect, useRef, useState, useLayoutEffect } = React

// simulate loading data from a server
function fetchFakeData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, color: 'blue' },
        { id: 2, color: 'red' },
        { id: 3, color: 'purple' },
      ])
    }, 2000)
  })
}

function Box({ children, color }) {
  return <div className={`box ${color}`}>{children}</div>
}

function App() {
  const el = useRef()
  const q = gsap.utils.selector(el)

  const [data, setData] = useState([])
  const [loadingState, setLoadingState] = useState()

  useEffect(() => {
    if (loadingState !== 'start') return

    const loadData = async () => {
      const data = await fetchFakeData()
      setData(data)
      setLoadingState('complete')
    }
    loadData()
  }, [loadingState])

  useLayoutEffect(() => {
    if (loadingState !== 'complete') return

    gsap.fromTo(
      q('.box'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      }
    )
  }, [loadingState])

  const startLoading = () => {
    if (!loadingState) {
      setLoadingState('start')
    }
  }

  return (
    <div className="panel flex-row" ref={el}>
      {!loadingState ? (
        <div>
          <button onClick={startLoading}>Start Loading</button>
        </div>
      ) : null}
      {loadingState === 'start' ? <div className="loading">Loading fake data...</div> : null}
      {data.map((item) => (
        <Box key={item.id} {...item}>
          Box {item.id}
        </Box>
      ))}
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
