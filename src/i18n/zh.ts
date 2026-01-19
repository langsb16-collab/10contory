import { Translation } from './types';

export const zh: Translation = {
  nav: {
    home: '首页',
    about: '关于',
    courses: '课程',
    universities: '大学',
    companies: '公司',
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
  common: {
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    view: '查看',
    loading: '加载中...',
    error: '错误',
    success: '成功'
  }
};
