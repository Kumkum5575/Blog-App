import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 md:py-14">
            <Container>

                {/* Page Header */}
                <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                        Create
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Create New Article
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Share your ideas, knowledge and stories with
                        your readers.
                    </p>
                </div>

                {/* Post Form */}
                <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7 md:p-9">
                    <PostForm />
                </div>

            </Container>
        </div>
    );
}

export default AddPost;