import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide key={`guide`} name={trim(name)} />
        {Array(50)
          .fill('')
          .map((item, index) => (
            <Guide key={`guide${index}`} name={trim(name)} />
          ))}
      </div>
    </PageContainer>
  );
};

export default HomePage;
