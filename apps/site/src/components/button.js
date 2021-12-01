import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const CustomButton = styled(Button)(({ theme }) => ({
  outline: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: 'none',
  lineHeight: 'normal',
  borderRadius: 0,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    outline: 'thin solid',
    outlineColor: theme.palette.primary.contrastText,
    outlineOffset: '-1px',
  },
  '&:focus-visible': {
    outline: 'thick solid',
    outlineColor: theme.palette.primary.contrastText,
    outlineOffset: '-1px',
  },
}));

CustomButton.defaultProps = {
  disableRipple: true,
};

export default CustomButton;
