import PostComponent from "./components/Post/postComponent.jsx";
import "./App.css"
import {AlertLink, TabContent, Table} from "react-bootstrap";
import NavbarComponent from "./components/Navbar/navbarComponent.jsx";
function App() {

  return (
      <>
          <NavbarComponent/>
    <div className="feed">
        <PostComponent lastSeen="1h fa" profileName="Piermenti Sfracellozzi" description="“Vibrazioni del momento, niente di programmato 🌙✨ #mooddelgiorno #solocosebelle”" imgSrc="src/assets/football.png" />
        <PostComponent lastSeen="1h fa" profileName="Piermenti Sfracellozzi" description="“Vibrazioni del momento, niente di programmato 🌙✨ #mooddelgiorno #solocosebelle”" imgSrc="src/assets/prova.jpg" />
    </div>
      </>
  )
}

export default App
