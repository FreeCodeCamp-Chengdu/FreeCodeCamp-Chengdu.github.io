import { observer } from 'mobx-react';
import { compose, translator } from 'next-ssr-middleware';
import { Container, Table } from 'react-bootstrap';

import { PageHead } from '../components/Layout/PageHead';
import { i18n, t } from '../models/Translation';

export const getServerSideProps = compose(translator(i18n));

const AboutPage = observer(() => (
  <Container as="main" fluid="lg" className="mx-auto p-4">
    <PageHead title={t('about_us')} />

    <h1 className="text-center my-4">{t('about_us')}</h1>
    <p className="fs-5 text-center">
      fCC 成都社区, 成立于 2016 年 6
      月，是一个非营利性的公益性技术社区，是由一群热血有志青年爱好者，利用个人业余休息时间组建而成的技术社区，目的是为了搭建一个友好的交流、学习、互助的社区，帮助成都市众多的开发者，技术爱好者提升个人技术能力。社区致力于做西南地区首个有温度与情怀的技术社区，鼓励人人皆可编程实现个人梦想。
    </p>

    <section className="my-5">
      <h2 className="text-center text-primary">什么是 FCC</h2>
      <p className="fs-5 lh-lg">
        freeCodeCamp（简称 FCC）是由美国人 Quincy Larson 发起的开源项目，截止
        2018-02-03，在 Github 上获得 29+万 Star（教育类排名第一）。有长达 1600
        小时的课程，
        并且是基于浏览器、课程免费、证书免费、结合了游戏化闯关的乐趣。FCC
        是一个在 160 多个国家和 2000 多个城市的拥有与 1000k+ 开发者的社区。
      </p>
      <p className="fs-5 lh-lg">
        {/* cspell:disable-next-line */}
        2016 年 4 月，由 DevEco （晋剑 + Miya）将 FCC 引入中国，并举办了 2000+
        开发者参与的在线全民编程活动，到目前为止，已成功举办了 100+ 场 Coffee &
        Code / 编程黑客松 / 编程静修日等活动。在 FCC China ， 有 20+%
        的女性加入到了社区学习、提升编程能力。
      </p>
    </section>

    <section className="my-5">
      <h2 className="text-center text-primary">{t('our_mission')}</h2>
      <p className="fs-5 lh-lg">让更多人享受编程的乐趣，并改变自己的生活。</p>
    </section>

    <section className="my-5">
      <h2 className="text-center text-primary">FCC 成都社区活动</h2>
      <h3 className="text-primary mt-4 mb-3">大型活动</h3>
      <ul className="fs-5 lh-lg">
        <li>FCC 成都社区 React 技术专场交流活动</li>
        <li>2017 成都首届 Web 前端交流大会</li>
        <li>新耀杯 Code for City 黑客松大赛</li>
      </ul>

      <h3 className="text-primary mt-4 mb-3">历史活动</h3>
      <div className="table-responsive">
        <Table striped bordered hover className="mt-3">
          <thead className="table-primary">
            <tr>
              <th className="text-center">序号</th>
              <th className="text-center">日期</th>
              <th className="text-center">主题</th>
              <th className="text-center">形式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td>20160609</td>
              <td>线下活动开启，宣布社区成立</td>
              <td>编程讨论</td>
            </tr>
            <tr>
              <td className="text-center">2</td>
              <td>20160703</td>
              <td>携手编程-成都社区主页初版</td>
              <td>动手编程</td>
            </tr>
            <tr>
              <td className="text-center">3</td>
              <td>20160911</td>
              <td>结对编程的理念</td>
              <td>个人分享 + 结对编程</td>
            </tr>
            <tr>
              <td className="text-center">4</td>
              <td>20161106</td>
              <td>Console 的九大命令 + 学习路线分享</td>
              <td>个人分享</td>
            </tr>
            <tr>
              <td className="text-center">5</td>
              <td>20161119</td>
              <td>Git 的使用与个人简历制作</td>
              <td>分享 + 编程</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <p className="text-center fst-italic mt-2">
        显示部分历史活动，完整列表请参考原文档
      </p>
    </section>

    <section className="my-5">
      <h2 className="text-center text-primary">为什么是 FCC 成都社区</h2>
      <p className="fs-5 lh-lg">
        在成都众多的技术大会、技术分享活动当中，很多的活动以技术分享为幌子，做着产品推广与宣传的事情，这导致了成都
        IT 圈子技术分享的氛围越来越差，大家参与分享的热情越来越低。
      </p>
      <p className="fs-5 lh-lg">
        FCC
        成都社区的众多小伙伴，一致认为是时候为这座热爱的城市做一份自己的贡献了，社区提出所有活动全部免费参加、嘉宾分享内容中广告零容忍，成立嘉宾分享内容审查团队，确保每一次分享都是
        100% 的干货。
      </p>
      <p className="fs-5 lh-lg">
        FCC 成都社区的小伙伴们一直明白社区所肩负的使命，带动成都 IT
        圈子技术交流的氛围，让更多的技术牛人帮助到更多的开发者，让成都成为全国
        IT 行业的先锋，让成都吸引更多 IT
        人才蓉漂。进入更多的校园普及更多的次的编程知识，倡导人人皆可编程，让成都这座城市未来充满无限可能。
      </p>
    </section>

    <section className="my-5">
      <h2 className="text-center text-primary">FCC 成都社区规划</h2>
      <ol className="fs-5 lh-lg">
        <li>走进更多校园，普及人人皆可编程思想帮助更多的孩子们。</li>
        <li>
          继续坚持做好两周一次的【Coffee and
          Code】的结对编程活动、编程道场活动，一对一指导开发者提升个人技术能力。
        </li>
        <li>
          做好季度技术专场活动，让成都众多 IT 公司加入其中进行分享，带动成都 IT
          圈子技术分享的热情。
        </li>
        <li>
          做好成都 Web
          前端交流大会，让国内一线技术大咖来到成都，给成都众多开发者带来国内一线开发公司的技术心得与经验。
        </li>
        <li>
          联合成都众多大型 IT
          公司，做好编程马拉松活动，让成都的众多开发者进行技术火花的碰撞。
        </li>
      </ol>
    </section>

    <section className="my-5">
      <h2 className="text-center text-primary">{t('our_team')}</h2>
      <p className="fs-5 lh-lg">。。。</p>
    </section>

    <section className="my-5">
      <h2 className="text-center text-primary">媒体报道</h2>
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-primary">四川电视台报道</h4>
              <p className="card-text">四川电视台黑客松报道</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-primary">成都市高新电视台报道</h4>
              <p className="card-text">
                2017 成都 Web 前端交流大会 (6 分 53 秒处)
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-primary">
                四川财富广播 FM94.0 采访
              </h4>
              <p className="card-text">
                FCC 成都社区：“人人皆可编程”，以独特的方式为城市带来美好改变
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-primary">四川日报报道</h4>
              <p className="card-text">
                揭秘“黑客马拉松”：喝 6 瓶红牛、24 小时里只睡 2 小时
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Container>
));

export default AboutPage;
