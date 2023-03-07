import Home from './components/Home.js'
import Views from './components/Views.js'
import Edit from './components/Edit.js'
import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/view/:id' element={<Views/>}></Route>
        <Route exact path='/edit/:id' element={<Edit/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
} 

export default App;
