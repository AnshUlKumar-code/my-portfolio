// components/Footer.jsx
import { FiHeart, FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-8 px-4 border-t border-primary-border bg-primary-bg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1 text-xl font-bold">
          <span className="text-accent">&lt;</span>
          <span>Anshul</span>
          <span className="text-accent">/&gt;</span>
        </div>

        <p className="text-gray-400 text-sm flex items-center gap-1">
          Made with <FiHeart className="text-red-500 fill-red-500" /> by Anshul kumar
        </p>

        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all"
        >
          <FiArrowUp />
        </button>
      </div>
    </footer>
  )
}

export default Footer