import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../features/api/apiSlice'
import Products from '../../components/Products/Products'
import styles from '../../styles/Category.module.css'
import { useSelector } from 'react-redux'

const Category = () => {
  const { id } = useParams()
  const { list } = useSelector(({ categories }) => categories)

  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  }

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  }

  const [isEnd, setIsEnd] = useState(false)
  const [params, setParams] = useState(defaultParams)
  const [categ, setCateg] = useState(null)
  const [items, setItems] = useState([])
  const [values, setValues] = useState(defaultValues)
  const { data, isLoading, isSuccess } = useGetProductsQuery(params)

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setItems([])
    setIsEnd(false)
    setParams({ ...defaultParams, ...values })
  }
  const handleReset = () => {
    setValues(defaultValues)
    setItems([])
    setParams({ ...defaultParams, categoryId: id })
    setIsEnd(false)
  }

  useEffect(() => {
    if (isLoading) return

    if (!data.length) return setIsEnd(true)
    setItems((prevItem) => [...prevItem, ...data])
  }, [isLoading, data])

  useEffect(() => {
    if (!id) return
    handleReset()

    //eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (!id || !list.length) return
    const category = list.find((item) => item.id === id * 1)
    setCateg(category)
  }, [id, list])

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{categ?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Products name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden />
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No result</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          products={items}
          title=""
          amount={items.length}
          style={{ padding: 0 }}
        />
      )}
      {!isEnd && items.length && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  )
}

export default Category
