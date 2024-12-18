import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import { useParams, useNavigate } from "react-router-dom";
import moviesApi from "../api/movies";
import Rating from "react-rating";



const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container");
  return createPortal(children, target);
};

const Movie = () => {
  const {id} = useParams();

  const formatDate = (date) => {
    const completeDate = new Date(date);
    const year = completeDate.getFullYear();
    const month = String(completeDate.getMonth() + 1).padStart(2, '0');
    return `${year}/${month}`;
  };
  

  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await moviesApi.getOne(id);
      setMovie(res)
    }
    fetchMovie();
  }, [])

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const navigate = useNavigate();
  const goMovies = () => navigate('/movies');

  return (
    <>
      <div className="detail">
        <h1 className="movie__title">{movie.title}</h1>
        <div className="movie__complete">
          <p className="movie__complete__title">完了日</p>
          <p className="movie__complete__body">{formatDate(movie.complete)}</p>
        </div>
        <div className="movie__img">
          <img
            src={`${movie.img}`}
            alt={`${movie.title}`}
          />
        </div>
        <div className="movie__instructor">
          <p className="movie__instructor__title">動画作成者</p>
          <p className="movie__instructor__body">{movie.instructor}</p>
        </div>
        <div className="movie__comment">
          <p className="movie__comment__title">動画の感想</p>
          <p className="movie__comment__body">{movie.comment}</p>
        </div>
        <div className="movie__rate">
        <Rating
          emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: "#e4dccb" }} />}
          fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: "#ffd233" }} />}
          fractions={1}
          initialRating={movie.rating}
          readonly={true}
          />
        </div>
        <div className="action-area">
          <Button className="green" onClick={toggleEditModal}>
            編集
          </Button>
          <Button className="red" onClick={toggleDeleteModal}>
            削除
          </Button>
        </div>
      </div>

      {isEditModalOpen && (
        <ModalPortal>
          <EditModal toggleEditModal={toggleEditModal} movie={movie} setMovie={setMovie} />
        </ModalPortal>
      )}

      {isDeleteModalOpen && (
        <ModalPortal>
          <DeleteModal toggleDeleteModal={toggleDeleteModal} movie={movie} />
        </ModalPortal>
      )}

      <div className="go-home">
        <Button className="gray" onClick={goMovies}>
          戻る
        </Button>
      </div>
    </>
  );
};

export default Movie;
