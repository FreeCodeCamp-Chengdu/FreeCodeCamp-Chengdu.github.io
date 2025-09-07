import { IDType } from 'mobx-restful';

export default {
  about: '關於',
  about_us: '關於我們',
  our_mission: '我們的使命',
  our_team: '我們的團隊',
  activity: '活動',
  community_description: '讓更多人享受程式設計的樂趣',
  community: '社群',
  welcome_to: '歡迎使用',
  get_started_by_editing: '開始你的專案吧，編輯',
  upstream_projects: '上游專案',
  home_page: '主頁',
  source_code: '源代碼',
  component: '元件',
  pagination: '分頁',
  powered_by: '強力驅動自',
  documentation: '文檔',
  documentation_summary: '查找有關 Next.js 功能和 API 的深入資訊。',
  learn: '學習',
  learn_summary: '在帶有測驗的交互式課程中了解 Next.js！',
  examples: '示例',
  examples_summary: '發現和部署示例 Next.js 專案。',
  deploy: '部署',
  deploy_summary: '使用 Vercel 立即將您的 Next.js 站點部署到公共 URL。',

  // Pagination Table
  create: '新增',
  submit: '提交',
  cancel: '取消',
  edit: '編輯',
  delete: '刪除',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `您確定刪除 ${keys.join('、')} 嗎？`,
  repository_name: '倉庫名',
  programming_language: '編程語言',
  topic: '話題',
  star_count: '星標數',

  // Scroll List
  scroll_list: '滾動列表',
  load_more: '加載更多……',
  no_more: '沒有更多',

  // MDX Article
  article: '文章',

  // Weekly
  weekly: 'IT 週刊',
  weekly_description: '分享最新的技術動態、開源項目和學習資源',
  no_weekly_content: '暫無週刊內容',
  weekly_content_from_github: '週刊內容將從 GitHub Issues 自動載入',
  view_on_github: '在 GitHub 上查看',
  view_all_issues: '查看所有 Issues',
  weekly_author: '作者',
  weekly_published: '發布時間',
  weekly_updated: '更新時間',
  back_to_weekly_list: '返回 IT 週刊列表',
  github_document_description: '本內容來源於 GitHub Issues，',
  view_original_on_github: '在 GitHub 上查看原文',
  weekly_issue_no_content: '此週刊暫無內容',
  open: '開放',
  closed: '已關閉',

  // Git pager
  repository: '程式碼倉庫',
  file_path: '檔案路徑',
  commit_message: '提交訊息',
  commit: '提交',
  clear: '清空',
  meta: '詮釋資料',
  content: '内容',
  copy_MarkDown: '複製 Markdown',

  // Search
  keywords: '關鍵詞',
  search_results: '搜尋結果',

  // Activity page
  activity_calendar: '活動日曆',
  activity_calendar_description: '查看 freeCodeCamp 成都社群的最新活動安排和歷史活動記錄',
  activity_list: '活動列表',
  activity_time: '時間',
  activity_location: '地點',
  view_details: '查看詳情',
  upcoming_events: '近期活動',
  view_all_activities: '查看全部活動',
} as const;
