//IMPORTING LIBRARY
import React, { useContext, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
//IMPORTING APP SETUP
import { ColorModeContext, useMode } from './theme'
import {
  selectCurrentToken,
  selectCurrentRefresh,
  selectCurrentUser,
  // selectCurrentUser,
} from './features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
// import {  useDispatch } from "react-redux";
import { useGetUseDataQuery } from './features/auth/authApiSlice'
import { setUserData } from './features/auth/authSlice'
import { refreshAccessToken } from './features/auth/authApi'

import store from './app/store'
import dayjs from 'dayjs'
import BlogDetails from './site/customers/pages/blog/details'
import ProductsListCustomer from './site/customers/pages/products/list'
import AuthRouters from './utils/AuthRouters'
import { TransitionContext } from './utils/TransitionContext'
const CustomerPrivateRoutes = React.lazy(() =>
  import('./utils/CustomerPrivateRoutes')
)
const AdminPrivateRoutes = React.lazy(() =>
  import('./utils/AdminPrivateRoutes')
)
const AdminLayout = React.lazy(() => import('./site/admin/layout'))
const CustomerLayout = React.lazy(() => import('./site/customers/layout'))
//IMPORTING ADMIN PAGE COMPONENTS

const Dashboard = React.lazy(() => import('./site/admin/pages/dashboard'))
const Contacts = React.lazy(() => import('./site/admin/pages/contacts'))
const AdminFAQ = React.lazy(() => import('./site/admin/pages/faq'))

const General = React.lazy(() =>
  import('./site/admin/pages/settings/general/General')
)
const Specification = React.lazy(() =>
  import('./site/admin/pages/settings/specification/Specification')
)
const Pages = React.lazy(() =>
  import('./site/admin/pages/settings/pages/Pages')
)

const Csp  = React.lazy(() =>
  import('./site/admin/pages/settings/csp/Csp')
)

const OrdersListAdmin = React.lazy(() =>
  import('./site/admin/pages/orders').then((module) => ({
    default: module.OrdersListAdmin,
  }))
)
const OrderDetailsAdmin = React.lazy(() =>
  import('./site/admin/pages/orders').then((module) => ({
    default: module.OrderDetailsAdmin,
  }))
)

const ProductsListAdmin = React.lazy(() =>
  import('./site/admin/pages/products/list')
)
const AddEditProduct = React.lazy(() =>
  import('./site/admin/pages/products/add-edit')
)
const ProductDetailsAdmin = React.lazy(() =>
  import('./site/admin/pages/products/details')
)
// IMPORTING Authentication pages

const Login = React.lazy(() => import('./site/auth/pages/Login'))
const Register = React.lazy(() => import('./site/auth/pages/Register'))

//IMPORTING CUSTOMERS PAGE COMPONENTS

const Home = React.lazy(() => import('./site/customers/pages/home'))
const Shopping = React.lazy(() => import('./site/customers/pages/shopping'))
const ProductDetailsCustomer = React.lazy(() =>
  import('./site/customers/pages/products').then((module) => ({
    default: module.ProductDetailsCustomer,
  }))
)
const Page404 = React.lazy(() => import('./components/Page404'))

const CustomersList = React.lazy(() =>
  import('./site/admin/pages/customers/list/index')
)
const NewCustomer = React.lazy(() =>
  import('./site/admin/pages/customers/new/index')
)
const CustomerDetails = React.lazy(() =>
  import('./site/admin/pages/customers/details/index')
)
const Profile = React.lazy(() =>
  import('./site/customers/pages/profile/details/index')
)
const OrdersListCustomer = React.lazy(() =>
  import('./site/customers/pages/profile/orders/List')
)
const OrderDetailsCustomer = React.lazy(() =>
  import('./site/customers/pages/profile/orders/Details')
)
const Wishlist = React.lazy(() =>
  import('./site/customers/pages/profile/wishlist/index')
)
const Checkout = React.lazy(() =>
  import('./site/customers/pages/checkout/checkout/index')
)
const ViewCart = React.lazy(() =>
  import('./site/customers/pages/checkout/viewcart/index')
)
const Confirmation = React.lazy(() =>
  import('./site/customers/pages/checkout/confirmation/index')
)

const Blog = React.lazy(() => import('./site/customers/pages/blog'))
const Contact = React.lazy(() => import('./site/customers/pages/contact'))
const About = React.lazy(() => import('./site/customers/pages/about'))
const CustomerFAQ = React.lazy(() => import('./site/customers/pages/faq'))

const AddEditBlog = React.lazy(() => import('./site/admin/pages/blog/addEdit'))

const AdminBlogDetails = React.lazy(() =>
  import('./site/admin/pages/blog/details')
)
const AdminListBlog = React.lazy(() => import('./site/admin/pages/blog/list'))

function App() {
  const [theme, colorMode] = useMode()
  const accessToken = useSelector(selectCurrentToken)
  const refreshToken = useSelector(selectCurrentRefresh)
  const { isPending } = useContext(TransitionContext)
  const userData = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const { data: newUserData } = useGetUseDataQuery()
  useEffect(() => {
    if (userData && newUserData) dispatch(setUserData(newUserData))
  }, [accessToken, newUserData])

  const timeOutRef = useRef(1000 * 60 * 4)
  useEffect(() => {
    timeOutRef.current = accessToken
      ? dayjs.unix(jwt_decode(accessToken).exp).diff(dayjs()) - 30000
      : 1000 * 60 * 58
  }, [accessToken])

  useEffect(() => {
    let timeOut = timeOutRef.current < 0 ? 3000 : timeOutRef.current
    let interval = setInterval(() => {
      if (refreshToken) {
        refreshAccessToken(store).then(() => {})
      }
    }, timeOut)
    return () => clearInterval(interval)
  }, [accessToken, refreshToken])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isPending && <LinearProgress />}
        <Routes>
          {/* Authentication pages */}

          <Route element={<AuthRouters />} path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<AdminPrivateRoutes />} path="admin">
            <Route
              index
              element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              }
            />
            <Route path="pages">
              <Route
                path="faq"
                element={
                  <AdminLayout>
                    <AdminFAQ />
                  </AdminLayout>
                }
              />
              <Route
                path="newuser"
                element={
                  <AdminLayout>
                    <NewCustomer />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="setting">
              <Route
                path="pages"
                element={
                  <AdminLayout>
                    <Pages />
                  </AdminLayout>
                }
              />
              <Route
                path="csp"
                element={
                  <AdminLayout>
                    <Csp/>
                  </AdminLayout>
                }
              />
              <Route
                path="specification"
                element={
                  <AdminLayout>
                    <Specification />
                  </AdminLayout>
                }
              />
              <Route
                path="general"
                element={
                  <AdminLayout>
                    <General />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="blogs">
              <Route
                index
                element={
                  <AdminLayout>
                    <AdminListBlog />
                  </AdminLayout>
                }
              />
              <Route
                path=":blogSlug"
                element={
                  <AdminLayout>
                    <AdminBlogDetails />
                  </AdminLayout>
                }
              />
              <Route
                path="new"
                element={
                  <AdminLayout>
                    <AddEditBlog isEditing={false} />
                  </AdminLayout>
                }
              />
              <Route
                path=":blogSlug/edit"
                element={
                  <AdminLayout>
                    <AddEditBlog isEditing={true} />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="data">
              <Route
                path="contacts"
                element={
                  <AdminLayout>
                    <Contacts />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="orders/">
              <Route
                index
                element={
                  <AdminLayout>
                    <OrdersListAdmin />
                  </AdminLayout>
                }
              />
              <Route
                path=":orderId"
                element={
                  <AdminLayout>
                    <OrderDetailsAdmin />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <AdminLayout>
                    <ProductsListAdmin />
                  </AdminLayout>
                }
              />
              <Route
                path="new"
                element={
                  <AdminLayout>
                    <AddEditProduct />
                  </AdminLayout>
                }
              />
              <Route
                path=":productId"
                element={
                  <AdminLayout>
                    <ProductDetailsAdmin />
                  </AdminLayout>
                }
              />
              <Route
                path=":productId/edit"
                element={
                  <AdminLayout>
                    <AddEditProduct isEditing={true} />
                  </AdminLayout>
                }
              />
            </Route>
            <Route path="customers">
              <Route
                index
                element={
                  <AdminLayout>
                    <CustomersList />
                  </AdminLayout>
                }
              />
              <Route
                path=":customerId"
                element={
                  <AdminLayout>
                    <CustomerDetails />
                  </AdminLayout>
                }
              />
            </Route>
          </Route>

          <Route path="/">
            <Route
              index
              element={
                <CustomerLayout>
                  <Home />
                </CustomerLayout>
              }
            />
            <Route
              path="products/:productFilter"
              element={
                <CustomerLayout>
                  <ProductsListCustomer />
                </CustomerLayout>
              }
            />
            <Route
              path="shopping"
              element={
                <CustomerLayout>
                  <Shopping />
                </CustomerLayout>
              }
            />
            <Route path="blogs">
              <Route
                index
                element={
                  <CustomerLayout>
                    <Blog />
                  </CustomerLayout>
                }
              />
              <Route
                path=":blogSlug"
                element={
                  <CustomerLayout>
                    <BlogDetails />
                  </CustomerLayout>
                }
              />
            </Route>
            <Route
              path="contact"
              element={
                <CustomerLayout>
                  <Contact />
                </CustomerLayout>
              }
            />
            <Route
              path="about"
              element={
                <CustomerLayout>
                  <About />
                </CustomerLayout>
              }
            />
            <Route
              path="faq"
              element={
                <CustomerLayout>
                  <CustomerFAQ />
                </CustomerLayout>
              }
            />
            <Route
              path="product/:productId"
              element={
                <CustomerLayout>
                  <ProductDetailsCustomer />
                </CustomerLayout>
              }
            />

            <Route element={<CustomerPrivateRoutes />} path="profile">
              <Route
                index
                element={
                  <AdminLayout>
                    <Profile />
                  </AdminLayout>
                }
              />
              <Route path="orders">
                <Route
                  index
                  element={
                    <CustomerLayout>
                      <OrdersListCustomer />
                    </CustomerLayout>
                  }
                />
                <Route
                  path=":orderId"
                  element={
                    <CustomerLayout>
                      <OrderDetailsCustomer />
                    </CustomerLayout>
                  }
                />
              </Route>
              <Route
                path="wishlist"
                element={
                  <CustomerLayout>
                    <Wishlist />
                  </CustomerLayout>
                }
              />
            </Route>

            <Route element={<CustomerPrivateRoutes />} path="checkout">
              <Route
                index
                element={
                  <CustomerLayout>
                    <Checkout />
                  </CustomerLayout>
                }
              />
              <Route
                path="viewcart"
                element={
                  <CustomerLayout>
                    <ViewCart />
                  </CustomerLayout>
                }
              />

              <Route
                path="success"
                element={
                  <CustomerLayout>
                    <Confirmation />
                  </CustomerLayout>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default App
