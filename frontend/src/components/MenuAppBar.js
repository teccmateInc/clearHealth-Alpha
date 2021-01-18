import React, { useContext } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import logo from '../assets/imgs/logo.png'
import TimelineIcon from '@material-ui/icons/Timeline'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { Link, useLocation, useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { Button } from '@material-ui/core'
import TimeLineFilter from './Records/TimeLineFilter'

const useStyles = makeStyles((theme) => ({
  links: {
    textDecoration: 'None',
    color: '#6dcdb1',
    fontSize: 20,
  },

  highlighted: {
    alignItems: 'right',
    backgroundColor: '#6dcdb1',
    textDecoration: 'None',
    color: '#fff',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    fontSize: 20,
    padding: 15,
    // fontWeight: '500',
  },
  highlightedLink: {
    '& svg': {
      color: '#6dcdb1',
    },
    textDecoration: 'None',
    color: '#000',
    fontSize: 20,
    paddingTop: 18,
    paddingBottom: 14,
    fontWeight: '500',
    borderBottom: '4px solid #6dcdb1',
  },
  iconsStyle: {
    fontSize: 16,
    paddingRight: 2,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  timelinebar: {
    position: 'fixed',
    margin: '-11px 0',
    boxShadow: '0 4px 6px 0 #8f988fd1',
    padding: '0 232px',
    backgroundColor: 'white',
  },
  search: {
    color: '#6dcdb1',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    border: '1px solid grey',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function MenuAppBar(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const { userData, setUserData } = useContext(UserContext)

  const history = useHistory()

  const logout = () => {
    setUserData({
      token: null,
      user: null,
    })
    localStorage.removeItem('auth-token')
    history.push('/')
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  )

  const location = useLocation()

  return (
    <div className={classes.grow} style={{ marginBottom: '75px' }}>
      <AppBar
        position='fixed'
        style={{ backgroundColor: '#fff', color: '#6dcdb1' }}
      >
        <Toolbar>
          <img
            src={logo}
            alt='ClearHealth'
            width='15%'
            onClick={(event) => (window.location.href = '/Timeline')}
          />
          <Link
            to='/Timeline'
            className={
              location.pathname === '/Timeline'
                ? classes.highlightedLink
                : classes.links
            }
          >
            <TimelineIcon className={classes.iconsStyle} />
            Timeline
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link
            to='/Facilities'
            className={
              location.pathname === '/Facilities'
                ? classes.highlightedLink
                : classes.links
            }
          >
            <LocalHospitalIcon className={classes.iconsStyle} />
            Facilities
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link
            to='/Requests'
            className={
              location.pathname === '/Requests'
                ? classes.highlightedLink
                : classes.links
            }
          >
            <AddToPhotosIcon className={classes.iconsStyle} />
            Requests
          </Link>
          &nbsp;&nbsp;&nbsp;
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button onClick={logout} className={classes.highlighted}>
              {' '}
              <VpnKeyIcon
                className={classes.iconsStyle}
                style={{ color: '#FFF' }}
              />{' '}
              Logout
            </Button>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <Badge></Badge>
            </IconButton>
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge></Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            ></IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <TimeLineFilter classes={classes} />
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
