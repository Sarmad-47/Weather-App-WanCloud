import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import SearchWeather from './pages/SearchWeather';
import ShowWeather from './pages/ShowWeather';
import { useStateContext } from './contexts/ContextProvider';
const App = () => {
  const { activeMenu } = useStateContext();
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          {activeMenu && <Sidebar />}
          <div className="flex-grow">
            <Routes>
            <Route path="/" element={<ShowWeather/>} />
            <Route path="/show-weather" element={<ShowWeather/>} />
              <Route path="/search-weather" element={<SearchWeather />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
