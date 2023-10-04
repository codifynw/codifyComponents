import './App.css'

const generateCircularProgress = (percentage) => {
  if (percentage < 0 || percentage > 100) {
    return
  }
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference
  return `radial-gradient(circle at center, #f5f5f5 50%, transparent 50%), radial-gradient(circle at center, #f5f5f5 50%, #f5f5f5 50%)`
}

function App() {
  return (
    <div className="App">
      <div className="journey">
        {/* <div className="circle-border" style={{ background: generateCircularProgress(10) }}>
          <div className="journey-progress-indicator"></div>
        </div> */}
        <div className="pie animate no-round" style={{'--percentage': 50}} ></div>
        <h1>Guide One</h1>
        <p>Guide</p>
      </div>
    </div>
  )
}

export default App





