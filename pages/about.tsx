import { observer } from 'mobx-react';
import { compose, translator } from 'next-ssr-middleware';
import { Container } from 'react-bootstrap';

import { PageHead } from '../components/Layout/PageHead';
import { i18n, t } from '../models/Translation';
import styles from '../styles/About.module.less';

export const getServerSideProps = compose(translator(i18n));

const AboutPage = observer(() => (
  <Container as="main" className={styles.main}>
    <PageHead title={t('about_us')} />

    <h1 className="text-center my-4">{t('about_us')}</h1>
    <p className="fs-5 text-center">
      FCC 成都社区, 成立于 2016 年 6
      月，是一个非营利性的公益性技术社区，是由一群热血有志青年爱好者，利用个人业余休息时间组建而成的技术社区，目的是为了搭建一个友好的交流、学习、互助的社区，帮助成都市众多的开发者，技术爱好者提升个人技术能力。社区致力于做西南地区首个有温度与情怀的技术社区，鼓励人人皆可编程实现个人梦想。
    </p>

    <section className="my-5">
      <h2>{t('our_mission')}</h2>
      <p className="fs-5">让更多人享受编程的乐趣，并改变自己的生活。</p>
    </section>

    <section className="my-5">
      <h2>{t('our_team')}</h2>
      <p className="fs-5">。。。</p>
    </section>
  </Container>
));

export default AboutPage;
