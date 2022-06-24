
import { DetailTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';



export const Dashboard = () => {

  return (
    <BasePageLayout
      title='Página inicial' 
      toolBar={(
        <DetailTool 
          showButtonNew
          showButtonSaveAndClose
          showButtonReturn
          
        />
      )} 
    >
      Testando

    </BasePageLayout>
  );
};