import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserSignupForm from './UserSignupForm'

import styles from '../../styles/User.module.css'
import { toggleForm, toggleFormType } from '../../features/user/userSlice'
import UserLoginForm from './UserLoginForm'

const UserForm = () => {
  const dispatch = useDispatch()
  const { showForm, formType } = useSelector(({ user }) => user)

  const closeForm = () => dispatch(toggleForm(false))
  const toggleType = (type) => dispatch(toggleFormType(type))

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === 'signup' ? (
        <UserSignupForm toggleType={toggleType} closeForm={closeForm} />
      ) : (
        <UserLoginForm toggleType={toggleType} closeForm={closeForm} />
      )}
    </>
  ) : (
    <></>
  )
}

export default UserForm
