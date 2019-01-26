import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'

import Container from '../components/container'
import Navigation from '../components/navigation'
// import Footer from '../components/footer'
import Transition from '../components/transition'
import './layout.css'

addLocaleData([{ locale: 'en' }, { locale: 'nl' }])

const Wrapper = ({
  children,
  location,
  pageContext: { translations, locale },
}) => (
  <IntlProvider locale={locale} messages={translations}>
    <>
      <Navigation />
      <Container>
        <Transition location={location}>
          {children}
          {/* <Footer /> */}
        </Transition>
      </Container>
    </>
  </IntlProvider>
)

export default Wrapper
