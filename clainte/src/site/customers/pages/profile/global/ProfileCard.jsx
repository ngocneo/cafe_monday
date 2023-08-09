import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useGetUseUseDataQuery } from "../../../import";
import {
  Typography,
  Box,
  useTheme,
  List,
  ListItemIcon,
  ListItemButton,
} from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { tokens } from '../../../../../theme'
import {
  logOut,
  selectCurrentUser,
} from '../../../../../features/auth/authSlice'
import userAvatar from '../../../../../assets/user-avatar.png'
const ProfileCard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const userData = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  
  return (
    <Box className="flex flex-col gap-8 drop-shadow-lg bg-slate-400/10 rounded-lg">
      <Box
        backgroundColor={colors.primary[400]}
        className={`flex flex-col justify-start items-center gap-4 py-4 px-auto`}
      >
        <Box className="h-[200px] w-[200px] rounded-full bg-slate-400/10 ">
          <img
            alt="user avatar"
            src={userData?.image || userAvatar}
            className="h-[200px] w-[200px] rounded-full border bg-slate-300 "
          />
        </Box>

        <Box className="flex flex-col justify-start items-center gap-2">
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            className={``}
          >
            {userData?.first_name} {userData?.last_name}
          </Typography>
          <Typography
            variant="subtitle1"
            color={colors.greenAccent[500]}
            className={``}
          >
            {userData?.email ? userData?.email : userData?.username}
          </Typography>
        </Box>
      </Box>

      <List className={`bg-transparent w-[100%]`}>
        {userData?.is_superuser && (
          <ListItemButton onClick={() => navigate('/admin/')}>
            <ListItemIcon>
              <DashboardOutlinedIcon fontSize="large" />
            </ListItemIcon>
            <Box className="flex justify-start items-center w-full">
              <Typography fontWeight="bold" variant="subtitle1" className={``}>
                Dashboard
              </Typography>
            </Box>
          </ListItemButton>
        )}
        <ListItemButton onClick={() => navigate('/profile/')}>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-start items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Profile
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/profile/orders/')}>
          <ListItemIcon>
            <ShoppingBagOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-start items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Order
            </Typography>
          </Box>
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/profile/wishlist/')}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-start items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Wish List
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton onClick={() => dispatch(logOut())}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="large" />
          </ListItemIcon>
          <Box className="flex justify-start items-center w-full">
            <Typography fontWeight="bold" variant="subtitle1" className={``}>
              Log Out
            </Typography>
          </Box>
        </ListItemButton>
      </List>
    </Box>
  )
}

export default ProfileCard
