import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";

function Details() {
  const { titleId } = useParams();

  const [title, setTitle] = useState();
  //   const [error, setError] = useState();

  const dbApiUrl = import.meta.env.VITE_API_URL;

  const fetchTitleById = async (id) => {
    const res = await fetch(`${dbApiUrl}/titles/${id}`);
    const data = await res.json();
    setTitle(data);
  };

  useEffect(() => {
    fetchTitleById(titleId);
  }, []);

  return (
    <>
      <div className="details-container">
        <div className="title-section">
          {title ? (
            <div className="title-details">
              <img
                className="thumbnail-details"
                src={title.thumbnailSrc}
                alt={""}
              />
              <h4>{title.bookTitle}</h4>{" "}
              <h5>Rating: /5</h5>
              <p>Author: {title.author}</p>
              <p>Year: {title.year} </p>
              <p>Description: {title.description} </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="entry">
          <h3>
            <i>My Entry Title</i>
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat sed
            reprehenderit quas tempora. Distinctio unde error et dolor incidunt
            nam fugit excepturi, dignissimos aut omnis, adipisci quod natus
            repellat dolorum!
          </p>
        </div>
      </div>
    </>
  );
}

export default Details;
