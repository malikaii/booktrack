import React, { useCallback, useEffect, useRef, useState } from "react";
import "./TitlesPage.css";
import { Link } from "react-router-dom";

function TitlesPage() {
  const [titles, setTitles] = useState([]);

  const dbApiUrl = import.meta.env.VITE_API_URL;


  const dropdownButton = useRef(null);
  const dropdownContent = useRef(null);

  dropdownButton.current;
  const handleDropdownClick = () => {
    let contentStyle = dropdownContent.current.style;
    console.log();
    contentStyle.display = contentStyle.display === "none" ? "block" : "none";
  };

  const fetchTitles = useCallback(async () => {
    const res = await fetch(`${dbApiUrl}/titles`);
    const data = await res.json();

    setTitles(data);
 
    
  }, [dbApiUrl]);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  return (
    <>
      <div className="titles-container">
        <header id="titles-heading">
          <h1>My Titles</h1>
        </header>
        <div className="titles-body-container">
          <section id="titles-options">
            <div className="filters">
              <button id="dropdown-button" onClick={handleDropdownClick}>
                Filters
              </button>
              <div
                id="dropdown-content"
                ref={dropdownContent}
                class="dropdown-content"
              >
                <a href="#">Option 1</a>
                <a href="#">Option 2</a>
                <a href="#">Option 3</a>
              </div>
            </div>
            <div className="search">
              <label htmlFor="name-search">Search</label>
              <input type="text" name="search" placeholder="Search by name" />
            </div>
          </section>
          <section id="titles-list">
            
            {titles?.map((title, i) => (
              <div className="title" key={i}>
                <img className="thumbnail" src={title.thumbnailSrc} alt={title.bookTitle} />
                {/* <h4 className="book-title">{title.bookTitle}</h4>{" "} */}
                <Link className="book-title" to={`/titles/${title.id}`}>{title.bookTitle}</Link>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default TitlesPage;
