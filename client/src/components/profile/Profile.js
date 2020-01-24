import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getByIdProfile } from "../../actions/profile";

const Profile = ({ match, getByIdProfile, profile:{profile, loading}, auth }) => {

    useEffect(()=>{
        getByIdProfile(match.params.user_id);
        // eslint-disable-next-line
    },[getByIdProfile])

  return <Fragment>
        {profile === null || loading ? <Spinner/> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
        </Fragment> }
      </Fragment>;
};

Profile.propTypes = {
    getByIdProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getByIdProfile })(Profile);
