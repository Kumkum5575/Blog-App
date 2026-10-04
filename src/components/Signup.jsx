import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm();

    const create = async (data) => {
        setError("");
        setLoading(true);

        try {
            const createdUser =
                await authService.createAccount(data);

            if (createdUser) {
                const userData =
                    await authService.getCurrentUser();

                if (userData) {
                    console.log("USER DATA:", userData);

                    dispatch(login(userData));
                }

                navigate("/");
            }
        } catch (error) {
            console.log("Signup Error:", error);

            setError(
                error?.message ||
                    "Unable to create account. Please try again."
            );
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm">

                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-24">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create Your Account
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Join us and start sharing your ideas
                    </p>
                </div>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-gray-900 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-sm text-red-600 text-center">
                            {error}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit(create)}
                    className="mt-8"
                >
                    <div className="space-y-5">

                        {/* Name */}
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required:
                                    "Full name is required",
                            })}
                        />

                        {/* Email */}
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required:
                                    "Email is required",

                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />

                        {/* Password */}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            {...register("password", {
                                required:
                                    "Password is required",

                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            })}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full py-3"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>

                    </div>
                </form>

            </div>
        </div>
    );
}

export default Signup;