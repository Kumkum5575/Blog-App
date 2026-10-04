import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-2">

                        <Link
                            to="/"
                            className="inline-flex items-center"
                        >
                            <Logo width="80px" />
                        </Link>

                        <h2 className="mt-5 text-2xl font-bold">
                            MyBlog
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                            A simple and modern blogging platform
                            where you can create, explore and share
                            meaningful articles and ideas.
                        </p>

                        <p className="mt-5 text-sm text-gray-500">
                            Keep learning. Keep building. Keep sharing.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-5">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-300 hover:text-white transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/all-posts"
                                    className="text-sm text-gray-300 hover:text-white transition"
                                >
                                    All Posts
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/add-post"
                                    className="text-sm text-gray-300 hover:text-white transition"
                                >
                                    Create Post
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Account */}
                    <div>

                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-5">
                            Account
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-300 hover:text-white transition"
                                >
                                    Sign In
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/signup"
                                    className="text-sm text-gray-300 hover:text-white transition"
                                >
                                    Create Account
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} MyBlog. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Built with React & Appwrite
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;