import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieView from './view/MovieView'
import { Layout } from 'antd'

function App() {

  return (
    <Layout className='min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/movie' element={<MovieView/> }/>
        </Routes>
    </BrowserRouter>
    </Layout>
  )
}

export default App
