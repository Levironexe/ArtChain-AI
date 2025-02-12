"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function ContactForm() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  const addOns = [
    "Impressionism",
    "Abstract",
    "Digital Art",
    "Pop Art",
    "Minimalism",
    "Pixel Art",
    "Surrealism",
    "Anime",
  ]

  const toggleAddOn = (addon: string) => {
    setSelectedAddOns((prev) => (prev.includes(addon) ? prev.filter((item) => item !== addon) : [...prev, addon]))
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              DROP
              <br />
              US A LINE
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">
              Introduce yourself and your collections.
              <br />
              We are eager to learn about your creative journey and the inspiration behind your artwork.
            </p>
          </div>

          <form className="space-y-6 lg:w-1/2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-zinc-900 rounded-lg p-3 sm:p-4 border border-zinc-800 focus:outline-none focus:border-purple-500"
            />

            <textarea
              placeholder="Your phone number"
              className="w-full bg-zinc-900 rounded-lg p-3 sm:p-4 border border-zinc-800 focus:outline-none focus:border-purple-500"
            />

            <div>
              <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 flex items-center gap-2">
                Add-Ons
                <span className="bg-zinc-900 rounded-full w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center text-xs sm:text-sm">
                  ?
                </span>
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {addOns.map((addon) => (
                  <button
                    key={addon}
                    type="button"
                    onClick={() => toggleAddOn(addon)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-sm sm:text-base transition-colors ${
                      selectedAddOns.includes(addon)
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-zinc-800 hover:border-purple-500"
                    }`}
                  >
                    {addon}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <button
                type="submit"
                className="w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold flex items-center justify-center sm:justify-start gap-2 hover:gap-4 duration-200 hover:opacity-90 transition-all"
              >
                Hand us your information
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-sm sm:text-base text-gray-400">Estimated respond time → 7 business days</span>
            </div>
            <div className="text-left">
              <p className="text-gray-400 mb-2 sm:mb-4 mt-12 sm:mt-24 text-sm sm:text-base">or email us at</p>
              <a
                href="mailto:nguyenphuoc4805@gmail.com"
                className="text-xl sm:text-2xl lg:text-3xl font-bold hover:text-purple-500 transition-colors underline"
              >
                nguyenphuoc4805.com
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

