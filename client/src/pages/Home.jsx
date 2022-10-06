import React from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import LeftNav from "../components/LeftNav"
import Thread from '../components/Thread'
import NewPostForm from '../components/Post/NewPostForm'
import Log from '../components/Log'


const Home = () => {
  const uid = useContext(UidContext)
  return (
    <React.StrictMode>
      <div className='home'>
        <LeftNav />
        <h2>Home</h2>
          <div className='main'>
            <div className="home-header">
              {uid ? <NewPostForm /> : <Log login={true} signup={false} />}
            </div>
            <Thread />
          </div>
      </div>
      </React.StrictMode>  
  )
}

export default Home
