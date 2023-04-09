import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import Home from '../Home/Home'
import SingleProduct from '../Products/SingleProduct'
import Profile from '../Profile/Profile'
import SingleCategory from '../Categories/SingleCategory'
import Cart from '../Cart/Cart'
import Favorite from '../Favorite/Favorite'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.Product} element={<SingleProduct />} />
      <Route path={ROUTES.Profile} element={<Profile />} />
      <Route path={ROUTES.Categories} element={<SingleCategory />} />
      <Route path={ROUTES.Cart} element={<Cart />} />
      <Route path={ROUTES.Favorite} element={<Favorite />} />
    </Routes>
  )
}

export default AppRoutes
