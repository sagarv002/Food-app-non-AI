
import { BrowserRouter  as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';

// import Page from "./test/page"

// import"./test.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
      
{/* 
       <Page/> */}
    </div>
  );
}

export default App;
