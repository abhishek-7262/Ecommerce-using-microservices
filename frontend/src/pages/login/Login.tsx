import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const loginForm = useForm<LoginFormData>();

  const signupForm = useForm<SignupFormData>();

  const signupPassword = signupForm.watch("password");

  const onLogin = (data: LoginFormData) => {
    console.log("Login:", data);
  };

  const onSignup = (data: SignupFormData) => {
    console.log("Signup:", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? "Login to your account" : "Sign up to get started"}
          </p>
        </div>

        {isLogin ? (
          <form
            onSubmit={loginForm.handleSubmit(onLogin)}
            className="space-y-5"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                {...loginForm.register("email", {
                  required: "Email is required",
                })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Enter your email"
              />
              {loginForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                {...loginForm.register("password", {
                  required: "Password is required",
                })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Enter your password"
              />
              {loginForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            onSubmit={signupForm.handleSubmit(onSignup)}
            className="space-y-5"
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                {...signupForm.register("name", {
                  required: "Name is required",
                })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Enter your name"
              />
              {signupForm.formState.errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {signupForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                {...signupForm.register("email", {
                  required: "Email is required",
                })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Enter your email"
              />
              {signupForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {signupForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                {...signupForm.register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Enter password"
              />
              {signupForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {signupForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                type="password"
                {...signupForm.register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === signupPassword || "Passwords do not match",
                })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Confirm password"
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {signupForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-slate-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
