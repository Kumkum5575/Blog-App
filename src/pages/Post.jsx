import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const userData = useSelector(
        (state) => state.auth.userData
    );

    const isAuthor =
        post && userData
            ? post.userId === userData.$id
            : false;

    useEffect(() => {
        if (id) {
            appwriteService.getPost(id).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    const deletePost = () => {
        if (!post) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        appwriteService
            .deletePost(post.$id)
            .then((status) => {
                if (status) {
                    if (post.featuredImage) {
                        appwriteService.deleteFile(
                            post.featuredImage
                        );
                    }

                    navigate("/");
                }
            });
    };

    return post ? (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            <Container>

                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/all-posts"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition"
                    >
                        <span className="text-lg">←</span>
                        Back to Articles
                    </Link>
                </div>

                {/* Main Article Card */}
                <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                    {/* Featured Image */}
                    <div className="relative w-full bg-gray-100">

                        <img
                            src={appwriteService.getFilePreview(
                                post.featuredImage
                            )}
                            alt={post.title}
                            className="w-full h-[280px] sm:h-[400px] md:h-[520px] object-cover"
                        />

                        {/* Author Actions */}
                        {isAuthor && (
                            <div className="absolute top-5 right-5 flex gap-2">
                                <Link
                                    to={`/edit-post/${post.$id}`}
                                >
                                    <Button
                                        bgColor="bg-white"
                                        className="!text-gray-800 hover:bg-gray-100 shadow-lg"
                                    >
                                        Edit
                                    </Button>
                                </Link>

                                <Button
                                    bgColor="bg-red-500"
                                    className="hover:bg-red-600 shadow-lg"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Article Header */}
                    <div className="px-5 py-8 sm:px-8 md:px-12 md:py-10">

                        {/* Date */}
                        {post.$createdAt && (
                            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">
                                {new Date(
                                    post.$createdAt
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-4xl">
                            {post.title}
                        </h1>

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200 my-8"></div>

                        {/* Article Content */}
                        <div className="max-w-4xl mx-auto">
                            <div className="browser-css text-gray-700 leading-relaxed">
                                {parse(post.content)}
                            </div>
                        </div>

                    </div>
                </article>

                {/* Bottom Navigation */}
                <div className="flex justify-center mt-8">
                    <Link
                        to="/all-posts"
                        className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition"
                    >
                        Explore More Articles
                    </Link>
                </div>

            </Container>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>

                <p className="text-gray-500">
                    Loading article...
                </p>
            </div>
        </div>
    );
}