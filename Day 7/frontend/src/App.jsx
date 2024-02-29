import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function App() {
  const UrlRef = useRef();
  const [shorten, setShorten] = useState(null);
  function handleUrlSubmission() {
    if (isvalid(UrlRef.current.value)) {
      console.log("valid");
      postUrl(UrlRef.current.value);
    } else {
      alert("Incorrect Input");
    }
  }
  function isvalid(url) {
    const regex =
      /^(https?:\/\/)?(([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)(\?[\w\d-]+=[\w\d-]+(&[\w\d-]+=[\w\d-]+)*)?(#\w*)?$/;

    return regex.test(url);
  }
  async function postUrl(url) {
    try {
      const response = await fetch("http://localhost:3000/urlShortner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl: url,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setShorten(data.shortUrl);
      } else {
        console.error("Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  }
  return (
    <>
      <div className=" flex justify-center w-screen h-screen items-center flex-col pt-32 pb-32">
        <h2 className="font-semibold text-3xl">URL Shortner</h2>
        <div className="flex flex-col w-full h-full pt-8 items-center gap-2">
          <div className="flex gap-4 sm:flex-row flex-col items-center mb-4">
            <input
              type="text"
              className="btn btn-outline w-[20rem] text-left"
              ref={UrlRef}
              placeholder="Paste your URL here"
            />
            <button
              className="btn btn-primary w-max text-center"
              onClick={handleUrlSubmission}
            >
              Submit
            </button>
          </div>
          {shorten && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-lg">
                Your shortend URL:{" "}
                <span className="font-bold">
                  {`http://localhost:3000/${shorten}`}
                </span>
              </p>
              <button
                className="btn"
                onClick={() =>
                  copyToClipboard(`http://localhost:3000/${shorten}`)
                }
                title="Copy To clipboard"
              >
                <FontAwesomeIcon
                  icon={faClipboard}
                  className="text-green-800"
                  size="2x"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
