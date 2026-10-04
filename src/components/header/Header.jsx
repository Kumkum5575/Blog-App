import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector(
        (state) => state.auth.status
    );

    const userData = useSelector(
        (state) => state.auth.userData
    );

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <Container>
                <nav className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <Logo width="55px" />

                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-gray-900">
                                MyBlog
                            </h1>

                            <p className="text-xs text-gray-400">
                                Ideas & Stories
                            </p>
                        </div>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        {/* Navigation */}
                        <div className="flex items-center gap-1">
                            {navItems.map(
                                (item) =>
                                    item.active && (
                                        <Link
                                            key={item.name}
                                            to={item.slug}
                                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                                        >
                                            {item.name}
                                        </Link>
                                    )
                            )}
                        </div>

                        {/* User Section */}
                        {authStatus && (
                            <div className="flex items-center gap-3 ml-3 pl-4 border-l border-gray-200">

                                <div className="text-right hidden sm:block">
                                    <p className="text-xs text-gray-400">
                                        Hello,
                                    </p>

                                    <p className="text-sm font-semibold text-gray-900">
                                        {userData?.name || "User"} 👋
                                    </p>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                                    {userData?.name
                                        ? userData.name
                                              .charAt(0)
                                              .toUpperCase()
                                        : "U"}
                                </div>

                                <LogoutBtn />

                            </div>
                        )}

                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;