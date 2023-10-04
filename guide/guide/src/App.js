import './App.css'

const percentage = 80;

function App() {
  return (
    <div className="App">
      <div className="journey" style={{'--percentage': percentage}}>
        <div className="pie animate no-round" style={{'--percentage': percentage}} ></div>
        <h1>Guide One</h1>
        <p>Guide</p>
      </div>
    </div>
  )
}

export default App





