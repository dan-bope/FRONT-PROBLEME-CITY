import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
  // Chargement de la page
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  // pour afficher l'image en front
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  // pour envoyer l'image en back
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    // on recupère l'image pour la prevualisation au niveau du front
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    // Pour envoyer l'image à la bdd
    setFile(e.target.files[0]);
    // Pour permettre à l'image d'avoir sa place.
    setVideo("");
  };

  const handlePost = async () => {
    if (message || postPicture || video) {
      // Nous allons pouvoir envoyer tout ça à notre back
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) {
        data.append("file", file);
      } else {
          data.append("video", video);
      }


      // On envoie les données dans la base de données
      await dispatch(addPost(data));
      // Ensuite on demande à la base de donnée de nous le renvoyer Comme ça on aura le nouveau post crée
      dispatch(getPosts());
      // On remet tout à zero
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) {
      setIsLoading(false);
      // prend en charge la video
      const handleVideo = () => {
        // Nous cherchons le lien transmise par l'utilisateur
        // Nous séparons les phrases à chaque espace espaces
        let findLink = message.split(" ");
        // Ensuite nous allons enumérer le message
        for (let i = 0; i < findLink.length; i++) {
          if (
            findLink[i].includes("https://www.yout") ||
            findLink[i].includes("https://yout")
          ) {
            let embed = findLink[i].replace("watch?v=", "embed/");
            setVideo(embed.split("&")[0]);
            // On enleve le lien de la video sur le post
            findLink.splice(i, 1);
            setMessage(findLink.join(" "));
            // Pour permettre à la video d'avoir sa place.
            setPostPicture("");
          }
        }
      };
      handleVideo();
    }
  }, [userData, message, video]);
  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse">
        </i>
      ) : (
        <>
          {/*
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          */}
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Exprimez - vous par rapport à votre cité !"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      >
                      </iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                    <h3>
                      {" "}
                      <span> Photo/Vidéo</span>
                    </h3>
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                )}
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}

                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
