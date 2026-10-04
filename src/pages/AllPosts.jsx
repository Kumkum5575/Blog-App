import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
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
        <div className="min-h-screen bg-gray-50 py-10 md:py-14">
            <Container>

                {/* ================= HEADER ================= */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                            Explore
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            All Articles
                        </h1>

                        <p className="text-gray-500 mt-2 max-w-xl">
                            Discover all the latest articles, ideas and
                            stories published on the blog.
                        </p>
                    </div>

                    {/* ================= SEARCH ================= */}
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

                {/* ================= ARTICLE COUNT ================= */}
                {!loading && posts.length > 0 && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">
                                {filteredPosts.length}
                            </span>{" "}
                            {filteredPosts.length === 1
                                ? "article"
                                : "articles"}
                        </p>
                    </div>
                )}

                {/* ================= CONTENT ================= */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">

                        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mb-4"></div>

                        <p className="text-gray-500">
                            Loading articles...
                        </p>

                    </div>
                ) : filteredPosts.length > 0 ? (

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
                    <div className="bg-white border border-gray-200 rounded-2xl py-20 px-6 text-center">

                        <div className="text-5xl mb-5">
                            {search ? "🔍" : "📝"}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {search
                                ? "No articles found"
                                : "No posts available"}
                        </h2>

                        <p className="text-gray-500 max-w-md mx-auto">
                            {search
                                ? "Try searching with a different title or keyword."
                                : "There are no published articles yet."}
                        </p>

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="mt-5 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition"
                            >
                                Clear Search
                            </button>
                        )}

                    </div>
                )}

            </Container>
        </div>
    );
}

export default AllPosts;