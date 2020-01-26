import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
    photo
  }
}) => {

  const userPhoto = (
    <img src={photo } alt="user" className="round-img"  style={{width: '250px', height: '250px'}}/>
  )

  const userDefault=(
    <img src={avatar} alt="user" className="round-img"  style={{width: '250px', height: '250px'}} />
  )
  return (
    <div className="profile bg-light">
      
        {photo ? userPhoto : userDefault}  
      
      <div>
        <h2>{name}</h2>  
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
        </Link>
      </div> 
      <ul> 
          {skills.slice(0,4).map((skill, index)=>(
              <li key={index} className='text-primary'>
                  <i className='fas fa-check'></i> {skill}

              </li>
          ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
