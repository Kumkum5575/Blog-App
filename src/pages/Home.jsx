
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((response) => {
            if (response) {
                setPosts(response.rows || []);
            }

            setLoading(false);
        });
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= HERO SECTION ================= */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
                <Container>
                    <div className="py-20 md:py-28 text-center">

                        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-300 mb-4">
                            Welcome to My Blog
                        </p>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Ideas, Stories &{" "}
                            <span className="text-gray-300">
                                Knowledge
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed">
                            Explore articles, thoughts and useful
                            information shared through a simple and
                            modern blogging platform.
                        </p>

                    </div>
                </Container>
            </section>

            {/* ================= POSTS SECTION ================= */}
            <section className="py-12 md:py-16">
                <Container>

                    {/* Heading */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">
                                Discover
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Latest Articles
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Read the latest posts and ideas.
                            </p>
                        </div>

                        {/* Search */}
                        {posts.length > 0 && (
                            <div className="w-full md:w-80">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition"
                                />
                            </div>
                        )}

                    </div>

                    {/* ================= LOADING ================= */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                        </div>
                    ) : filteredPosts.length > 0 ? (

                        /* ================= POSTS GRID ================= */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {filteredPosts.map((post) => (
                                <div
                                    key={post.$id}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                                >
                                    <PostCard {...post} />
                                </div>
                            ))}

                        </div>

                    ) : (

                        /* ================= EMPTY STATE ================= */
                        <div className="bg-white rounded-2xl border border-gray-200 py-20 px-6 text-center">

                            <div className="text-5xl mb-5">
                                📝
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {search
                                    ? "No articles found"
                                    : "No posts available"}
                            </h3>

                            <p className="text-gray-500 max-w-md mx-auto">
                                {search
                                    ? "Try searching with a different title."
                                    : "There are no published articles yet. Create your first post to get started."}
                            </p>

                        </div>
                    )}

                </Container>
            </section>

            {/* ================= FOOTER CTA ================= */}
            <section className="border-t border-gray-200 bg-white">
                <Container>
                    <div className="py-12 text-center">

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Thanks for visiting!
                        </h3>

                        <p className="text-gray-500">
                            Keep learning. Keep building. Keep sharing.
                        </p>

                    </div>
                </Container>
            </section>

        </div>
    );
}

export default Home;

