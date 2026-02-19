import { useState } from "react";
import "./App.css";
import Feed from "./components/Feed";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <h1 className="text-3xl font-bold">Hello World</h1> */}
      </Provider>
    </>
  );
}

export default App;
