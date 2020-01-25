import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link, withRouter} from 'react-router-dom'
import { createProfile, getCurrentProfile} from '../../actions/profile'

const EditProfile = ({profile:{profile, loading}, createProfile, getCurrentProfile, history}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    photo: ' ',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const [delay, setDelay] = useState(false)

  useEffect(() => {
      getCurrentProfile()
    setFormData({
        company: loading || !profile.company? ' ': profile.company,
        website: loading || !profile.website? ' ': profile.website,
        location: loading || !profile.location? ' ': profile.location,
        bio: loading || !profile.bio? '': profile.bio,
        status: loading || !profile.status? ' ': profile.status,
        photo: loading || !profile.photo? ' ': profile.photo,
        githubusername: loading || !profile.githubusername? ' ': profile.githubusername,
        skills: loading || !profile.skills? '': profile.skills.join(','),
        youtube: loading || !profile.social? '' : profile.social.youtube,
        facebook: loading || !profile.social? '': profile.social.facebook,
        twitter: loading || !profile.social? '': profile.social.twitter,
        instagram: loading || !profile.social? '': profile.social.instagram,
        linkedin: loading || !profile.social? '': profile.social.linkedin,
    })
    // eslint-disable-next-line
  }, [loading])

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    photo
  } = formData;

  const fileUpload = async e => {
    // console.log(e.target.files[0]);
    const files = e.target.files
    const data =new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'olabanji')
    setDelay(true)

    const res =await fetch(
      'https://api.cloudinary.com/v1_1/obanj/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
      const file = await res.json()


    setFormData({
      ...formData,
      photo: file.secure_url
    });

    setDelay(false)
  };
 

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault();
      createProfile( formData,history, true)
  }

  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* required field</small>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e)=> onChange(e)} >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company"value={company} onChange={(e)=> onChange(e)}/>
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={(e)=> onChange(e)} />
          <small className="form-text">
          Could be your own or a company website (e.g  https://www.google.com or http://www.google.com)
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=> onChange(e)} />
          <small className="form-text">
            State & Country suggested (eg. Lagos, NG)
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e)=> onChange(e)} />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername" 
            value={githubusername} onChange={(e)=> onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"  value={bio} onChange={(e)=> onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="form-group">
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            
            onChange={fileUpload}
          />
          {delay? (<small style={{color:'red'}}> Loading....</small>):(
            <img src={photo} alt="" style={{width: '50px'}} className="round-img"/>
          )}
          <small className="form-text">Upload your Photo</small>
        </div> 

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter"value={twitter} onChange={(e)=> onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e)=> onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e)=> onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e)=> onChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram"  value={instagram} onChange={(e)=> onChange(e)}/>
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state=>({
    profile: state.profile
})



export default connect(mapStateToProps, {createProfile,getCurrentProfile}) (withRouter( EditProfile));
