import Hero from '../components/Hero'
import TrustMarquee from '../components/TrustMarquee'
import Stats from '../components/Stats'
import ProductGrid from '../components/Products'
import WhyUs from '../components/WhyUs'
import Markets from '../components/Markets'
import WholesaleFAQ from '../components/WholesaleFAQ'
import ContactStrip from '../components/ContactStrip'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <Stats />
      <ProductGrid />
      <WhyUs />
      <Markets />
      <WholesaleFAQ />
      <ContactStrip />
      <Footer />
    </>
  )
}

export default Home