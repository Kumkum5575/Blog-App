import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();

    const userData = useSelector(
        (state) => state.auth.userData
    );

    const submit = async (data) => {
        setLoading(true);
        setError("");

        try {
            // =========================
            // UPDATE POST
            // =========================
            if (post) {
                let file = null;

                if (data.image?.[0]) {
                    file = await appwriteService.loadFile(
                        data.image[0]
                    );

                    if (!file) {
                        setError(
                            "Image upload failed. Please try again."
                        );
                        setLoading(false);
                        return;
                    }
                }

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(
                        post.featuredImage
                    );
                }

                const dbPost =
                    await appwriteService.updatePost(
                        post.$id,
                        {
                            title: data.title,
                            content: data.content,
                            status: data.status,
                            featuredImage: file
                                ? file.$id
                                : post.featuredImage,
                        }
                    );

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    setError(
                        "Unable to update the article. Please try again."
                    );
                }

                setLoading(false);
                return;
            }

            // =========================
            // CREATE NEW POST
            // =========================
            if (!data.image?.[0]) {
                setError(
                    "Please select a featured image."
                );
                setLoading(false);
                return;
            }

            const file =
                await appwriteService.loadFile(
                    data.image[0]
                );

            if (!file || !file.$id) {
                setError(
                    "Image upload failed. Please try again."
                );
                setLoading(false);
                return;
            }

            const dbPost =
                await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredImage: file.$id,
                    userId: userData?.$id,
                });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                setError(
                    "Unable to create the article. Please try again."
                );
            }
        } catch (error) {
            console.log("Post Submit Error:", error);

            setError(
                "Something went wrong. Please try again."
            );
        }

        setLoading(false);
    };

    // =========================
    // SLUG TRANSFORM
    // =========================
    const slugTransform = useCallback(
        (value) => {
            if (
                value &&
                typeof value === "string"
            ) {
                return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, "-")
                    .replace(/\s/g, "-");
            }

            return "";
        },
        []
    );

    // =========================
    // AUTO GENERATE SLUG
    // =========================
    useEffect(() => {
        const subscription = watch(
            (value, { name }) => {
                // Only generate slug automatically
                // while creating a new post.
                if (
                    name === "title" &&
                    !post
                ) {
                    setValue(
                        "slug",
                        slugTransform(value.title),
                        {
                            shouldValidate: true,
                        }
                    );
                }
            }
        );

        return () =>
            subscription.unsubscribe();
    }, [
        watch,
        slugTransform,
        setValue,
        post,
    ]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-8"
        >
            {/* =========================
                FORM HEADER
            ========================= */}
            <div className="border-b border-gray-200 pb-5">
                <h2 className="text-xl font-bold text-gray-900">
                    {post
                        ? "Update your article"
                        : "Write a new article"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {post
                        ? "Make changes to your article and save them."
                        : "Add a title, content and featured image to publish your article."}
                </p>
            </div>

            {/* =========================
                ERROR MESSAGE
            ========================= */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-600">
                        {error}
                    </p>
                </div>
            )}

            {/* =========================
                FORM GRID
            ========================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* =========================
                    LEFT SIDE
                ========================= */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Title */}
                    <div>
                        <Input
                            label="Article Title"
                            placeholder="Enter your article title"
                            className="mb-1"
                            {...register("title", {
                                required:
                                    "Title is required",
                            })}
                        />

                        <p className="text-xs text-gray-400 mt-1">
                            Choose a clear and meaningful title.
                        </p>
                    </div>

                    {/* Slug */}
                    <div>
                        <Input
                            label="Slug"
                            placeholder="article-url-slug"
                            className="mb-1"
                            {...register("slug", {
                                required:
                                    "Slug is required",
                            })}
                            onInput={(e) => {
                                setValue(
                                    "slug",
                                    slugTransform(
                                        e.currentTarget.value
                                    ),
                                    {
                                        shouldValidate:
                                            true,
                                    }
                                );
                            }}
                        />

                        <p className="text-xs text-gray-400 mt-1">
                            Used to identify your article URL.
                        </p>
                    </div>

                    {/* Content */}
                    <div>
                        <RTE
                            label="Article Content"
                            name="content"
                            control={control}
                            defaultValue={getValues(
                                "content"
                            )}
                        />
                    </div>
                </div>

                {/* =========================
                    RIGHT SIDE
                ========================= */}
                <div className="space-y-6">

                    {/* Featured Image */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            Featured Image
                        </h3>

                        <p className="text-xs text-gray-500 mb-4">
                            {post
                                ? "Upload a new image only if you want to replace the current one."
                                : "Choose an image that represents your article."}
                        </p>

                        <Input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            className="mb-4"
                            {...register("image", {
                                required: !post,
                            })}
                        />

                        {/* Existing Image */}
                        {post &&
                            post.featuredImage && (
                                <div className="mt-4">

                                    <p className="text-xs font-medium text-gray-500 mb-2">
                                        Current Image
                                    </p>

                                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                        <img
                                            src={appwriteService.getFilePreview(
                                                post.featuredImage
                                            )}
                                            alt={
                                                post.title
                                            }
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>

                                </div>
                            )}
                    </div>

                    {/* Status */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                        <Select
                            options={[
                                "active",
                                "inactive",
                            ]}
                            label="Article Status"
                            className="mb-1"
                            {...register("status", {
                                required:
                                    "Status is required",
                            })}
                        />

                        <p className="text-xs text-gray-400 mt-2">
                            Active articles are visible on
                            the blog.
                        </p>

                    </div>

                    {/* Submit */}
                    <div className="pt-2">

                        <Button
                            type="submit"
                            bgColor={
                                post
                                    ? "bg-green-600"
                                    : "bg-gray-900"
                            }
                            className="w-full py-3 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading
                                ? post
                                    ? "Updating..."
                                    : "Publishing..."
                                : post
                                ? "Update Article"
                                : "Publish Article"}
                        </Button>

                        {/* Cancel */}
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    post
                                        ? `/post/${post.$id}`
                                        : "/"
                                )
                            }
                            disabled={loading}
                            className="w-full mt-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
        </form>
    );
}