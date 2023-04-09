import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../styles/Profile.module.css'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const { currentUser } = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  })

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isNotEmpty = Object.values(values).every((val) => val)

    if (!isNotEmpty) return
    dispatch(updateUser(values))
  }

  useEffect(() => {
    if (!currentUser) return
    setValues(currentUser)
  }, [currentUser])

  return (
    <section className={styles.profile}>
      {!currentUser ? <span>You need to log in</span> : null}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="name"
            name="name"
            value={values.name}
            placeholder="Your name"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Your email"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="Your password"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="avatar"
            name="avatar"
            value={values.avatar}
            placeholder="Your avatar"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.submit} type="submit">
          Update
        </button>
      </form>
    </section>
  )
}

export default Profile
