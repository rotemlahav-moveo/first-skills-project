import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-300 bg-gray-100">
      <div className="mx-auto w-full max-w-[1440px] px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex h-6 w-[160px] items-center justify-center bg-gray-900">
              <span className="text-xs text-white">SnapStyle</span>
            </div>
            <p className="text-sm text-gray-600">Quality fashion for everyone.</p>
          </div>

          <div>
            <h3 className="mb-4 text-gray-900">Shop</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/shop/women" className="text-sm text-gray-600 hover:text-gray-900">
                Women
              </Link>
              <Link to="/shop/men" className="text-sm text-gray-600 hover:text-gray-900">
                Men
              </Link>
              <Link to="/shop/accessories" className="text-sm text-gray-600 hover:text-gray-900">
                Accessories
              </Link>
              <Link to="/shop/sale" className="text-sm text-gray-600 hover:text-gray-900">
                Sale
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-gray-900">Help</h3>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Customer Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Shipping Info
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Returns
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                FAQ
              </a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-gray-900">Account</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/sign-in" className="text-sm text-gray-600 hover:text-gray-900">
                Sign in
              </Link>
              <Link to="/sign-up" className="text-sm text-gray-600 hover:text-gray-900">
                Create account
              </Link>
              <Link to="/favorites" className="text-sm text-gray-600 hover:text-gray-900">
                Favorites
              </Link>
              <Link to="/cart" className="text-sm text-gray-600 hover:text-gray-900">
                Cart
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-300 pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm text-gray-600">© 2026 SnapStyle Fashion. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
