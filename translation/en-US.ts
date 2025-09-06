import { IDType } from 'mobx-restful';

export default {
  about: 'About',
  about_us: 'About US',
  our_team: 'Our Team',
  our_mission: 'Our Mission',
  activity: 'Activity',
  community_description: 'Let more people enjoy the fun of programming',
  community: 'Community',
  welcome_to: 'Welcome to',
  get_started_by_editing: 'Get started by editing',
  upstream_projects: 'Upstream projects',
  home_page: 'Home Page',
  source_code: 'Source Code',
  component: 'Component',
  pagination: 'Pagination',
  powered_by: 'Powered by',
  documentation: 'Documentation',
  documentation_summary: 'Find in-depth information about Next.js features and API.',
  learn: 'Learn',
  learn_summary: 'Learn about Next.js in an interactive course with quizzes!',
  examples: 'Examples',
  examples_summary: 'Discover and deploy boilerplate example Next.js projects.',
  deploy: 'Deploy',
  deploy_summary: 'Instantly deploy your Next.js site to a public URL with Vercel.',

  // Pagination Table
  create: 'Create',
  submit: 'Submit',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  total_x_rows: ({ totalCount }: { totalCount: number }) => `Total ${totalCount} rows`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) => `Are you sure to delete ${keys.join(', ')}?`,
  repository_name: 'Repository Name',
  programming_language: 'Programming Language',
  topic: 'Topic',
  star_count: 'Star Count',

  // Scroll List
  scroll_list: 'Scroll List',
  load_more: 'Load more...',
  no_more: 'No more',

  // MDX Article
  article: 'Article',

  // Weekly
  weekly: 'IT Weekly',
  weekly_description: 'Share the latest tech trends, open source projects and learning resources',
  no_weekly_content: 'No weekly content available',
  weekly_content_from_github: 'Weekly content will be auto-loaded from GitHub Issues',
  view_on_github: 'View on GitHub',
  view_all_issues: 'View All Issues',
  weekly_author: 'Author',
  weekly_published: 'Published',
  weekly_updated: 'Updated',
  back_to_weekly_list: 'Back to IT Weekly List',
  github_document_description: 'This content is sourced from GitHub Issues, ',
  view_original_on_github: 'view original on GitHub',
  weekly_issue_no_content: 'This weekly issue has no content',
  open: 'Open',
  closed: 'Closed',

  // Git pager
  repository: 'repository',
  file_path: 'file path',
  commit_message: 'commit message',
  commit: 'commit',
  clear: 'clear',
  meta: 'meta',
  content: 'content',
  copy_MarkDown: 'copy Markdown',

  // Search
  keywords: 'Keywords',
  search_results: 'Search Results',

  // Activity page
  activity_calendar: 'Activity Calendar',
  activity_calendar_description:
    'View the latest activity schedules and historical activity records of freeCodeCamp Chengdu community',
  activity_list: 'Activity List',
  activity_time: 'Time',
  activity_location: 'Location',
  view_details: 'View Details',
  upcoming_events: 'Upcoming Events',
  view_all_activities: 'View All Activities',
} as const;
