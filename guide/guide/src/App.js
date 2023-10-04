import './App.css'

const percentage = 100;

function App() {
  return (
    <div className="App">
      <div className="journey" style={{'--percentage': percentage}}>
        <div className="pie-wrapper">
          <div className="bg-pie">
          <div className="pie animate no-round" style={{'--percentage': percentage}} ></div>
          </div>
          
        </div>
        <h1>Guide One</h1>
        <p>Guide</p>
      </div>
    </div>
  )
}

export default App





