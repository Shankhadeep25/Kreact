import { useState } from 'react'
import './App.css'
import NavBar from './NavBar';
import Body from './Body';
import {BrowserRouter,
  Route,Routes
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<div>login Page</div>}/>
            <Route path="/test" element={<div>test Page</div>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <h1 className="text-3xl font-bold">Hello World</h1> */}
    </>
  );
}

export default App
