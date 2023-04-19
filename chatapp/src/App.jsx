

import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Join from './component/join/join';
import Chat from './component/join/chat';

import "./style/join.scss"
import "./style/app.scss"

function App() {

  return (
     <Router>
      <Routes>
        <Route path='/' element={<Join/>}  />
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
     </Router>
   
  );
}

export default App;
