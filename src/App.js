import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateResume from './components/CreateResume';
import ViewAll from './components/ViewAll';
import EditResume from './components/EditResume';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CreateResume/>} />
        <Route path='/view' element={<ViewAll />} />
        <Route path='/edit' element={<EditResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
