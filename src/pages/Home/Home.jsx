import Navbar from '../../components/Navbar'
import Homepage from '../../components/Homepage'
import Footer from '../../components/Footer'
import Chatbot from '../../components/Chatbot'

const Home = () => {
  return (
    <>
      <Navbar />
      <Homepage />
      <Footer />
      <Chatbot position="bottom-right" height={500} width={400} />
    </>
  )
}

export default Home
