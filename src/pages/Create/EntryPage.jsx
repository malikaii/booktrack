import React, { useEffect, useRef, useState } from "react";
// import { Textarea } from "@heroui/input";
import { Textarea } from "@heroui/react";

function EntryPage() {
  const date = new Date();
  const currentDate = date.toString().substring(0, 15);

  const [titles, setTitles] = useState([]);
  const [error, setError] = useState("");
  const dbApiUrl = import.meta.env.VITE_API_URL;

  const textRef = useRef(null);
  const selectRef = useRef(null);

  async function handleSubmitEntry(e) {
    e.preventDefault();

    setError("");
    let entryValue = textRef.current?.value;
    let selectValue = selectRef.current?.value;

    try {
      if (
        entryValue === "" ||
        entryValue === null ||
        selectValue === "" ||
        selectValue === null
      ) {
        throw new Error("Must enter for both fields!");
      }

      const response = await fetch(`${dbApiUrl}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookTitle: selectValue,
          entry: entryValue,
          date: currentDate
        }),
      });

      const data = await response.json();

      console.log("Values: ", data);
    } catch (error) {
      setError(error.message);
    }

    clearInput()
  }

  const fetchTitles = async () => {
    const res = await fetch(`${dbApiUrl}/titles`);
    const data = await res.json();

    setTitles(data);
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  const clearInput = () => {
    if (textRef.current) {
      // Check if the ref is attached
      textRef.current.value = "";
    }
  };

  return (
    <>
      <div className="create-container">
        <div id="entry-section">
          <h1>Create your journal entry</h1>
          <div>
            {/* <h5>Step 1.</h5> */}
            <label>Choose a title from your list </label>
            <select ref={selectRef} name="title-list" id="list">
              {titles?.map((title, i) => (
                <option key={i} value={title.bookTitle}>
                  {title.bookTitle}
                </option>
              ))}
            </select>
          </div>

          <p>{currentDate}</p>
          <textarea
            placeholder="Write your text here"
            ref={textRef}
            rows={15}
            cols={125}
            name="entry"
            id=""
          ></textarea>
          <div>
            <button onClick={handleSubmitEntry}>Submit</button>
          </div>
          {/* <Textarea
            className="max-w-xs"
            label="Description"
            placeholder="Enter your description"
          /> */}
        </div>
      </div>
    </>
  );
}

export default EntryPage;
