import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import styles from '../../styles/Header.module.css'

import logo from '../../images/logo.svg'
import avatar from '../../images/avatar.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../../features/user/userSlice'
import { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../../features/api/apiSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser, cart, favourites } = useSelector(({ user }) => user)
  const [values, setValues] = useState({ name: 'Guest', avatar: avatar })
  const [searchValue, setSearchValue] = useState('')
  const { data, isLoading } = useGetProductsQuery({ title: searchValue })

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true))
    else navigate(ROUTES.Profile)
  }

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value)
  }

  useEffect(() => {
    if (!currentUser) return
    setValues(currentUser)
  }, [currentUser])

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.Home}>
          <img src={logo} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          ></div>
          <div className={styles.username}>{values.name}</div>
        </div>

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anyting..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? 'Loading...'
                : !data.length
                ? 'No result'
                : data.map(({ title, images, id }) => (
                    <Link
                      className={styles.item}
                      key={id}
                      to={`/products/${id}`}
                      onClick={() => setSearchValue('')}
                    >
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      />
                      <div className={styles.title}>{title}</div>
                    </Link>
                  ))}
            </div>
          )}
        </form>

        <div className={styles.account}>
          <Link className={styles.favourites} to={ROUTES.Favorite}>
            <svg
              className={styles['icon-fav']}
              style={{
                fill: `${!!favourites.length ? 'red' : 'none'} `,
              }}
            >
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link className={styles.cart} to={ROUTES.Cart}>
            <svg className={styles['icon-cart']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
