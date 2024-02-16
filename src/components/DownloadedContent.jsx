import React, { useRef } from "react";
import insta from "../assets/insta.webp";
import refresh from "../assets/refresh.webp";

const SvgDownload = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 384 512"
  >
    <path
      fill="#fff"
      d="M360 480H24c-13.3 0-24-10.7-24-24v-24c0-13.3 10.7-24 24-24h336c13.3 0 24 10.7 24 24v24c0 13.3-10.7 24-24 24zM128 56v136H40.3c-17.8 0-26.7 21.5-14.1 34.1l152.2 152.2c7.5 7.5 19.8 7.5 27.3 0l152.2-152.2c12.6-12.6 3.7-34.1-14.1-34.1H256V56c0-13.3-10.7-24-24-24h-80c-13.3 0-24 10.7-24 24z"
    />
  </svg>
);

const DownloadedContent = ({ image, video, type }) => {
  const anchorRef = useRef(null);

  const handleSecondButtonClick = () => {
    window.location.reload();
  }

  

  const handleDownload = () => {
    const fileURL = type === "photo" ? image.secure_url : video.secure_url;
    const fileName = type === "photo" ? "photo.jpg" : "video.mp4";

    fetch(fileURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        if (anchorRef.current) {
          anchorRef.current.href = url;
          anchorRef.current.setAttribute("download", fileName);
          anchorRef.current.click();
        }
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Optionally, you can inform the user about the error
        alert("Error downloading file. Please try again later.");
      });
  };



  return (
    <>
      <section className="flex flex-col">
        <div className="bg-white border rounded-md max-w-[400px] overflow-hidden">
          {/* Top Area */}
          <div className="flex gap-2 items-center p-2">
            <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
              <img src={insta} alt="Instagram Logo" />
            </div>
            <p className="font-medium ">Instagram</p>
          </div>

          {/* Image and Download Button */}
          <div className="w-[400px] h-[400px] relative">
            <img
              className="w-full h-full object-cover"
              src={image.secure_url}
              alt=""
            />
            <div className="px-4 absolute bottom-2 w-full">
              <button
                type="button"
                className="flex justify-center items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                onClick={handleDownload}
              >
                <SvgDownload />
                <span className="ml-3">Download Now</span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex justify-center mt-4 items-center font-semibold bg-[#a40acb] text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:ring-green-300 w-full"
          onClick={handleSecondButtonClick}
        >
          {/* Add icon or text for the second button */}
          <span className="ml-3">Download with app SnapInsta</span>
        </button>
        <button
          type="button"
          className="flex justify-center mt-2 items-center bg-[#95a4a7] text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-full"
          onClick={handleSecondButtonClick}
        >
          <img src={refresh} alt="refresh" className="h-[20px] w-[20px]" />
          <span className="ml-3 font-semibold">Download More</span>
        </button>

        {/* Hidden anchor for initiating download */}
        <a ref={anchorRef} style={{ display: "none" }} />
      </section>
    </>
  );
};

export default DownloadedContent;
