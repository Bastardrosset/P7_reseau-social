import React from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import LeftNav from "../components/LeftNav"
import Thread from '../components/Thread'
import NewPostForm from '../components/Post/NewPostForm'
import Auth from '../components/Auth'


const Home = () => {
  const uid = useContext(UidContext)
  return (
    <React.StrictMode>
      <div className='home'>
        <LeftNav />
          <div className='main'>
            <h2>Home</h2>
            <div className="home-header">
              {uid ? <NewPostForm /> : <Auth login={true} signup={false} />}
            </div>
            <Thread />
          </div>
      </div>
      </React.StrictMode>  
  )
}

export default Home
