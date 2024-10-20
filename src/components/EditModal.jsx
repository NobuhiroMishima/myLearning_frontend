import Button from "./Button";
import InputMovieTitle from "./forms/InputMovieTitle";
import InputMovieInstructor from "./forms/InputMovieInstructor";
import InputMovieComment from "./forms/InputMovieComment";
import InputMovieImg from "./forms/InputMovieImg";
import InputMovieRating from "./forms/InputMovieRating";
import { useDispatchMovies } from "../contexts/MovieContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import moviesApi from "../api/movies.mjs";

const EditModal = ({ toggleEditModal, movie, setMovie }) => {
  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER
  const clickCancel = () => toggleEditModal();
  const dispatch = useDispatchMovies();

  const [editMovie, setEditMovie] = useState({ ...movie });
  const [previewImage, setPreviewImage] = useState(
    editMovie.img
      ? `${PUBLIC_FOLDER}${editMovie.img}`
      : `${PUBLIC_FOLDER}/uploads/noMovie.png`
  );

  const handleChangeRating = (rate) =>
    setEditMovie({ ...editMovie, rating: rate });

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("img", file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      title: editMovie.title,
      instructor: editMovie.instructor,
      comment: editMovie.comment,
      img: editMovie.img,
    },
  });

  const [error, setError] = useState("");
  const onSubmit = async (inputs) => {
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("instructor", inputs.instructor);
    formData.append("comment", inputs.comment);
    formData.append("rating", editMovie.rating);
    if (inputs.img) {
      formData.append("img", inputs.img);
    }

    try {
      const req = await moviesApi.patch(editMovie._id, formData);
      dispatch({ type: "movie/update", payload: req });
      reset();
      setMovie(req);
      toggleEditModal();
    } catch (e) {
      console.log("エラーが発生しました。", e);
      setError(e);
    }
  };

  return (
    <div className="modal-container">
      {console.log(`http://localhost:5173/server${editMovie.img}`)}
      <form className="modal form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="movie__title">{`${movie.title}を編集`}</h3>
        <InputMovieTitle register={register} errors={errors} />
        <InputMovieInstructor register={register} errors={errors} />
        <InputMovieComment register={register} errors={errors} />
        <InputMovieImg
          register={register}
          handleChangeImage={handleChangeImage}
          previewImage={previewImage}
        />
        <InputMovieRating
          rating={editMovie.rating}
          onChange={handleChangeRating}
        />

        <div className="error-msg">{error}</div>

        <div className="action-area">
          <Button className="gray" onClick={clickCancel}>
            戻る
          </Button>
          <Button type="submit" className="green">
            更新
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
