import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Toast,
  ToastToggle,
} from "flowbite-react";
import { useEffect, useState, useContext } from "react";
import { HiExclamation } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import your auth context

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  function validateForm() {
    if (form.email === "" || form.password === "") {
      setError("Gagal! Pastikan email dan password terisi.");
      return false;
    }
    setError("");
    return true;
  }

  async function LoginProcces() {
    if (!validateForm()) return;

    setLoading(true);
    const url = "https://api.escuelajs.co/api/v1/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      // Check if response is OK before parsing
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Email atau password salah!");
        }
        throw new Error(`Login failed: ${response.status}`);
      }

      const result = await response.json();

      // Store tokens in auth context/localStorage
      if (result.access_token) {
        login(result.access_token, result.refresh_token);
        setError("");
        navigate("/cart");
      } else {
        throw new Error("Token tidak ditemukan dalam response");
      }
    } catch (error) {
      setError(error.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error !== "" && (
        <div className="w-full flex justify-end p-4 fixed top-0 right-0 z-50">
          <Toast className="bg-red-500 text-white">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <ToastToggle onClick={() => setError("")} />
          </Toast>
        </div>
      )}

      <div className="w-full max-w-md mx-auto mt-20 px-4">
        <h1 className="text-2xl text-center mb-5 font-bold">LOGIN</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1">Your email</Label>
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="john@mail.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1">Your password</Label>
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="button" onClick={LoginProcces} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </>
  );
}
