
import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({
    $id,
    title,
    content,
    featuredImage,
    $createdAt,
}) {
    const previewUrl =
        appwriteService.getFilePreview(featuredImage);

    // HTML content ko plain text mein convert karne ke liye
    const getTextPreview = (html) => {
        if (!html) return "Discover this article and read the complete story.";

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        return (
            tempDiv.textContent ||
            tempDiv.innerText ||
            ""
        ).slice(0, 110);
    };

    const formattedDate = $createdAt
        ? new Date($createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "";

    return (
        <article className="group h-full bg-white overflow-hidden">

            {/* ================= IMAGE ================= */}
            <Link to={`/post/${$id}`}>
               <div className="relative overflow-hidden bg-gray-100">
    <img
        src={previewUrl}
        alt={title}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
</div>            </Link>

            {/* ================= CONTENT ================= */}
            <div className="p-5">

                {/* Date */}
                {formattedDate && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        {formattedDate}
                    </p>
                )}

                {/* Title */}
                <Link to={`/post/${$id}`}>
                    <h2 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-200">
                        {title}
                    </h2>
                </Link>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {getTextPreview(content)}
                    {content && content.length > 110
                        ? "..."
                        : ""}
                </p>

                {/* Read More */}
                <Link
                    to={`/post/${$id}`}
                    className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-gray-900 hover:text-gray-500 transition-colors"
                >
                    Read article
                    <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                        →
                    </span>
                </Link>

            </div>
        </article>
    );
}

export default PostCard;
