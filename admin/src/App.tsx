import {Routes, Route} from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
function App() {
  return (
   <>
   <Navbar />
   <Routes>
    <Route path='/' element={<Home />} />
   </Routes>
   </>
  );
}

export default App;
