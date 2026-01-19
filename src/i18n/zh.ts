import { Translation } from './types';

export const zh: Translation = {
  nav: {
    home: '首页',
    about: '关于',
    courses: '课程',
    universities: '大学',
    companies: '公司',
    medical: '医疗旅游',
    login: '登录',
    signup: '注册',
    dashboard: '仪表板',
    logout: '退出'
  },
  home: {
    hero: {
      title: '通过TOPIK Pro掌握韩语',
      subtitle: '免费多语言TOPIK备考平台,助您在韩国开启职业机会',
      cta: '立即开始学习'
    },
    features: {
      title: '为什么选择TOPIK Pro?',
      feature1: {
        title: 'AI智能学习',
        desc: '根据您的水平和目标定制学习计划'
      },
      feature2: {
        title: '大学与就业匹配',
        desc: '连接庆山地区的大学和企业'
      },
      feature3: {
        title: '永久免费',
        desc: '完全免费的TOPIK备考'
      }
    }
  },
  medical: {
    hero: {
      title: 'K-医疗健康之旅',
      subtitle: '在庆山体验世界级医疗服务与韩方传统医学',
      cta: '预约健康检查'
    },
    packages: {
      title: '健康检查套餐',
      basic: {
        title: '基础健康检查',
        desc: '血液检查、尿检、胸部X光、心电图 - 约2小时'
      },
      comprehensive: {
        title: '综合精密检查',
        desc: '全身扫描 + CT/MRI + 内窥镜 - 约4小时'
      },
      cancer: {
        title: '五大癌症筛查套餐',
        desc: '胃癌、大肠癌、肝癌、肺癌、乳腺癌专项筛查 - 约5小时'
      },
      vip: {
        title: 'VIP尊享检查',
        desc: '高端健康检查 + 专属协调员 + 豪华轿车服务 - 约6小时'
      }
    },
    hanyang: {
      title: '韩方调理项目',
      subtitle: '检查后通过个性化韩医治疗恢复身心健康',
      digestive: {
        title: '消化系统针灸艾灸',
        desc: '改善消化不良、肠胃障碍 - 约60分钟'
      },
      musculoskeletal: {
        title: '筋骨推拿疗法',
        desc: '缓解颈肩腰痛 - 约45分钟'
      },
      stress: {
        title: '减压药针治疗',
        desc: '缓解压力、安定身心 - 约50分钟'
      },
      constitutional: {
        title: '体质定制中药',
        desc: '根据个人体质开处中药 - 约30分钟'
      }
    },
    benefits: {
      title: '庆山医疗旅游的优势',
      benefit1: {
        title: '价格合理',
        desc: '比大城市便宜30-50%'
      },
      benefit2: {
        title: '无需等待',
        desc: '预约即可检查,当天出结果'
      },
      benefit3: {
        title: '综合调理',
        desc: '西医 + 传统韩医的协同效应'
      },
      benefit4: {
        title: '医疗翻译支持',
        desc: '11种语言医疗翻译及陪同服务'
      }
    },
    booking: {
      title: '预约健康检查',
      name: '姓名',
      email: '电子邮箱',
      phone: '电话号码',
      nationality: '国籍',
      checkupDate: '希望日期',
      package: '检查套餐',
      hanyang: '韩方项目(可选)',
      interpreter: '需要翻译',
      submit: '立即预约'
    }
  },
  auth: {
    login: {
      title: '登录您的账户',
      email: '电子邮箱',
      password: '密码',
      submit: '登录',
      noAccount: '还没有账户?',
      signupLink: '在此注册'
    },
    signup: {
      title: '创建账户',
      name: '全名',
      email: '电子邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      nativeLanguage: '母语',
      targetLevel: '目标TOPIK等级',
      purpose: '学习目的',
      submit: '注册',
      hasAccount: '已有账户?',
      loginLink: '在此登录'
    }
  },
  dashboard: {
    title: '我的仪表板',
    currentLevel: '当前等级',
    targetLevel: '目标等级',
    progress: '进度',
    todayTasks: '今日任务',
    startLearning: '开始学习',
    takeMockExam: '参加模拟考试',
    viewResults: '查看结果'
  },
  diagnostic: {
    title: '等级诊断测试',
    clickToStart: '点击开始等级诊断！',
    subtitle: '测试您当前的水平，并获得个性化学习计划',
    testInfo: {
      title: '测试信息',
      duration: '测试时间：约20分钟',
      questions: '题目数量：30题',
      areas: '评估领域：听力、阅读、写作',
      results: '结果：立即查看'
    },
    startButton: '开始测试'
  },
  common: {
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    view: '查看',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    bookNow: '立即预约',
    learnMore: '了解更多'
  }
};
