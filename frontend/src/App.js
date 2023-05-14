
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './components/RegisterPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='register' element={<RegisterPage></RegisterPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
