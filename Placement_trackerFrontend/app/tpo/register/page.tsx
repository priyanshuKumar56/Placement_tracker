"use client"
import { useDispatch } from "react-redux"
import { tpoRegister } from "@/store/slices/tpo-auth-slice"
import { useRouter } from "next/navigation"

export default function TpoRegisterPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">TPO Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const f = new FormData(e.currentTarget as HTMLFormElement)
          dispatch(tpoRegister({ email: String(f.get("email") || ""), name: String(f.get("name") || "") }))
          router.push("/tpo/dashboard")
        }}
        className="space-y-3"
      >
        <input name="name" required className="w-full border rounded px-3 py-2" placeholder="Name" />
        <input name="email" required type="email" className="w-full border rounded px-3 py-2" placeholder="Email" />
        <input
          name="password"
          required
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
        />
        <button className="w-full bg-primary text-primary-foreground rounded px-3 py-2">Create Account</button>
      </form>
    </main>
  )
}
