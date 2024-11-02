import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Rating from "react-rating";

const Card = ({ movie }) => {
  return (
    <Link className="movie" to={`/movies/${movie._id}`}>
      <h3 className="movie__title limit">{movie.title}</h3>
      <div className="movie__rate">
        {
          <Rating
          emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: "#e4dccb" }} />}
          fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: "#ffd233" }} />}
          fractions={1}
          initialRating={movie.rating}
          readonly={true}
          />
        }
      </div>
      <div className="movie__img">
        <img src={`/server/${movie.img}`} alt={movie.title} />
      </div>
      <div className="movie__instructor">
        <p className="movie__instructor__title">動画作成者</p>
        <p className="movie__instructor__body">{movie.instructor}</p>
      </div>
      <div className="movie__comment">
        <p className="movie__comment__title">動画の感想</p>
        <p className="movie__comment__body limit">{movie.comment}</p>
      </div>
    </Link>
  );
};

export default Card;
