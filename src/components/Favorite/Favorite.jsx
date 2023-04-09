import { useDispatch, useSelector } from 'react-redux'
import styles from '../../styles/Cart.module.css'
import {
  addItemToCart,
  removeItemFromFavourites,
} from '../../features/user/userSlice'

const Favorite = () => {
  const { favourites } = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const removeFavorite = (id) => {
    dispatch(removeItemFromFavourites(id))
  }

  const addToCart = (item) => {
    dispatch(addItemToCart(item))
  }

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your favourites products</h2>

      {!favourites.length ? (
        <div className={styles.empty}> Here is empty</div>
      ) : (
        <div className={styles.list}>
          {favourites.map((item) => {
            const { id, title, images, category, price } = item
            return (
              <>
                <div className={styles.favourite} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>
                  <div className={styles.price}>
                    Price: <span> {price}</span>$
                  </div>
                  <button
                    className={styles.proceed}
                    style={{ marginRight: 30 }}
                    onClick={() => addToCart(item)}
                  >
                    Add to cart
                  </button>
                  <div
                    className={styles.close}
                    onClick={() => removeFavorite(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Favorite
