import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './navbar.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from "@mui/icons-material/Search"
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'
import { useDispatch, useSelector } from 'react-redux'
import { StateCtx } from '../../ctx/State'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const { setShowSidebar, search, setSearch } = useContext(StateCtx)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth')
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.leftSide}>
          <MenuIcon onClick={toggleSidebar} className={classes.menuIcon} />
          <Link to='/'>
            <h3>
              WebDevMania
            </h3>
          </Link>
        </div>
        <div className={classes.centerSide}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' />
          <SearchIcon className={classes.searchIcon} />
        </div>
        {user ? <>
          <div className={classes.rightSide}>
          <span onClick={handleLogout}>Logout</span>
            <Link to='/upload'>
              <VideoCameraBackIcon />
            </Link>
            <div className={classes.profileCircle}>
              <span>{user.username[0].toUpperCase()}</span>
            </div>
          </div>
        </>
          : <div>Guest</div>}
      </div>
    </div>
  )
}

export default Navbar