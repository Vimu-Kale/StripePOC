import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector,useDispatch } from 'react-redux';
import { resetSnackBar } from '../../../slices/snackBarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GenericSnackBar = () => {

    const dispatch = useDispatch();

    const {open,severity,message} = useSelector(state => state.snackbar);
    const vertical = 'bottom';
    const horizontal = 'center';


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetSnackBar());
  };

  return (
    <div>
        {
            open && (
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical , horizontal }}>
                        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} >
                        {message}
                        </Alert>
                    </Snackbar>   
                </Stack>
            )
        }
       
    </div>
  )
}

export default GenericSnackBar
