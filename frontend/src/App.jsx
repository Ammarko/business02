import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedProjects from './components/FeaturedProjects'
import Features from './components/Features'
import Footer from './components/Footer'
import { AuthProvider } from './hooks/useAuth.jsx'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Hero />
          <FeaturedProjects />
          <Features />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
