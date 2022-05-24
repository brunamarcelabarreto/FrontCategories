import { HomeToolbar } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';



export const Dashboard = () => {

  return (
    <BasePageLayout
      title='Página inicial' 
      toolBar={(
        <HomeToolbar />
      )}>
      Testando

    </BasePageLayout>
  );
};