import React, { useRef, useState } from "react";
import insta from "../assets/insta.webp";
import refresh from "../assets/refresh.webp";

// You'll need to add a YouTube icon to your assets folder
// For now, we'll use a placeholder
const youtubeIcon = "https://www.youtube.com/s/desktop/e4d15d2c/img/favicon_144x144.png";

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

const DownloadedContent = ({ image, video, title, thumbnail, format, fileName, platform, type, directUrl, author, onReset }) => {
  const anchorRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");

  const handleSecondButtonClick = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  const handleDownload = () => {
    // Handle different platforms differently
    if (platform === 'youtube') {
      if (format && format.url) {
        if (format.directDownload) {
          // For demonstration purposes, we'll simulate a download
          setIsDownloading(true);
          setDownloadMessage("Preparing download...");
          
          // Simulate download process
          setTimeout(() => {
            setDownloadMessage("Processing video...");
            
            setTimeout(() => {
              setDownloadMessage("Almost done...");
              
              setTimeout(() => {
                setIsDownloading(false);
                setDownloadMessage("");
                
                // Show a message explaining this is a demo
                alert("This is a demonstration. In a production app, the video would be downloaded through a backend service. For now, you can use the 'Watch on YouTube' button to access the video.");
              }, 1500);
            }, 1500);
          }, 1500);
        } else {
          // If not direct download, open in new tab
          window.open(format.url, '_blank');
        }
      } else if (directUrl) {
        window.open(directUrl, '_blank');
      }
    } else {
      // For Instagram, use the existing download logic
      const fileURL = type === "photo" ? image?.secure_url : video?.secure_url;
      const downloadFileName = fileName || (type === "photo" ? "photo.jpg" : "video.mp4");

      if (fileURL) {
        setIsDownloading(true);
        setDownloadMessage("Downloading...");
        
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
              anchorRef.current.setAttribute("download", downloadFileName);
              anchorRef.current.click();
            }
            setIsDownloading(false);
            setDownloadMessage("");
          })
          .catch((error) => {
            console.error("Error downloading file:", error);
            alert("Error downloading file. Please try again later.");
            setIsDownloading(false);
            setDownloadMessage("");
          });
      }
    }
  };

  // Determine the content to display
  const displayThumbnail = thumbnail || (image ? image.secure_url : null);
  const displayTitle = title || "Download";
  const displayPlatform = platform || "instagram";
  const platformIcon = displayPlatform === "youtube" ? youtubeIcon : insta;
  const platformName = displayPlatform === "youtube" ? "YouTube" : "Instagram";
  const contentType = type || "video";
  const displayAuthor = author || "";
  const qualityLabel = format?.quality || "";

  return (
    <>
      <section className="flex flex-col">
        <div className="bg-white border rounded-md max-w-[400px] overflow-hidden">
          {/* Top Area */}
          <div className="flex gap-2 items-center p-2 border-b">
            <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
              <img src={platformIcon} alt={`${platformName} Logo`} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{platformName}</p>
              {displayAuthor && <p className="text-xs text-gray-500">{displayAuthor}</p>}
            </div>
            <div className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
              {contentType}
              {qualityLabel && ` - ${qualityLabel}`}
            </div>
          </div>

          {/* Image/Thumbnail and Download Button */}
          <div className="w-full max-w-[400px] relative">
            <div className="relative pb-[100%]">
              {displayThumbnail ? (
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={displayThumbnail}
                  alt={displayTitle}
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No preview available</p>
                </div>
              )}
              
              {/* Download progress overlay */}
              {isDownloading && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mb-2"></div>
                  <p>{downloadMessage}</p>
                </div>
              )}
            </div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 truncate">
              {displayTitle}
            </div>

            <div className="px-4 absolute bottom-12 w-full">
              <button
                type="button"
                className={`flex justify-center items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring focus:ring-purple-300 w-full transition-all duration-300 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {!isDownloading && <SvgDownload />}
                <span className="ml-3">{isDownloading ? downloadMessage : "Download Now"}</span>
              </button>
            </div>

            {/* Watch on YouTube button (only for YouTube content) */}
            {platform === 'youtube' && directUrl && (
              <div className="px-4 absolute bottom-2 w-full">
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 w-full transition-all duration-300"
                >
                  <span>Watch on YouTube</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="flex justify-center mt-2 items-center bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 w-full transition-all duration-300"
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
