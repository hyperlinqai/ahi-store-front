import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                            AHI <span className="text-orange-500">JEWELLERY</span>
                        </span>
                        <p className="text-sm text-gray-500 leading-6">
                            Crafting timeless elegance. Discover our exclusive collection of fine jewelry designed for your most precious moments.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Shop</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Rings</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Necklaces</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Earrings</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Bracelets</Link></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Shipping Policy</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Returns</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">FAQ</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-200 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} Ahi Jewellery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
