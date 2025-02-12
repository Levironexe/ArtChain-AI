import { Twitter, Instagram, Github, Palette } from "lucide-react"

export default function Footer() {
  return (
    <footer className="pb-12 pt-20 bg-black">
      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 bg-gradient-to-r rounded-[82px] sm:rounded-[90px] lg:rounded-[98px] from-purple-500 via-purple-400 to-pink-600 blur-xl opacity-75 animate-pulse"></div>
        <div className="relative z-10 p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-950 to-gray-900 rounded-[30px] sm:rounded-[40px] lg:rounded-[50px]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end pb-8">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <div className="flex items-center gap-[6px] mb-3">
                <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">ArtChain AI</h3>
              </div>

              <p className="text-base sm:text-lg text-white">
                The future of digital art creation and ownership, powered by AI and blockchain technology.
              </p>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end">
              <div className="flex space-x-4 mb-4 text-white">
                <a href="#" className="hover:scale-125 transition-all duration-200">
                  <Twitter className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
                <a href="#" className="hover:scale-125 transition-all duration-200">
                  <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
                <a href="#" className="hover:scale-125 transition-all duration-200">
                  <Github className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 text-base sm:text-lg font-semibold text-white">
                <a
                  className="hover:scale-110 transition-all duration-200"
                  href="https://maps.app.goo.gl/wkyeY5hfE8Sjme6S8"
                >
                  Our office
                </a>
                <a className="hover:scale-110 transition-all duration-200" href="/aboutus">
                  About us
                </a>
                <a className="hover:scale-110 transition-all duration-200" href="artchainaiblog">
                  Blog
                </a>
                <a className="hover:scale-110 transition-all duration-200" href="mailto:nguyenphuoc4805@gmail.com">
                  Contact us
                </a>
              </div>
            </div>
          </div>

          <div className="text-purple-500 flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8 border-t border-white">
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-0">
              &copy; 2024 ArtChain AI. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base lg:text-lg font-semibold">
              <a className="text-purple-400 hover:underline" href="#">
                Terms & Service
              </a>
              <a
                className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:underline"
                href="#"
              >
                Cookie Policy
              </a>
              <a className="text-pink-600 hover:underline" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

