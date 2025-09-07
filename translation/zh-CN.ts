import { IDType } from 'mobx-restful';

export default {
  about: '关于',
  about_us: '关于我们',
  our_mission: '我们的使命',
  our_team: '我们的团队',
  activity: '活动',
  community_description: '让更多人享受编程的乐趣',
  community: '社区',
  welcome_to: '欢迎来到',
  get_started_by_editing: '开始你的项目吧，编辑',
  upstream_projects: '上游项目',
  home_page: '主页',
  source_code: '源代码',
  component: '组件',
  pagination: '分页',
  powered_by: '强力驱动自',
  documentation: '文档',
  documentation_summary: '查找有关 Next.js 功能和 API 的深入信息。',
  learn: '学习',
  learn_summary: '在带有测验的交互式课程中了解 Next.js！',
  examples: '示例',
  examples_summary: '发现和部署示例 Next.js 项目。',
  deploy: '部署',
  deploy_summary: '使用 Vercel 立即将您的 Next.js 站点部署到公共 URL。',

  // Pagination Table
  create: '新增',
  submit: '提交',
  cancel: '取消',
  edit: '编辑',
  delete: '删除',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `您确定删除 ${keys.join('、')} 吗？`,
  repository_name: '仓库名',
  programming_language: '编程语言',
  topic: '话题',
  star_count: '星标数',

  // Scroll List
  scroll_list: '滚动列表',
  load_more: '加载更多……',
  no_more: '没有更多',

  // MDX Article
  article: '文章',

  // Weekly
  weekly: 'IT 周刊',
  weekly_description: '分享最新的技术动态、开源项目和学习资源',
  no_weekly_content: '暂无周刊内容',
  weekly_content_from_github: '周刊内容将从 GitHub Issues 自动加载',
  view_on_github: '在 GitHub 上查看',
  view_all_issues: '查看所有 Issues',
  weekly_author: '作者',
  weekly_published: '发布时间',
  weekly_updated: '更新时间',
  back_to_weekly_list: '返回 IT 周刊列表',
  github_document_description: '本内容来源于 GitHub Issues，',
  view_original_on_github: '在 GitHub 上查看原文',
  weekly_issue_no_content: '此周刊暂无内容',
  open: '开放',
  closed: '已关闭',

  // Git pager
  repository: '代码仓库',
  file_path: '文件路径',
  commit_message: '提交信息',
  commit: '提交',
  clear: '清空',
  meta: '元数据',
  content: '内容',
  copy_MarkDown: '复制 Markdown',

  // Search
  keywords: '关键词',
  search_results: '搜索结果',

  // Activity page
  activity_calendar: '活动日历',
  activity_calendar_description: '查看 freeCodeCamp 成都社区的最新活动安排和历史活动记录',
  activity_list: '活动列表',
  activity_time: '时间',
  activity_location: '地点',
  view_details: '查看详情',
  upcoming_events: '近期活动',
  view_all_activities: '查看全部活动',
} as const;
