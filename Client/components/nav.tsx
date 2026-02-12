"use client"

import Link from "next/link"
import { useSelector , useDispatch} from "react-redux"
import type { RootState } from "@/store"
import {logout} from "@/store/slices/auth-slice"

export default function Nav() {
  const dispatch = useDispatch()
  const student = useSelector((s: RootState) => s.auth?.user)
  const recruiter = useSelector((s: RootState) => s.companyAuth?.user)
  const tpoIsAuth = useSelector((s: RootState) => s.tpoAuth?.isAuthenticated)

  const isStudent = Boolean(student)
  const isRecruiter = Boolean(recruiter)
  const isTpo = Boolean(tpoIsAuth)
  const isPublic = !isStudent && !isRecruiter && !isTpo

  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="font-semibold">
          Student Careers Hub
        </Link>

        {isPublic && (
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link href="/jobs" className="hover:underline">
              Explore Jobs
            </Link>
            <Link href="/tools/resume-builder" className="hover:underline">
              Resume Builder
            </Link>
            <Link href="/tests/prep" className="hover:underline">
              Test Prep
            </Link>
            <span aria-hidden="true" className="mx-2 text-muted-foreground">
              |
            </span>
            <Link href="/register" className="hover:underline">
              Student Sign up
            </Link>
            <Link href="/login" className="hover:underline">
              Student Login
            </Link>
            <span aria-hidden="true" className="mx-2 text-muted-foreground">
              |
            </span>
            <Link href="/company/register" className="hover:underline">
              Recruiter Register
            </Link>
            <Link href="/company/login" className="hover:underline">
              Recruiter Login
            </Link>
            <span aria-hidden="true" className="mx-2 text-muted-foreground">
              |
            </span>
            <Link href="/tpo/login" className="hover:underline">
              TPO Login
            </Link>
            <Link href="/tpo/register" className="hover:underline">
              TPO Register
            </Link>
          </div>
        )}

        {isStudent && (
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/applications" className="hover:underline">
              Applications
            </Link>
            <Link href="/jobs" className="hover:underline">
              Jobs
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <Link href="/tools/resume-builder" className="hover:underline">
              Resume
            </Link>
            <Link href="/tests/prep" className="hover:underline">
              Prep
            </Link>
            <button onclick={() => dispatch(logout())}> Logout </button>
          </div>
        )}

        {isRecruiter && !isStudent && !isTpo && (
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link href="/company/dashboard" className="hover:underline">
              Recruiter Dashboard
            </Link>
            <Link href="/jobs" className="hover:underline">
              Public Jobs
            </Link>
            <Link href="/company/register" className="hover:underline">
              Add Company
            </Link>
          </div>
        )}

        {isTpo && !isStudent && !isRecruiter && (
          <div className="ml-auto flex items-center gap-3 text-sm">
            <Link href="/tpo/dashboard" className="hover:underline">
              TPO Dashboard
            </Link>
            <Link href="/jobs" className="hover:underline">
              Jobs
            </Link>
            <Link href="/applications" className="hover:underline">
              Applications
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
