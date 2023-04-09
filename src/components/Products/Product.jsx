import { Link } from 'react-router-dom'
import styles from '../../styles/Product.module.css'
import { ROUTES } from '../../utils/routes'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addItemToCart,
  addItemToFavourites,
} from '../../features/user/userSlice'

const sizes = [4, 4.5, 5]

const Product = (item) => {
  const { images, title, price, description } = item
  const dispatch = useDispatch()
  const [currentImage, setCurrentImage] = useState()
  const [currentSize, setCurrentSize] = useState()

  const addToCart = () => {
    dispatch(addItemToCart(item))
  }

  const addToFavourites = () => {
    dispatch(addItemToFavourites(item))
  }

  useEffect(() => {
    if (!images.length) return
    setCurrentImage(images[0])
  }, [images])
  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles['images-list']}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.sizes}>
          <span>Sizes:</span>
          <div className={styles.list}>
            {sizes.map((size) => (
              <div
                key={size}
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ''
                }`}
                onClick={() => setCurrentSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            className={styles.add}
            onClick={addToCart}
            disabled={!currentSize}
          >
            Add to card
          </button>
          <button className={styles.favourite} onClick={addToFavourites}>
            Add to favourites
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={ROUTES.Home}>Find in a store</Link>
        </div>
      </div>
    </section>
  )
}

export default Product
