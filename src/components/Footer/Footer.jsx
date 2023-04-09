import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import logo from '../../images/logo.svg'

import styles from '../../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.Home}>
          <img src={logo} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.rights}>
        Developed by{' '}
        <a
          href="https://youtube.com/Tomkovich"
          target="_blank"
          rel="noreferrer"
        >
          Tomkovich
        </a>
      </div>

      <div className={styles.socials}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>

        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
