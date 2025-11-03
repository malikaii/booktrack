import React, { useState } from "react";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import CreateModal from "./CreateModal";

function CreatePage() {
  const navigate = useNavigate();

  const dbApiUrl = import.meta.env.VITE_API_URL;

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [bookInfo, setBookInfo] = useState({
    bookTitle: "",
    description: "",
    author: "",
    publishDateYear: 0,
    pageNumber: 0,
    thumbnailSrc: "",
  });

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setBookInfo((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitBook = async () => {
    try {
      const response = await fetch(`${dbApiUrl}/titles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookInfo),
      });

      const data = await response.json();

      console.log("Book info: ", data);
    } catch (error) {
      console.error(error.message);
    }

    setBookInfo({
      bookTitle: "",
      description: "",
      author: "",
      publishDateYear: 0,
      pageNumber: 0,
      thumbnailSrc: "",
    });
  };

  return (
    <>
      <div className="create-container">
        <div id="create-section">
          <h1>
            <i>Your Literary Adventure Starts Today!</i>
          </h1>
          <p>
            Add a book to your collection or make an entry to an existing one
          </p>
          <div className="btn-group">
            <button onClick={handleOpenModal}>Add new book</button>
            <button onClick={() => navigate("/entry/new")}>Create an entry</button>
          </div>

          <div>
            <CreateModal isOpen={isOpenModal} onClose={handleCloseModal}>
              <h2>Add a new book to your collection</h2>
              {/* <p>This is the content of my modal.</p> */}
              <div>
                <input
                  onChange={onChangeValue}
                  name="bookTitle"
                  value={bookInfo?.bookTitle}
                  type="text"
                  placeholder="Book Title"
                />
                <input
                  onChange={onChangeValue}
                  name="author"
                  value={bookInfo?.author}
                  type="text"
                  placeholder="Author"
                />
                <input
                  onChange={onChangeValue}
                  name="description"
                  value={bookInfo?.description}
                  type="text"
                  placeholder="Description"
                />
                <input
                  onChange={onChangeValue}
                  name="publishDateYear"
                  value={bookInfo?.publishDateYear}
                  type="text"
                  placeholder="Publish date"
                />
                <input
                  onChange={onChangeValue}
                  name="pageNumber"
                  value={bookInfo?.pageNumber}
                  type="text"
                  placeholder="# of Pages"
                />
                <input
                  onChange={onChangeValue}
                  name="thumbnailSrc"
                  value={bookInfo?.thumbnailSrc}
                  type="text"
                  placeholder="Thumbnail image"
                />
              </div>
              <button onClick={submitBook}>Submit</button>
              <button onClick={handleCloseModal}>Close</button>
            </CreateModal>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePage;
