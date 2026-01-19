import { Translation } from './types';

export const zh: Translation = {
  nav: {
    home: '首页',
    about: '关于',
    courses: '课程',
    universities: '大学',
    companies: '公司',
    medical: '健康检查',
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
  medical: {
    hero: {
      title: 'K-医疗健康之旅',
      subtitle: '体验1-3天健康体检和韩方康复疗程',
      description: '庆山市结合尖端医疗设施和传统韩医治疗的特别健康旅游项目。相比大城市价格低廉，享受顶级医疗服务。'
    },
    packages: {
      basic: {
        title: '基础健康体检',
        price: '₩350,000',
        features: ['基本身体测量', '血液检查', '尿液检查', '胸部X光', '心电图检查']
      },
      comprehensive: {
        title: '精密健康体检',
        price: '₩750,000',
        features: ['包含基础体检', '腹部超声波', '胃内窥镜', 'CT扫描', '肿瘤标志物检查', '营养咨询']
      },
      cancer: {
        title: '癌症精密筛查',
        price: '₩1,200,000',
        features: ['包含精密体检', 'PET-CT', '全身MRI', '基因检测', '癌症专家咨询']
      },
      vip: {
        title: 'VIP高管套餐',
        price: '₩2,500,000',
        features: ['包含癌症筛查', '1对1专属协调员', '高级韩方治疗', '豪华酒店', '专车接送', '美食韩定食']
      }
    },
    hanyang: {
      title: '韩方康复项目',
      subtitle: '体检后调理身心的传统韩医护理',
      digestive: {
        title: '消化系统护理',
        desc: '针灸·艾灸改善消化功能'
      },
      musculoskeletal: {
        title: '肌骨系统护理',
        desc: '推拿疗法矫正脊椎·关节'
      },
      stress: {
        title: '压力缓解',
        desc: '药针·韩方疗法稳定身心'
      },
      constitutional: {
        title: '体质分析',
        desc: '四象体质诊断及定制生活指南'
      }
    },
    benefits: {
      title: '为什么选择庆山？',
      benefit1: '相比大城市费用低30-50%',
      benefit2: '等待时间最短，当日可体检',
      benefit3: '结合韩医治疗的差异化项目',
      benefit4: '岭南大学医院、庆山中央医院等可信赖医疗机构'
    },
    booking: {
      title: '预约健康体检',
      name: '姓名',
      email: '邮箱',
      phone: '电话号码',
      nationality: '国籍',
      checkupDate: '希望体检日期',
      package: '体检套餐',
      hanyang: '添加韩方项目',
      interpreter: '需要医疗翻译',
      submit: '提交预约申请'
    }
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
