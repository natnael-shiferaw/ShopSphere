import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white pt-12 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="font-bold text-xl mb-6">SHOPSPHERE</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">{/* Social icons would go here */}</div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-600 hover:text-black">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/works" className="text-gray-600 hover:text-black">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-600 hover:text-black">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">HELP</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/customer-support" className="text-gray-600 hover:text-black">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/delivery-details" className="text-gray-600 hover:text-black">
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-600 hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-black">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/free-ebooks" className="text-gray-600 hover:text-black">
                  Free eBooks
                </Link>
              </li>
              <li>
                <Link href="/development-tutorial" className="text-gray-600 hover:text-black">
                  Development Tutorial
                </Link>
              </li>
              <li>
                <Link href="/how-to-blog" className="text-gray-600 hover:text-black">
                  How to - Blog
                </Link>
              </li>
              <li>
                <Link href="/youtube-playlist" className="text-gray-600 hover:text-black">
                  Youtube Playlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2023 SHOPSPHERE All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">{/* Payment method icons would go here */}</div>
        </div>
      </div>
    </footer>
  )
}
