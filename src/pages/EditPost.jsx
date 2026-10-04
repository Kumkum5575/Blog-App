import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

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

    return post ? (
        <div className="min-h-screen bg-gray-50 py-10 md:py-14">
            <Container>

                {/* Page Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                        Manage
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Edit Article
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update your article details, content or
                        featured image.
                    </p>
                </div>

                {/* Edit Form */}
                <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7 md:p-9">
                    <PostForm post={post} />
                </div>

            </Container>
        </div>
    ) : (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">

                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>

                <p className="text-gray-500">
                    Loading article...
                </p>

            </div>
        </div>
    );
}

export default EditPost;