import {
  Container,
  Drawer,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  NavLink,
} from 'idea-react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import dynamic from 'next/dynamic';
import { Component } from 'react';

import { Name } from '../../models/configuration';
import { i18n, I18nContext } from '../../models/Translation';

const LanguageMenu = dynamic(() => import('./LanguageMenu'), { ssr: false });

@observer
export class MainNavigator extends Component<{}, typeof i18n> {
  static contextType = I18nContext;

  declare context: typeof i18n;

  @observable accessor open = false;

  show = action(() => (this.open = true));

  hide = action(() => (this.open = false));

  renderLinks() {
    const { t } = this.context;

    return (
      <NavbarNav className="flex-fill" onClick={this.hide}>
        <NavLink href="/article">{t('article')}</NavLink>
        <NavLink href="/article/editor">Git pager</NavLink>
        <NavLink href="/activity">{t('activity')}</NavLink>
        <NavLink href="/weekly">{t('weekly')}</NavLink>
        <NavLink href="/article/Wiki/community">{t('community')}</NavLink>
        <NavLink href="/article/Wiki/_posts/Profile/about">{t('about')}</NavLink>
        <NavLink
          target="_blank"
          href="https://github.com/FreeCodeCamp-Chengdu/FreeCodeCamp-Chengdu.github.io"
        >
          {t('source_code')}
        </NavLink>
      </NavbarNav>
    );
  }

  render() {
    return (
      <Navbar className="fixed-top bg-light" theme="light" expand="sm">
        <Container>
          <NavbarBrand href="/">{Name}</NavbarBrand>

          <NavbarToggler expanded={this.open} aria-label="Toggle navigation" onClick={this.show} />

          <Drawer
            className="w-100"
            bodyClassName="d-flex"
            title={Name}
            responsive="sm"
            placement="end"
            open={this.open}
            onDismiss={this.hide}
          >
            {this.renderLinks()}

            <LanguageMenu />
          </Drawer>
        </Container>
      </Navbar>
    );
  }
}
