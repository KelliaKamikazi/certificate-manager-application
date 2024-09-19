import '../../styles/example2.css';
import { useTranslation } from '../../useTranslation';
const Example2: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="example">
      <h1>{t('example2')}</h1>
    </div>
  );
};

export default Example2;
