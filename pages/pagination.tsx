import { text2color } from 'idea-react';
import { computed } from 'mobx';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { Column, RestTable } from 'mobx-restful-table';
import { compose, translator } from 'next-ssr-middleware';
import { Component } from 'react';
import { Badge, Container } from 'react-bootstrap';

import { PageHead } from '../components/Layout/PageHead';
import { repositoryStore } from '../models/Base';
import { i18n, t } from '../models/Translation';

export const getServerSideProps = compose(translator(i18n));

@observer
export default class PaginationPage extends Component {
  @computed
  get columns(): Column<GitRepository>[] {
    return [
      {
        key: 'full_name',
        renderHead: t('repository_name'),
        renderBody: ({ html_url, full_name }) => (
          <a target="_blank" href={html_url} rel="noreferrer">
            {full_name}
          </a>
        ),
      },
      { key: 'homepage', type: 'url', renderHead: t('home_page') },
      { key: 'language', renderHead: t('programming_language') },
      {
        key: 'topics',
        renderHead: t('topic'),
        renderBody: ({ topics }) => (
          <>
            {topics?.map(topic => (
              <Badge
                key={topic}
                className="me-2"
                bg={text2color(topic, ['light'])}
                as="a"
                target="_blank"
                href={`https://github.com/topics/${topic}`}
              >
                {topic}
              </Badge>
            ))}
          </>
        ),
      },
      { key: 'stargazers_count', type: 'number', renderHead: t('star_count') },
    ];
  }

  render() {
    return (
      <Container style={{ height: '91vh' }}>
        <PageHead title={t('pagination')} />

        <RestTable
          className="h-100 text-center"
          striped
          hover
          editable
          deletable
          columns={this.columns}
          store={repositoryStore}
          translator={i18n}
          onCheck={console.log}
        />
      </Container>
    );
  }
}
