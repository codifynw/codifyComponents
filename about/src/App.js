import "./App.css";
import bg from './logo-bg-10.png';
import MM from "./miles.png";
import HM from "./hank.png";
import TY from "./thanks.png";
import { aboutText } from "./data/aboutText";

function App() {
  return (
    <div className="about-page" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: '75%',
      backgroundRepeat: 'repeat-y',
      backgroundPosition: '33% -15%',
    }}>
      <div className="about-page-content">
        <section className="about-section">
          <div className="image-section">
            <img src={MM} alt="A portrait of Miles Morgan" />
          </div>
          <div className="text-section">
            <div className="text-container">
              <h2>Miles Morgan Photography</h2>
              <p>{aboutText.primary}</p>
            </div>
          </div>
        </section>
        <section className="about-section reverse">
          <div className="about-section-image">
            <img src={HM} alt="A portrait of Hank Morgan" />
          </div>
          <div className="about-section-text">
            <div className="text-container">
              <h2>A Legacy to Capture</h2>
              <p>{aboutText.father}</p>
            </div>
          </div>
        </section>
        <section className="about-section final">
          <div className="image-section">
            <img src={TY} alt="A photo of Miles and his wife" />
          </div>
          <div className="text-section absolute">
            <div className="text-container">
              <h2>Thank You</h2>
              <p>{aboutText.thank}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
