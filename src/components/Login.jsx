import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true);

        try {
            const session = await authService.login(data);

            if (session) {
                const userData =
                    await authService.getCurrentUser();

                if (userData) {
                    console.log("USER DATA:", userData);

                    dispatch(authLogin(userData));

                    navigate("/");
                } else {
                    setError(
                        "Unable to get user information."
                    );
                }
            }
        } catch (error) {
            console.log("Login Error:", error);

            setError(
                error?.message ||
                    "Unable to login. Please check your email and password."
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
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Sign in to continue to your account
                    </p>
                </div>

                {/* Signup Link */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-gray-900 hover:underline"
                    >
                        Sign Up
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
                    onSubmit={handleSubmit(login)}
                    className="mt-8"
                >
                    <div className="space-y-5">

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
                            placeholder="Enter your password"
                            {...register("password", {
                                required:
                                    "Password is required",
                            })}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full py-3"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}
                        </Button>

                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;