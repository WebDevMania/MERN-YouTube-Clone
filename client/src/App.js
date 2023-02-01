import Navbar from "./components/navbar/Navbar";
import './app.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Upload from "./components/upload/Upload";
import VideoDetail from "./components/videoDetail/VideoDetail";
import Menu from "./components/menu/Menu";
import { useEffect } from "react";

function App() {
  const location = useLocation().pathname
  
  useEffect(() => {
     window.scrollTo(0, 0)
  }, [location])

  return (
    <div>
      <Navbar />
      <main style={{display: 'flex'}}>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/videoDetail/:id' element={<VideoDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
