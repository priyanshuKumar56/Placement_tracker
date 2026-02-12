import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Skill = { name: string; level?: "beginner" | "intermediate" | "advanced" }
export type Project = { id: string; title: string; description?: string; url?: string; skills?: string[] }
export type Experience = { id: string; company: string; role: string; start: string; end?: string; details?: string }
export type Education = { degree: string; institution: string; start: string; end?: string; cgpa?: string }
export type Preference = { locations: string[]; roles: string[]; types: ("full-time" | "internship" | "contract")[] }
export type ResumeFile = { id: string; name: string; dataUrl: string; uploadedAt: string }
export type Certificate = { id: string; name: string; issuer?: string; date?: string; url?: string }
export type Achievement = { id: string; title: string; date?: string; description?: string }

type ProfileState = {
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education | null
  preference: Preference
  resumes: ResumeFile[]
  certificates: Certificate[]
  achievements: Achievement[]
}

const initialState: ProfileState = {
  skills: [],
  projects: [],
  experience: [],
  education: null,
  preference: { locations: [], roles: [], types: [] },
  resumes: [],
  certificates: [],
  achievements: [],
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addSkill(state, action: PayloadAction<Skill>) {
      state.skills.push(action.payload)
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((s) => s.name !== action.payload)
    },
    upsertProject(state, action: PayloadAction<Project>) {
      const idx = state.projects.findIndex((p) => p.id === action.payload.id)
      if (idx >= 0) state.projects[idx] = action.payload
      else state.projects.push(action.payload)
    },
    removeProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload)
    },
    upsertExperience(state, action: PayloadAction<Experience>) {
      const idx = state.experience.findIndex((e) => e.id === action.payload.id)
      if (idx >= 0) state.experience[idx] = action.payload
      else state.experience.push(action.payload)
    },
    removeExperience(state, action: PayloadAction<string>) {
      state.experience = state.experience.filter((e) => e.id !== action.payload)
    },
    setEducation(state, action: PayloadAction<Education | null>) {
      state.education = action.payload
    },
    setPreference(state, action: PayloadAction<Preference>) {
      state.preference = action.payload
    },
    addResume(state, action: PayloadAction<ResumeFile>) {
      state.resumes.unshift(action.payload)
    },
    removeResume(state, action: PayloadAction<string>) {
      state.resumes = state.resumes.filter((r) => r.id !== action.payload)
    },
    addCertificate(state, action: PayloadAction<Certificate>) {
      state.certificates.unshift(action.payload)
    },
    removeCertificate(state, action: PayloadAction<string>) {
      state.certificates = state.certificates.filter((c) => c.id !== action.payload)
    },
    addAchievement(state, action: PayloadAction<Achievement>) {
      state.achievements.unshift(action.payload)
    },
    removeAchievement(state, action: PayloadAction<string>) {
      state.achievements = state.achievements.filter((a) => a.id !== action.payload)
    },
  },
})

export const {
  addSkill,
  removeSkill,
  upsertProject,
  removeProject,
  upsertExperience,
  removeExperience,
  setEducation,
  setPreference,
  addResume,
  removeResume,
  addCertificate,
  removeCertificate,
  addAchievement,
  removeAchievement,
} = profileSlice.actions

export default profileSlice.reducer
