import React, {Fragment} from 'react';
import spinner from '../../img/loading.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="loading...." style={{width:'500px',margin:'auto', display:'block', paddingTop:'50px'}}/>
        </Fragment>
    )
}

export default Spinner