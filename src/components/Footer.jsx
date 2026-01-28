export default function Footer() {
  return (
    <footer className="border-t border-black bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Vyntra
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Premium watches crafted for those who respect time, precision,
              and timeless design.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Shop
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li className="cursor-pointer transition hover:text-gray-900">
                All Watches
              </li>
              <li className="cursor-pointer transition hover:text-gray-900">
                New Arrivals
              </li>
              <li className="cursor-pointer transition hover:text-gray-900">
                Best Sellers
              </li>
              <li className="cursor-pointer transition hover:text-gray-900">
                Limited Edition
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li className="cursor-pointer transition hover:text-gray-900">
                Contact Us
              </li>
              <li className="cursor-pointer transition hover:text-gray-900">
                Shipping & Returns
              </li>
              <li className="cursor-pointer transition hover:text-gray-900">
                Warranty
              </li>
              <li className="cursor-pointer transition hover:text-gray-900">
                FAQs
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Vyntra. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="cursor-pointer transition hover:text-gray-900">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition hover:text-gray-900">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
