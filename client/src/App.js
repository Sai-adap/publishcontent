import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/login/login"
import Register from './components/register/register';
import Mainpage from './components/publisher/mainpage';
import Protected from './components/protected';
import Create from './components/publisher/create';
import History from './components/publisher/history';
import Comments from './components/publisher/comments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/mainpage' element={<Protected><Mainpage/></Protected>} ></Route>
        <Route path="/create" element={<Create/>} ></Route>
        <Route path="/history" element={<History/>} ></Route>
        <Route path="/comments" element={<Comments/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;