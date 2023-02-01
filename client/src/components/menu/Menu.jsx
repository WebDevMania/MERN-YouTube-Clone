import React, { useContext } from 'react'
import classes from './menu.module.css'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutLinedIcon from '@mui/icons-material/ExploreOutlined'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HdIcon from '@mui/icons-material/Hd';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom'
import { StateCtx } from '../../ctx/State'
import { useSelector } from 'react-redux'

const Menu = () => {
  const { showSidebar } = useContext(StateCtx)
  const { user } = useSelector((state) => state.auth)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {showSidebar ? (
          <div className={classes.toggledWrapper}>
            <div className={classes.toggledItem}>
              <HomeIcon /> <span>Home</span>
            </div>
            <div className={classes.toggledItem}>
              <ExploreOutLinedIcon /> <span>Explore</span>
            </div>
            <div className={classes.toggledItem}>
              <SubscriptionsOutlinedIcon /> <span>Subcriptions</span>
            </div>
            <div className={classes.toggledItem}>
              <VideoLibraryOutlinedIcon /> <span>Library</span>
            </div>
          </div>
        ) : (
          <>
            <div className={classes.item}>
              <HomeIcon /> <span>Home</span>
            </div>
            <div className={classes.item}>
              <ExploreOutLinedIcon /> <span>Explore</span>
            </div>
            <div className={classes.item}>
              <SubscriptionsOutlinedIcon /> <span>Subcriptions</span>
            </div>
            <div className={classes.item}>
              <VideoLibraryOutlinedIcon /> <span>Library</span>
            </div>
            <div className={classes.item}>
              <HistoryOutlinedIcon /> <span>History</span>
            </div>
            {!user && <>
              <hr className={classes.hr} />
              <div className={classes.signIn}>
                <span className={classes.signInText}>
                  Sign in to like videos, comment and subscribe.
                </span>
                <Link to='/auth' className={classes.signInContainer}>
                  <AccountCircleOutlinedIcon className={classes.emoji} />
                  <span>SIGN IN</span>
                </Link>
              </div>
            </>
            }
            <hr className={classes.hr} />
            <h3 className={classes.heading}>BEST OF OUR PLATFORM</h3>
            <div className={classes.item}>
              <LibraryMusicOutlinedIcon /> <span>Music</span>
            </div>
            <div className={classes.item}>
              <SportsBasketballOutlinedIcon /> <span>Sports</span>
            </div>
            <div className={classes.item}>
              <SportsEsportsOutlinedIcon /> <span>Gaming</span>
            </div>
            <div className={classes.item}>
              <SchoolIcon /> <span>Educational</span>
            </div>
            <div className={classes.item}>
              <HdIcon /> <span>Films</span>
            </div>
            <div className={classes.item}>
              <NewspaperIcon /> <span>News</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Menu