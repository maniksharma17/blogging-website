import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import './App.css'
import BlogsDashboard from './pages/Blogs'
import { CreatePage } from './pages/Create'
import { Profile } from './pages/Profile'
import BlogPage from './pages/BlogPage'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup></Signup>}/>
            <Route path="/" element={<Signin></Signin>}/>
            <Route path='/blogs' element={<BlogsDashboard></BlogsDashboard>}/>
            <Route path='/create' element={<CreatePage></CreatePage>}/>
            <Route path='/profile' element={<Profile></Profile>}/>
            <Route path='/read' element={<BlogPage></BlogPage>}></Route>
          </Routes>
        </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
