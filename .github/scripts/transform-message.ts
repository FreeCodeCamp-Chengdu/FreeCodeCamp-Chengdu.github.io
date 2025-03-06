import { components } from 'npm:@octokit/openapi-types';
import { stdin } from 'npm:zx';

type GitHubSchema = components['schemas'];

type GitHubUser = GitHubSchema['simple-user'];

interface GitHubAction
  extends Record<'event_name' | 'actor' | 'server_url' | 'repository', string> {
  action?: string;
  ref?: string;
  ref_name?: string;
  event: {
    head_commit?: GitHubSchema['git-commit'];
    issue?: GitHubSchema['webhook-issues-opened']['issue'];
    pull_request?: GitHubSchema['pull-request'];
    discussion?: GitHubSchema['discussion'];
    comment?: GitHubSchema['issue-comment'];
    release?: GitHubSchema['release'];
  };
}

// Helper functions
const getActionText = (action?: string) =>
  action === 'closed' ? '关闭' : action?.includes('open') ? '打开' : '编辑';

const createLink = (href: string, text = href) => ({ tag: 'a', href, text });

const createText = (text: string) => ({ tag: 'text', text });

// create user link
const createUserLink = (user: GitHubUser) =>
  user ? createLink(user.html_url, user.login) : createText('无');

const createContentItem = (
  label: string,
  value?: string | { tag: string; text: string },
) =>
  [
    createText(label),
    typeof value === 'string'
      ? createText(value || '无')
      : value || createText('无'),
  ] as [object, object];

type EventHandler = (
  event: GitHubAction,
  actionText: string,
) => {
  title: string;
  content: [object, object][];
};

// Event handlers
const eventHandlers: Record<string, EventHandler> = {
  push: ({
    event: { head_commit },
    ref,
    ref_name,
    server_url,
    repository,
    actor,
  }) => ({
    title: 'GitHub 代码提交',
    content: [
      [createText('提交链接：'), createLink(head_commit!.url)],
      [
        createText('代码分支：'),
        createLink(`${server_url}/${repository}/tree/${ref_name}`, ref),
      ],
      [createText('提交作者：'), createLink(`${server_url}/${actor}`, actor)],
      [createText('提交信息：'), createText(head_commit!.message)],
    ],
  }),

  issues: ({ event: { issue } }, actionText) => ({
    title: `GitHub issue ${actionText}：${issue?.title}`,
    content: [
      [createText('链接：'), createLink(issue!.html_url)],
      [
        createText('作者：'),
        createLink(issue!.user!.html_url!, issue!.user!.login),
      ],
      [
        createText('指派：'),
        issue?.assignee
          ? createLink(issue.assignee.html_url!, issue.assignee.login)
          : createText('无'),
      ],
      [
        createText('标签：'),
        createText(issue?.labels?.map(({ name }) => name).join(', ') || '无'),
      ],
      [createText('里程碑：'), createText(issue?.milestone?.title || '无')],
      [createText('描述：'), createText(issue?.body || '无')],
    ],
  }),

  pull_request: ({ event: { pull_request } }, actionText) => ({
    title: `GitHub PR ${actionText}：${pull_request?.title}`,
    content: [
      [createText('链接：'), createLink(pull_request!.html_url)],
      [
        createText('作者：'),
        createLink(pull_request!.user.html_url, pull_request!.user.login),
      ],
      [
        createText('指派：'),
        pull_request?.assignee
          ? createLink(
              pull_request.assignee.html_url,
              pull_request.assignee.login,
            )
          : createText('无'),
      ],
      [
        createText('标签：'),
        createText(
          pull_request?.labels?.map(({ name }) => name).join(', ') || '无',
        ),
      ],
      [
        createText('里程碑：'),
        createText(pull_request?.milestone?.title || '无'),
      ],
      [createText('描述：'), createText(pull_request?.body || '无')],
    ],
  }),

  discussion: ({ event: { discussion } }, actionText) => ({
    title: `GitHub 讨论 ${actionText}：${discussion?.title || '无'}`,
    content: [
      createContentItem('链接：', discussion?.html_url),
      createContentItem(
        '作者：',
        createUserLink(discussion!.user as GitHubUser),
      ),
      createContentItem('描述：', discussion?.body || '无'),
    ],
  }),

  issue_comment: ({ event: { comment, issue } }) => ({
    title: `GitHub issue 评论：${issue?.title || '未知 issue'}`,
    content: [
      createContentItem('链接：', comment?.html_url),
      createContentItem('作者：', createUserLink(comment!.user!)),
      createContentItem('描述：', comment?.body || '无'),
    ],
  }),

  discussion_comment: ({ event: { comment, discussion } }) => ({
    title: `GitHub 讨论评论：${discussion?.title || '无'}`,
    content: [
      createContentItem('链接：', comment?.html_url),
      createContentItem('作者：', createUserLink(comment!.user!)),
      createContentItem('描述：', comment?.body || '无'),
    ],
  }),

  release: ({ event: { release } }) => ({
    title: `GitHub Release 发布：${release!.name || release!.tag_name}`,
    content: [
      createContentItem('链接：', release!.html_url),
      createContentItem('作者：', createUserLink(release!.author)),
      createContentItem('描述：', release!.body!),
    ],
  }),
};

// Main processor
const processEvent = (event: GitHubAction) => {
  const { event_name, action } = event;
  const actionText = getActionText(action);
  const handler = eventHandlers[event_name];

  if (!handler) throw new Error(`No handler found for event: ${event_name}`);

  try {
    return handler(event, actionText);
  } catch (cause) {
    throw new Error(
      `Error processing ${event_name} event: ${(cause as Error).message}`,
      { cause },
    );
  }
};

// Main execution：Processing GitHub Events and Outputting Results
const event = JSON.parse((await stdin()) || '{}') as GitHubAction;
const zh_cn = processEvent(event);

if (zh_cn) console.log(JSON.stringify({ post: { zh_cn } }));
else
  throw new Error(
    `Unsupported ${event.event_name} event & ${event.action} action`,
  );
