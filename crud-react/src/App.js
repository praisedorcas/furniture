//import logo from './logo.svg';

import { Route,Routes } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import AddFurniture from './components/furniture/addFurniture';
import AddExport from './components/exports/addExports';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/header/header';
import Nomatch from './components/nomatch/nomatch';
import GetFurniture from './components/getFurniture/getFurniture';
import GetExport from  './components/getExport/getExport';
import UpdateFurniture from './components/updateFuniture/updateFuniture';



function App() {
  return (
    <>
  <Header></Header>
<Routes>
  <Route path='/' element={<Dashboard></Dashboard>}> </Route>
  <Route path='/furniture' element={<AddFurniture/>}> </Route>
  <Route path='/export' element={<AddExport/>}> </Route>
  <Route path='/getFurniture' element={<GetFurniture></GetFurniture>}> </Route>
  <Route path='/getExport' element={<GetExport></GetExport>}> </Route>
  <Route path='/updateFuniture/:id' element={<UpdateFurniture></UpdateFurniture>}> </Route>
  <Route path='*' element={<Nomatch></Nomatch>}> </Route>
  </Routes>
    </>
  );
}

export default App;
