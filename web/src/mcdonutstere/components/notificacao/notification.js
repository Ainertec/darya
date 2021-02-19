import React from 'react';
import {
    Snackbar,
    IconButton,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

import { useAlert } from '../../contexts/alertN';


export default function Notification() {
    const { abrir, setAbrir, msg } = useAlert();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAbrir(false);
    };

    return (
        <div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={abrir}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
