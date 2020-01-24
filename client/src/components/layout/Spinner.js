import React, {Fragment} from 'react';
import spinner from '../../img/loading.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="loading...." style={{width:'300px',margin:'auto', display:'block', paddingTop:'150px'}}/>
        </Fragment>
    )
} 

export default Spinner