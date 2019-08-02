import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import Dash from './components/Dash'
import detectMobile, { MIN_WIDTH } from './lib/detectMobile'
import styles from './scss/app.module.scss'
import './lib/falib'
import Footer from './components/Footer'
import { parse } from 'query-string'
import throttle from 'lodash/throttle'

const MOBILE_DETECTED = detectMobile()
const Home = props => {
  const [isMobile, showMobile] = useState(MOBILE_DETECTED)
  const windowresize = throttle(event => {
    const w = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    if (w < MIN_WIDTH) {
      showMobile(true)
    } else if (w >= MIN_WIDTH) {
      showMobile(false)
    }
  }, 300)
  useEffect(() => {
    windowresize()
    window.addEventListener('resize', windowresize)
    return () => {
      window.removeEventListener('resize', windowresize)
    }
  }, [])
  useEffect(() => {
    showMobile(parse(props.location.search).screen === 'mobile')
  }, [])
  return (
    <>
    <main className={styles.app}>
      <Dash mobile={isMobile}>
        <Footer mobile={isMobile}>
        </Footer>
      </Dash>
    </main>
    </>

  )
}

Home.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  location: PropTypes.shape({ search: PropTypes.string }).isRequired
}

const App = () => {
  const preloadClass = () => {
    document.body.className = document.body.className.replace('preload', '')
  }
  useEffect(() => {
    window.addEventListener('load', preloadClass)
    return () => {
      window.removeEventListener('load', preloadClass)
    }
  })
  return (
    <Router>
      <Route path="/" exact component={withRouter(Home)} />
    </Router>
  )
}

export default App
