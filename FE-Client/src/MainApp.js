import {Routes, Route} from 'react-router-dom'
import Mainpage from './components/Mainpage';
import App from "./App"


const MainApp = () => {
  return (
        <Routes>
            <Route path="/" element={<Mainpage/>}/>
            <Route path="/SignIn" element={<Mainpage/>}/>
            <Route path="/SignUp" element={<Mainpage/>}/>
            <Route path="*" element={<App />} />
         </Routes>
  )
}

export default MainApp