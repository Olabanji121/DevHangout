import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

const PostItem = ({
  auth,
  post: { _id, text, name, user, likes, comments, date, avatar, photo }
}) => {
  const userPhoto = (
    <img
      src={photo}
      alt="user"
      className="round-img"
      style={{ width: "200px", height: "200px" }}
    />
  );

  const userDefault = (
    <img
      src={avatar}
      alt="user"
      className="round-img"
      style={{ width: "200px", height: "200px" }}
    />
  );

  return (
    <div>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            {photo ? userPhoto : userDefault}
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
          </p>
          <button type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i> <span>{likes.length > 0 &&(
                 <span className="comment-count">{likes.length}</span>
            )}</span>
          </button>
          <button type="button" className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion {comments.length > 0 &&(
                 <span className="comment-count">{comments.length}</span>
            )}
           
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);
