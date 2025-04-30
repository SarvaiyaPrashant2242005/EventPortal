import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Packages from './components/Packages';
import PackageForm from './components/PackageForm';
import Login from './components/Login';
import CompanySignup from './components/Signup';
import RequestsPage from './components/RequestsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/new" element={<PackageForm />} />
        <Route path="/signup" element={<CompanySignup/>}/>
        <Route path="/requests" element={<RequestsPage/>}/>
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App
