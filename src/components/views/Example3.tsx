import '../../styles/example2.css';
import { useTranslation } from '../../useTranslation';
const Example3: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="example">
      <h1>{t('example3')}</h1>
    </div>
  );
};

export default Example3;
