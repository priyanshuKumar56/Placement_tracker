"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/slices/auth-slice"

export default function Navbar() {
  const { currentUser } = useSelector((s: RootState) => s.auth)
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()

  function handleLogout() {
    dispatch(logout())
    router.push("/")
  }

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-xl">
          Placement<span className="text-primary">Hub</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link className="text-sm hover:underline" href="/jobs">
            Jobs
          </Link>
          {currentUser && (
            <Link className="text-sm hover:underline" href="/profile">
              Profile
            </Link>
          )}
          {currentUser?.role === "student" && (
            <Link className="text-sm hover:underline" href="/student/dashboard">
              Student
            </Link>
          )}
          {currentUser?.role === "admin" && (
            <Link className="text-sm hover:underline" href="/admin/dashboard">
              Admin
            </Link>
          )}
          {currentUser?.role === "company" && (
            <>
              <Link className="text-sm hover:underline" href="/company/dashboard">
                Company
              </Link>
              <Link className="text-sm hover:underline" href="/company/jobs/new">
                Post Job
              </Link>
            </>
          )}
          {!currentUser ? (
            <>
              <Link href="/login">
                <Button variant={pathname === "/login" ? "default" : "outline"} size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Hi, {currentUser.name}</span>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
