import React from 'react';
import {
    Button
} from '@material-ui/core/';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { useHistory } from 'react-router-dom';

export default function BotaoVoltar({ dado }) {

    const history = useHistory();
    function handleNavigateAntes() {
        history.push(dado);
    };

    return (
        <div>
            <Button onClick={handleNavigateAntes} variant="outlined" color="primary" style={{ margin: 20 }}>
                <SkipPreviousIcon /> Voltar
            </Button>
        </div>
    );
}