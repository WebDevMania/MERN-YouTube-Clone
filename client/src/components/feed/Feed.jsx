import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StateCtx } from '../../ctx/State'
import Card from '../card/Card'
import classes from './feed.module.css'

const Feed = () => {
  const [videos, setVideos] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])
  const { token } = useSelector((state) => state.auth)
  const { search } = useContext(StateCtx)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/video/findAll`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        setVideos(data)
        setFilteredVideos(data)
      } catch (error) {
        console.log(error)
      }
    }
    token && fetchVideos()
  }, [])

  useEffect(() => {
    setFilteredVideos(videos)

    setFilteredVideos((prev) => {
      const filteredArr = prev.filter((video) => {
         return video.title.includes(search) || video.categories.includes(search)
      })
      return filteredArr
    })

  }, [search])

  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        {filteredVideos?.length > 0 ? filteredVideos?.map((video) => (
          <Card key={video._id} video={video} />
        )) : <h1 style={{ textAlign: 'center' }}>No videos yet. Upload one!</h1>}
      </div>
    </div>
  )
}

export default Feed