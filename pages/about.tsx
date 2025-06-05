import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
    redirect: {
      destination: '/article/Wiki/_posts/Profile/about',
      permanent: false,
    },
  });

const AboutPage = () => null;

export default AboutPage;
