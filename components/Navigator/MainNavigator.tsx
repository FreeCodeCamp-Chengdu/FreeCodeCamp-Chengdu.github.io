import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { t } from '../../models/Translation';

const LanguageMenu = dynamic(import('./LanguageMenu'), { ssr: false });

const Name = process.env.NEXT_PUBLIC_SITE_NAME || '';

export const MainNavigator: FC = observer(() => (
  <Navbar bg="light" variant="light" fixed="top" expand="sm" collapseOnSelect>
    <Container>
      <Navbar.Brand href="/">{Name}</Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-inner" />

      <Navbar.Collapse id="navbar-inner">
        <Nav className="me-auto">
          <Nav.Link href="/article">{t('article')}</Nav.Link>

          <Nav.Link href="/activity">{t('activity')}</Nav.Link>

          <Nav.Link href="/community">{t('community')}</Nav.Link>

          <Nav.Link href="/article/Wiki/_posts/Profile/about">
            {t('about')}
          </Nav.Link>

          <Nav.Link
            target="_blank"
            href="https://github.com/FreeCodeCamp-Chengdu/FreeCodeCamp-Chengdu.github.io"
          >
            {t('source_code')}
          </Nav.Link>
        </Nav>

        <LanguageMenu />
      </Navbar.Collapse>
    </Container>
  </Navbar>
));
