import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from "react-moment";
import { deleteComment } from '../../actions/post'

const CommentItem = ({comment:{_id, text, name, avatar, user, photo, date}, postId, auth, deleteComment}) => {

    const userPhoto = (
        <img
          src={photo}
          alt="user"
          className="round-img"
          style={{ width: "50px", height: "50px" }}
        />
      );
    
      const userDefault = (
        <img
          src={avatar}
          alt="user"
          className="round-img"
          style={{ width: "50px", height: "50px" }}
        />
      );
    return (
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
          {photo ? userPhoto : userDefault}
    <h4>{name.trim().split(' ')[0]}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
           <p className="post-date">
              Posted <Moment format="DD/MM/YYYY">{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
              <button onClick={e=> deleteComment(_id, postId)} type='button' className="btn btn-danger">
                  <i className="fas fa-times"></i>
              </button>
          )}
        </div>
      </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps= state=>({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment}) (CommentItem)
