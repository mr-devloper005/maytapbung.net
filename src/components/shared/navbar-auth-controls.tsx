'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

type NavbarAuthControlsProps = {
  variant?: 'default' | 'directory'
}

export function NavbarAuthControls({ variant = 'default' }: NavbarAuthControlsProps) {
  const { user, logout } = useAuth()
  const isDirectory = variant === 'directory'
  const createBtnClass = isDirectory
    ? 'hidden h-10 gap-1 rounded-full bg-[#ff8c00] px-4 text-white shadow-sm hover:bg-[#e67e00] sm:flex'
    : 'hidden h-10 gap-1 rounded-full bg-[#AE2448] px-4 text-white shadow-[0_16px_30px_rgba(174,36,72,0.24)] hover:bg-[#8e1b3b] sm:flex'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className={createBtnClass}>
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]">
          {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f]">
            <Avatar className="h-9 w-9 border border-[rgba(110,26,55,0.12)]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)] p-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-9 w-9 border border-[rgba(110,26,55,0.12)]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex flex-col">
              <span className="truncate text-sm font-medium text-[#35131f]">{user?.name}</span>
              <span className="truncate text-xs text-[#7f646b]">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuItem
            onClick={logout}
            className="mt-1 cursor-pointer justify-center rounded-lg bg-[#ff8c00] px-3 py-2.5 text-sm font-semibold text-white focus:bg-[#e67e00] focus:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
