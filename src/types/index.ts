export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    wechat?:string;
    qq?:string;
  };
}

export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface ImportantMoment {
  id: string;
  date: string;
  title: string;
  description: string;
  photos: string[];
  category: 'career' | 'life' | 'travel' | 'family' | 'other';
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  about: {
    content: string;
    stats: {
      years: string;
      projects: string;
      articles: string;
      location: string;
    };
  };
  timeline: TimelineItem[];
  skills: Skill[];
  milestones: Milestone[];
  photos: Photo[];
  importantMoments: ImportantMoment[];
}

export const DEFAULT_DATA: PortfolioData = {
  personalInfo: {
    name: '孙苇町',
    title: '资深造价工程师 / 项目成本控制专家',
    subtitle: '精通工程造价与成本控制的专业人才',
    description: '专注于建筑工程造价管理与成本控制，致力于通过精准的成本分析和有效的项目管控，为客户创造最大价值。凭借扎实的专业知识和丰富的实战经验，确保每个项目都能在预算范围内高质量完成。',
    avatar: '',
    location: '南京',
    email: '515921872@qq.com',
    phone: '+86 15861828172',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      wechat: 'hetong2745',
    },
  },
  about: {
    content: '我是一名拥有8年经验的资深造价工程师，专注于建筑工程造价管理和成本控制。从项目前期的成本估算到施工过程中的变更控制，再到竣工结算审核，我享受在每一个环节中精确把控项目成本的过程。\n\n我相信优质的工程项目不仅要在技术和质量上达标，更要实现成本的有效控制。同样，专业的造价工作不仅要精确计算，更要能够预控风险，为项目决策提供可靠的数据支撑。\n\n在工作之余，我热衷于研究新的造价规范和标准，关注行业新技术如BIM在造价管理中的应用。我也喜欢通过专业论坛分享自己的经验，帮助更多的同行提升专业能力。',
    stats: {
      years: '8+',
      projects: '100+',
      articles: '20+',
      location: '南京',
    },
  },
  timeline: [
    {
      id: '1',
      type: 'work',
      title: '高级造价工程师',
      organization: '某知名建设集团',
      location: '北京',
      period: '2021 - 至今',
      description: [
        '负责大型综合体项目的全过程造价管理工作',
        '带领5人造价团队完成多个重点项目成本控制',
        '通过精细化成本管控，平均为项目节约成本8%',
        '建立企业造价管理体系，提升团队工作效率',
      ],
    },
    {
      id: '2',
      type: 'work',
      title: '造价工程师',
      organization: '工程咨询有限公司',
      location: '天津',
      period: '2018 - 2021',
      description: [
        '参与多个住宅及商业地产项目的造价咨询工作',
        '负责工程量清单及招标控制价编制',
        '开发成本分析模型，提升报价准确性',
        '获得年度优秀员工称号',
      ],
    },
    {
      id: '3',
      type: 'work',
      title: '初级造价员',
      organization: '建筑施工企业',
      location: '石家庄',
      period: '2016 - 2018',
      description: [
        '参与企业内部项目的成本核算工作',
        '负责现场签证及变更的造价审核',
        '学习并掌握各种造价软件及规范',
        '完成从实习生到正式员工的成长',
      ],
    },
    {
      id: '4',
      type: 'education',
      title: '工程管理专业',
      organization: '河北工业大学',
      location: '天津',
      period: '2012 - 2016',
      description: [
        '获得学士学位，GPA 3.7/4.0',
        '主修课程：工程造价、工程项目管理、建筑经济',
        '担任工程管理协会会长',
        '获得校级优秀毕业生称号',
      ],
    },
  ],
  skills: [
    { id: '1', name: '工程量清单编制', level: 95, category: '造价技能' },
    { id: '2', name: '广联达软件应用', level: 90, category: '造价技能' },
    { id: '3', name: '鲁班软件应用', level: 85, category: '造价技能' },
    { id: '4', name: 'BIM造价应用', level: 88, category: '造价技能' },
    { id: '5', name: '成本控制管理', level: 92, category: '项目管理' },
    { id: '6', name: '招投标管理', level: 85, category: '项目管理' },
    { id: '7', name: '合同管理', level: 80, category: '项目管理' },
    { id: '8', name: '工程结算审核', level: 90, category: '造价技能' },
    { id: '9', name: '风险评估', level: 78, category: '其他技能' },
    { id: '10', name: '成本分析', level: 88, category: '其他技能' },
    { id: '11', name: '法规规范', level: 90, category: '其他技能' },
    { id: '12', name: '工程经济', level: 85, category: '其他技能' },
  ],
  milestones: [
    {
      id: '1',
      year: '2024',
      title: '获得一级造价工程师证书',
      description: '成功通过全国一级造价工程师执业资格考试，获得执业资格证书',
      icon: 'Trophy',
    },
    {
      id: '2',
      year: '2023',
      title: '重点项目获奖',
      description: '主持完成的重点项目获得省级优质工程奖，获得业界认可',
      icon: 'Rocket',
    },
    {
      id: '3',
      year: '2022',
      title: '团队领导角色',
      description: '晋升为项目成本控制部主管，带领10人团队完成多个重要项目',
      icon: 'Users',
    },
    {
      id: '4',
      year: '2021',
      title: '职业发展新篇章',
      description: '加入知名建设集团，开启造价工程师职业生涯的新阶段',
      icon: 'Target',
    },
    {
      id: '5',
      year: '2020',
      title: '咨询业务突破',
      description: '个人造价咨询业务服务超过20家客户，获得良好口碑',
      icon: 'Star',
    },
    {
      id: '6',
      year: '2019',
      title: 'BIM技术认证',
      description: '完成BIM造价师专业进修课程，获得行业认证',
      icon: 'Globe',
    },
    {
      id: '7',
      year: '2018',
      title: '独立项目成功',
      description: '首次独立负责大型项目造价管理，成功交付并获得好评',
      icon: 'Heart',
    },
    {
      id: '8',
      year: '2016',
      title: '职业生涯起步',
      description: '从河北工业大学毕业后，正式开启造价工程师职业生涯',
      icon: 'Zap',
    },
  ],
  photos: [],
  importantMoments: [],
};
