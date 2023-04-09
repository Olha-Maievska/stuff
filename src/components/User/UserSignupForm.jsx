import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../features/user/userSlice'

import styles from '../../styles/User.module.css'

const UserSignupForm = ({ toggleType, closeForm }) => {
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

    dispatch(createUser(values))
    closeForm()
  }
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Sign up</div>
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
        <div className={styles.link} onClick={() => toggleType('login')}>
          I already have an account
        </div>
        <button className={styles.submit} type="submit">
          Create an accont
        </button>
      </form>
    </div>
  )
}

export default UserSignupForm
