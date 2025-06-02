type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Helix Labs',
    description: 'Powering DeFi with Multi-Chain Restaking.',
    link: 'https://helixlabs.org/',
    video:
      'https://agdhb3rpwe.ufs.sh/f/KFCQbXGMeH1YgsvrTSICUpJd1uYby7OFaM3nfETVQ5HINz9A',
    id: 'project1',
  },
  {
    name: 'EigenFi - Movement Vault',
    description:
      'Movement Vault is a next-generation liquid staking solution designed for the Movement Network.',
    link: 'https://movement.eigenfi.io/',
    video:
      'https://agdhb3rpwe.ufs.sh/f/KFCQbXGMeH1Yqe0EfVnni9XMJVdmvPUc6tHNZAeRsYOrGoCK',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Sulthera Startup',
    title: 'Founder',
    start: '2025',
    end: 'Present',
    link: 'https://mova.com',
    id: 'work0',
  },
  {
    company: 'GHorde',
    title: 'Co Founder',
    start: '2024',
    end: 'Present',
    link: 'https://ghorde.com',
    id: 'work1',
  },
  {
    company: 'Helix labs',
    title: 'Senior Software Engineer',
    start: '2024',
    end: 'Present',
    link: 'https://helixlabs.org',
    id: 'work2',
  },

  {
    company: 'Infinite Solutions',
    title: 'Front-end Developer',
    start: '2023',
    end: '2024',
    link: 'https://infinite.mn/',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How I Started Frontend with Next.js',
    description:
      'My journey from static sites to fullstack apps with the power of Next.js',
    link: '/blog/my-frontend-journey-nextjs',
    uid: 'blog-1',
  },
  {
    title: 'Leveling Up with Vercel, shadcn/ui & v0.dev',
    description:
      'How I started shipping polished UIs faster using modern frontend tools',
    link: '/blog/leveling-up-with-vercel-shadcn-ui-v0',
    uid: 'blog-2',
  },
  {
    title: 'Bringing It All Together in Web3',
    description: 'How I applied my frontend stack to build decentralized apps',
    link: '/blog/bringing-it-all-together-in-web3',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/tksulde',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/tksulde',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ibelick',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/aug1sth',
  },
]

export const EMAIL = 'sulde.dev@gmail.com'
