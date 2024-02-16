import { useState, useRef } from "react";
import DownloadedContent from "./DownloadedContent";
import { getData } from "../../utils/upload";

import paste from "../assets/paste.svg";
import loader from "../assets/loader.svg";
import down from "../assets/down.svg";


import "./Tool.css";

const ToolDownloader = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("Video");
  const [dynamicText, setDynamicText] = useState(
    "Download Videos, Photos, Reels, Stories, and IGTV from Instagram"
  );
  const [isDownloaded, setDownloaded] = useState(false);
  const [downloadedData, setDownloadedData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isPasted, setIsPasted] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDynamicText(
      `Enter the Instagram ${option.toLowerCase()} URL to download it.`
    );
    setInputValue("");
  };

  const handlePasteClick = () => {
    navigator.clipboard.readText().then((clipText) => {
      setInputValue(clipText);
      setIsPasted(true);
    });
  };

  const handleClearClick = () => {
    setInputValue("");
    setIsPasted(false);
    inputRef.current.focus();
  };

  const getDynamicHeaderText = () => {
    const headers = {
      Video: "Instagram Downloader",
      Photo: "Instagram Photo Downloader",
      Story: "Instagram Story Downloader",
      Reel: "Instagram Reel Downloader",
      IGTV: "Instagram IGTV Downloader",
    };
    return headers[selectedOption] || "Instagram Downloader";
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (inputValue) {
      setLoading(true);
      try {
        const response = await getData(
          inputValue,
          selectedOption.toLowerCase()
        );
        if (response) {
          console.log("response::::::::::::::", response);
          setDownloadedData(response, response);
          setDownloaded(true);
        }
      } catch (error) {
        console.error("Error downloading data: ", error);
        alert(
          "An error occurred while downloading the data. Please try again."
        ); // Displaying the error alert
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* Download Input Section */}
      <section
        className="py-16 bg-[#3E3232]"
      >
        <div className="container mx-auto text-center text-gray">
          <div className="flex flex-row justify-center items-center space-x-4 text-white font-normal">
            {["Video", "Photo", "Story", "Reel", "IGTV"].map((option) => (
              <div
                key={option}
                className={`border p-2 rounded-md cursor-pointer transition-opacity gap-2
                  ${
                    selectedOption === option
                      ? "bg-transparent"
                      : "bg-transparent"
                  }
            transition-all duration-300 
            hover:scale-105 hover:bg-opacity-50

            ${window.innerWidth <= 640 ? "text-sm" : "text-md"}
            flex items-center sm:w-24 w-10 sm:justify-center`}
                onClick={() => handleOptionClick(option)}
              >
                <span className="d-inline-flex items-center">
                  {option === "Video" && (
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_705_1280)">
                        <path
                          d="M9.91745 7.54857L13.1525 9.4619C13.2459 9.51719 13.3233 9.59587 13.3771 9.6902C13.4309 9.78452 13.4592 9.89124 13.4592 9.99982C13.4592 10.1084 13.4309 10.2151 13.3771 10.3094C13.3233 10.4038 13.2459 10.4824 13.1525 10.5377L9.91745 12.4511C9.82251 12.5073 9.71439 12.5373 9.60407 12.5382C9.49375 12.5391 9.38516 12.5107 9.28934 12.456C9.19352 12.4014 9.11389 12.3223 9.05852 12.2269C9.00316 12.1314 8.97404 12.0231 8.97412 11.9127V8.0869C8.97404 7.97658 9.00316 7.8682 9.05852 7.77277C9.11389 7.67735 9.19352 7.59828 9.28934 7.5436C9.38516 7.48892 9.49375 7.46057 9.60407 7.46145C9.71439 7.46232 9.82251 7.49238 9.91745 7.54857Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.8 17.5H5.80005C5.13701 17.5 4.50112 17.2366 4.03228 16.7678C3.56344 16.2989 3.30005 15.663 3.30005 15V5C3.30005 4.33696 3.56344 3.70107 4.03228 3.23223C4.50112 2.76339 5.13701 2.5 5.80005 2.5H15.8C16.4631 2.5 17.099 2.76339 17.5678 3.23223C18.0367 3.70107 18.3 4.33696 18.3 5V15C18.3 15.663 18.0367 16.2989 17.5678 16.7678C17.099 17.2366 16.4631 17.5 15.8 17.5Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_705_1280">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.800049)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )}

                  {option === "Photo" && (
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_705_1379)">
                        <path
                          d="M16.764 17.5H3.43571C2.99368 17.5 2.56976 17.3244 2.2572 17.0118C1.94464 16.6993 1.76904 16.2754 1.76904 15.8333V4.16667C1.76904 3.72464 1.94464 3.30072 2.2572 2.98816C2.56976 2.67559 2.99368 2.5 3.43571 2.5H16.764C17.2061 2.5 17.63 2.67559 17.9426 2.98816C18.2551 3.30072 18.4307 3.72464 18.4307 4.16667V15.8333C18.4307 16.2754 18.2551 16.6993 17.9426 17.0118C17.63 17.3244 17.2061 17.5 16.764 17.5Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M7.94488 6.32186C8.10406 6.4756 8.23103 6.65951 8.31838 6.86285C8.40573 7.06619 8.45171 7.28489 8.45363 7.50619C8.45555 7.72749 8.41339 7.94695 8.32958 8.15178C8.24578 8.35661 8.12203 8.54269 7.96554 8.69918C7.80905 8.85567 7.62296 8.97943 7.41814 9.06323C7.21331 9.14703 6.99384 9.1892 6.77255 9.18727C6.55125 9.18535 6.33255 9.13937 6.12921 9.05203C5.92587 8.96468 5.74196 8.83771 5.58821 8.67852C5.28462 8.36419 5.11663 7.94318 5.12042 7.50619C5.12422 7.06919 5.2995 6.65117 5.60852 6.34216C5.91753 6.03315 6.33555 5.85786 6.77255 5.85407C7.20954 5.85027 7.63054 6.01826 7.94488 6.32186Z"
                          fill="white"
                        ></path>
                        <path
                          d="M18.4331 13.3332L14.9173 10.5207C14.8318 10.4523 14.7337 10.4014 14.6286 10.3709C14.5234 10.3404 14.4133 10.3309 14.3045 10.343C14.1957 10.355 14.0903 10.3884 13.9944 10.4412C13.8985 10.4941 13.814 10.5652 13.7456 10.6507L10.9656 14.1257C10.8972 14.2112 10.8127 14.2824 10.7168 14.3352C10.6209 14.388 10.5155 14.4214 10.4067 14.4335C10.2979 14.4456 10.1878 14.4361 10.0826 14.4056C9.9775 14.3751 9.87939 14.3242 9.79394 14.2557L8.23727 13.0099C8.06691 12.8736 7.8499 12.8096 7.63286 12.8316C7.41582 12.8536 7.21605 12.9598 7.07644 13.1274L3.43311 17.4999"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_705_1379">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.0998535)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  )}

                  {option === "Story" && (
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_705_1387)">
                        <path
                          d="M2.96484 7.33383C3.45786 5.93948 4.32729 4.70885 5.47681 3.77832"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M2.5 10.0005C2.5 10.9374 2.66889 11.8316 2.96488 12.6671"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M17.2189 3.25127C17.3582 3.39064 17.4687 3.55609 17.5441 3.73817C17.6195 3.92025 17.6583 4.11539 17.6582 4.31246C17.6582 4.50952 17.6193 4.70465 17.5439 4.88669C17.4684 5.06874 17.3579 5.23415 17.2185 5.37346C17.0791 5.51278 16.9137 5.62328 16.7316 5.69865C16.5495 5.77403 16.3544 5.8128 16.1573 5.81276C15.9602 5.81272 15.7651 5.77386 15.583 5.69841C15.401 5.62296 15.2356 5.51239 15.0963 5.37302C14.8149 5.09154 14.6569 4.70982 14.657 4.31183C14.6571 3.91384 14.8152 3.53218 15.0967 3.25082C15.3782 2.96946 15.7599 2.81144 16.1579 2.81152C16.5559 2.81161 16.9376 2.96979 17.2189 3.25127Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M14.9915 3.38081C14.004 2.71013 12.8788 2.26915 11.6986 2.09026C10.5183 1.91137 9.31303 1.99911 8.17114 2.34705"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9.55846 7.38494L13.0091 9.42581C13.1088 9.48478 13.1914 9.56871 13.2487 9.66932C13.3061 9.76993 13.3363 9.88376 13.3363 9.99958C13.3363 10.1154 13.3061 10.2292 13.2487 10.3298C13.1914 10.4304 13.1088 10.5144 13.0091 10.5733L9.55846 12.6142C9.45719 12.6741 9.34186 12.7062 9.22418 12.7071C9.10651 12.7081 8.99069 12.6778 8.88848 12.6195C8.78627 12.5612 8.70133 12.4768 8.64227 12.3751C8.58322 12.2733 8.55216 12.1577 8.55225 12.04V7.95916C8.55216 7.84148 8.58322 7.72588 8.64227 7.62409C8.70133 7.52231 8.78627 7.43797 8.88848 7.37964C8.99069 7.32131 9.10651 7.29108 9.22418 7.29201C9.34186 7.29294 9.45719 7.32501 9.55846 7.38494Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M5.47689 16.1985C5.09463 15.896 4.74113 15.5589 4.4209 15.1914"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M8.17114 17.6536C9.36678 18.0175 10.631 18.0961 11.8625 17.8832C13.094 17.6704 14.2585 17.172 15.2627 16.4279C16.2668 15.6839 17.0827 14.7149 17.6449 13.5987C18.207 12.4825 18.4999 11.2502 18.4999 10.0004C18.4999 9.51774 18.4501 9.04753 18.3683 8.58887"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_705_1387">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.5)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  )}

                  {option === "Reel" && (
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_705_1399)">
                        <path
                          d="M17.5667 17.5H4.23332C3.79129 17.5 3.36737 17.3244 3.05481 17.0118C2.74225 16.6993 2.56665 16.2754 2.56665 15.8333V4.16667C2.56665 3.72464 2.74225 3.30072 3.05481 2.98816C3.36737 2.67559 3.79129 2.5 4.23332 2.5H17.5667C18.0087 2.5 18.4326 2.67559 18.7452 2.98816C19.0577 3.30072 19.2333 3.72464 19.2333 4.16667V15.8333C19.2333 16.2754 19.0577 16.6993 18.7452 17.0118C18.4326 17.3244 18.0087 17.5 17.5667 17.5Z"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M2.56665 6.6665H19.2333"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M7.56665 6.66667L8.39998 2.5"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.3999 6.66667L14.2332 2.5"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_705_1399">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.899902)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  )}

                  {option === "IGTV" && (
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.4453 3.66699C14.9168 3.66699 15.369 3.8543 15.7025 4.18772C16.0359 4.52114 16.2232 4.97335 16.2232 5.44487"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15.334 1C17.2985 1 18.8897 2.5912 18.8897 4.55575"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M16.223 8.11168V12.5564C16.223 13.0279 16.0357 13.4801 15.7023 13.8135C15.3689 14.1469 14.9167 14.3343 14.4451 14.3343H3.77788C3.30635 14.3343 2.85414 14.1469 2.52073 13.8135C2.18731 13.4801 2 13.0279 2 12.5564V5.44487C2 4.97335 2.18731 4.52114 2.52073 4.18772C2.85414 3.8543 3.30635 3.66699 3.77788 3.66699H11.7783"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M5.55566 17H12.6672"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  )}
                </span>
                <span className="sm:inline-block hidden">{option}</span>
              </div>
            ))}
          </div>

          {/* Title Text */}
          <h1 className="sm:text-3xl text-[20px] font-bold mt-6 text-white">
            {getDynamicHeaderText()}
          </h1>
          <p className="sm:text-[17px] text-[15px] text-white">{dynamicText}</p>

          {/* Url Input and Download */}
          <form
            className="mt-6 mr-4 ml-4 rounded-md relative flex flex-col justify-center overflow-hidden md:flex-row md:items-center"
            onSubmit={submitHandler}
          >
            {/* Input */}
            <div className="relative md:w-1/3">
              <input
                type="text"
                value={inputValue}
                id="url"
                ref={inputRef}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                required
                placeholder="Enter the Instagram URL"
                className="w-full h-10 rounded-md py-2 px-4 text-gray-800 placeholder-gray-500 bg-white font-semibold z-10 relative"
                onChange={(e) => setInputValue(e.target.value)}
              />

              {/* Paste Icon */}

              {isPasted && (
                <div
                  className="absolute top-0 right-2 flex items-center  bg-[#ECB159]  border border-black bg-white-500 p-2 rounded-md  cursor-pointer z-20"
                  onClick={handleClearClick}
                >
                  <span className="mr-1 font-medium text-sm">Clear</span>{" "}
                  <span className="text-gray-600 h-4 w-4 font-bold flex justify-center items-center">
                    X
                  </span>
                </div>
              )}
              {!isPasted && (
                <div
                  className="absolute top-0 right-2 gap-2 flex items-center bg-[#ECB159]/100 border border-black bg-white-500 p-2 rounded-md cursor-pointer z-20"
                  onClick={handlePasteClick}
                >
                  <img src={paste} alt="Paste Icon" className="h-4 w-4" />
                  <span className="mr-1 font-medium text-sm">Paste</span>{" "}
                </div>
              )}
            </div>

            {/* Download Button */}
            <button
              id="download-btn"
              className="justify-center bg-[#211C6A] gap-2 font-medium text-[18px] text-white py-2 px-5 rounded-md ml-4 mr-4 flex items-center space-x-2 hover:bg-[#747264] mt-2 md:mt-0 md:w-auto"
              onClick={submitHandler}
            >
              <img src={down} alt="Download Icon" className="h-4 w-4" />
              Download
            </button>
          </form>
        </div>
      </section>

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-center">
              <img
                src={loader}
                alt="Loading..."
                className="w-16 h-16 animate-spin"
              />
            </div>
          </div>
        </div>
      )}

      {/* Downloaded Content Section */}

      {isDownloaded && (
        <section className="container mx-auto p-5 flex justify-center items-center">
          {downloadedData.image && (
            <DownloadedContent
              image={downloadedData.image}
              video={downloadedData.video}
              type={selectedOption.toLowerCase()}
            />
          )}
          {downloadedData.images && (
            <div>
              {downloadedData.images.map((image, index) => (
                <DownloadedContent
                  key={index}
                  image={image}
                  type={selectedOption.toLowerCase()}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ToolDownloader;
