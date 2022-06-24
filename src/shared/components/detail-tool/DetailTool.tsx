import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';


interface DetailToolProps {
  newButtonText?: string;

  showButtonSave?: boolean;
  showButtonSaveAndClose?: boolean;
  showButtonDelete?: boolean;
  showButtonNew?: boolean;
  showButtonReturn?: boolean;

  showButtonSaveLoading?: boolean;
  showButtonSaveAndCloseLoading?: boolean;
  showButtonDeleteLoading?: boolean;
  showButtonNewLoading?: boolean;
  showButtonReturnLoading?: boolean;

  onClickInSave?: () => void;
  onClickInSaveAndClose?: () => void;
  onClickInDelete?: () => void;
  onClickInNew?: () => void;
  onClickInReturn?: () => void;
}

export const DetailTool: React.FC<DetailToolProps> = ({
  newButtonText = 'Novo',
  
  showButtonSave = true,
  showButtonSaveAndClose = false,
  showButtonDelete = true,
  showButtonNew = true,
  showButtonReturn: showButtonReturn = true,

  showButtonSaveLoading = false,
  showButtonSaveAndCloseLoading = false,
  showButtonDeleteLoading = false,
  showButtonNewLoading = false,
  showButtonReturnLoading: showButtonReturnLoading = false,


  onClickInSave,
  onClickInSaveAndClose: onClickInSaveAndClose,
  onClickInDelete,
  onClickInNew,
  onClickInReturn: onClickInReturn,

}) => {
  const lessThanSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const lessThanMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <Box 
      gap={1}
      marginX={1} 
      padding={1} 
      paddingX={2} 
      display="flex" 
      alignItems="center" 
      height={theme.spacing(5)} 
      component={Paper}
    >
      {(showButtonSave && !showButtonSaveLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickInSave}
          endIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            <Box sx={{ marginTop: 0.3 }}>
              Salvar
            </Box>
          </Typography>
        </Button>
      )}

      {showButtonSaveLoading && (
        <Skeleton width={110} height={64} />

      )}

      {(showButtonSaveAndClose && !showButtonSaveAndCloseLoading && !lessThanSm && !lessThanMd) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickInSaveAndClose}
          endIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            <Box sx={{ marginTop: 0.3 }}>
            Salvar e voltar
            </Box>
          </Typography>
        </Button>
      )}

      {(showButtonSaveAndCloseLoading && !lessThanSm && !lessThanMd) && (
        <Skeleton width={170} height={64} />
      )}

      {(showButtonDelete && !showButtonDeleteLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickInDelete}
          endIcon={<Icon>delete_outline</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            <Box sx={{ marginTop: 0.3 }}>
              Apagar
            </Box>  
          </Typography>
        </Button>
      )}

      {showButtonDeleteLoading && (
        <Skeleton width={110} height={64} />
      )}

      {(showButtonNew && !showButtonNewLoading && !lessThanSm) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickInNew}
          endIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            <Box sx={{ marginTop: 0.3 }}>
              {newButtonText}
            </Box>
          </Typography>
        </Button>
      )}

      {(showButtonNewLoading && !lessThanSm) && (
        <Skeleton width={110} height={64} />
      )}

      {(showButtonReturn && !showButtonReturnLoading) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickInReturn}
          endIcon={<Icon>arrow_back_ios_new</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            <Box sx={{ marginTop: 0.3 }}>
              Voltar
            </Box>
          </Typography>
        </Button>
      )}
      
      {showButtonReturnLoading &&(
        <Skeleton width={110} height={64} />
      )}

    </Box>
  );
};