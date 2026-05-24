import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-300 mt-32">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-6">
              <Logo size="lg" invert />
            </div>
            <p className="text-ink-400 max-w-md leading-relaxed">
              We design and build modern websites, mobile apps, and SEO strategies
              that help ambitious brands grow online.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 text-white border-b border-white/30 pb-1 hover:border-white transition-colors group"
            >
              Start a project
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Studio</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Web design</li>
              <li className="hover:text-white transition-colors cursor-pointer">Mobile apps</li>
              <li className="hover:text-white transition-colors cursor-pointer">SEO</li>
              <li className="hover:text-white transition-colors cursor-pointer">Branding</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Get in touch</h4>
            <a href="mailto:hello@webven.studio" className="block text-sm hover:text-white transition-colors mb-3">
              hello@webven.studio
            </a>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-ink-700 hover:bg-white hover:text-ink-900 hover:border-white transition-all flex items-center justify-center">
                <Twitter size={16} />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-ink-700 hover:bg-white hover:text-ink-900 hover:border-white transition-all flex items-center justify-center">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-ink-700 hover:bg-white hover:text-ink-900 hover:border-white transition-all flex items-center justify-center">
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full border border-ink-700 hover:bg-white hover:text-ink-900 hover:border-white transition-all flex items-center justify-center">
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <p>© {new Date().getFullYear()} Webven Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
