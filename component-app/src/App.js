import logo from './logo.svg'
import './App.css'
import { GalleryGrid } from './lib/components'

const items = [
  { title: 'new' },
  { title: 'favorite' },
  { title: 'dry' },
  { title: 'wet' },
  { title: 'summer' },
  { title: 'longer title' },
  { title: 'winter' },
  { title: 'another long' },
]

function App() {
  return (
    <div className="App">
      <GalleryGrid items={items}></GalleryGrid>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
