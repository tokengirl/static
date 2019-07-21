import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IsomorphicSnake from './Snake'
import Mouse from './Mouse'
import styles from '../scss/header.module.scss'
import { Waypoint } from 'react-waypoint'
import MobileNav from './MobileLinks'
import DesktopNav from './Nav'
import cx from 'classnames'

const DOMAIN = process.env.DOMAIN

const Dash = ({ mobile, children }) => {
  const [showGlass, setShowGlass] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  function onMouseEnter () { setShowGlass(true) }
  function onMouseLeave () { setShowGlass(false) }

  function _handlePositionChange (waypoint) {
    const { currentPosition } = waypoint
    if (currentPosition === 'inside') {
      setScrolled(false)
    } else if (currentPosition === 'above') {
      setScrolled(true)
    }
  }

  return (
    <>
      <IsomorphicSnake scrolled={scrolled} isMobile={mobile} />
      {mobile
        ? <>
        <Waypoint onPositionChange={_handlePositionChange}><div className={styles['scroll-detect']} /></Waypoint>
        <nav className={cx(styles.nav, { [styles.hidden]: !scrolled })}>
          <MobileNav scrolled={scrolled} />
        </nav>
        </>
        : <Mouse render={mouse => (
          <header className={styles.header}>
            <span className={cx(styles.glass, {
              [styles.shownGlass]: showGlass
            })} style={{ top: mouse.y, left: mouse.x }} />
            <u onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {DOMAIN}
            </u>
          </header>
        )} />
      }
      {children}
    </>
  )
}

Dash.propTypes = {
  mobile: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Dash