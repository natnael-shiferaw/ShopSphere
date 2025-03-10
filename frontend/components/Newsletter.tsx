import { ArrowRight } from "lucide-react"

export default function Newsletter() {
  return (
    <section className="py-12 bg-black text-white rounded-md">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>

        <div className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full bg-white text-black"
            />
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center justify-center">
              Subscribe to Newsletter <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

