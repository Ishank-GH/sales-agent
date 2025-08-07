import { Sparkle, Webcam, House, Settings, Target } from 'lucide-react'
import { CallStatusEnum } from '../../src/generated/prisma'

export const sidebarData = [
  {
    id: 1,
    title: 'Home',
    icon: House,
    link: '/home',
  },
  {
    id: 2,
    title: 'Webinars',
    icon: Webcam,
    link: '/webinars',
  },
  {
    id: 3,
    title: 'Leads',
    icon: Target,
    link: '/lead',
  },
  {
    id: 4,
    title: 'Ai Agents',
    icon: Sparkle,
    link: '/ai-agents',
  },

  {
    id: 5,
    title: 'Settings',
    icon: Settings,
    link: '/settings',
  },
]

export const onBoardingSteps = [
  { id: 1, title: 'Create a webinar', complete: false, link: '' },
  { id: 2, title: 'Get leads', complete: false, link: '' },
  { id: 3, title: 'Conversion status', complete: false, link: '' },
]

export const potentialCustomer = [
  {
    id: '1',
    name: 'John Doe',
    email: 'Johndoe@gmail.com',
    clerkId: '1',
    profileImage: '/vercel.svg',
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ['New', 'Hot Lead'],
    callStatus: CallStatusEnum.COMPLETED,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'Johndoe@gmail.com',
    clerkId: '2',
    profileImage: '/vercel.svg',
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ['New', 'Hot Lead'],
    callStatus: CallStatusEnum.COMPLETED,
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'Johndoe@gmail.com',
    clerkId: '3',
    profileImage: '/vercel.svg',
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    tags: ['New', 'Hot Lead'],
    callStatus: CallStatusEnum.COMPLETED,
  },
]