import type { ContactLink } from '../types/userConfig';

export const USER_CONFIG = {
  AVATAR_URL:
    'https://avatars.githubusercontent.com/u/44740026?v=4',
  NAME: 'Sammie',
  JOB_TITLE: 'Research Intern (Institute of Computing Technology, Chinese Academy of Sciences)',
  BIO: [
    '👨‍💻 Front | Back | Left | Right | End Engineer',
    '✨ Good People | Always stay positive and helpful',
    '🤖 AI Enthusiast | Exploring AI-powered Products',
  ],
  WECHAT_ID: 'Sammie',

  CONTACT_LINKS: [
    {
      type: 'github',
      url: 'https://github.com/szysammie',
      icon: 'fab fa-github',
      text: 'GitHub',
    },
    {
      type: 'email',
      url: 'mailto:zuyangsammie@gmail.com',
      icon: 'fas fa-envelope',
      text: '邮箱',
    },
    {
      type: 'website',
      url: 'https://sammie.vip',
      icon: 'fas fa-globe',
      text: '个人网站',
    },
    // {
    //   type: 'wechat',
    //   icon: 'fab fa-weixin',
    //   text: '微信',
    //   url: 'https://sammie.sammie.com/',
    // },
  ] as ContactLink[],
} as const;

export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
