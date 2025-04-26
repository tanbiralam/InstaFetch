import { useState, useRef, useEffect } from "react";
import DownloadedContent from "./DownloadedContent";
import DownloaderServiceFactory from "../services/common/serviceFactory";
import { motion } from "framer-motion";
import loader from "../assets/loader.svg";
import "./Tool.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Settings, Download, Eye } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

// Platform icons
import instagramIcon from "../assets/insta.webp";
// You'll need to add icons for other platforms

// Social media icons
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";

// Platform configurations
const platformConfig = {
  instagram: {
    options: ["Video", "Photo", "Story", "Reel", "IGTV"],
    qualities: ["High", "Medium", "Low"],
    formats: {
      Video: ["MP4"],
      Photo: ["JPG", "PNG"],
      Story: ["MP4", "JPG"],
      Reel: ["MP4"],
      IGTV: ["MP4"]
    }
  },
  youtube: {
    options: ["Video", "Short", "Audio"],
    qualities: ["4K", "1080p", "720p", "480p", "360p"],
    formats: {
      Video: ["MP4", "WebM"],
      Short: ["MP4"],
      Audio: ["MP3", "M4A", "WAV"]
    }
  },
  facebook: {
    options: ["Video", "Photo", "Story"],
    qualities: ["High", "Medium", "Low"],
    formats: {
      Video: ["MP4"],
      Photo: ["JPG", "PNG"],
      Story: ["MP4", "JPG"]
    }
  },
  twitter: {
    options: ["Video", "Photo", "GIF"],
    qualities: ["Best", "High", "Medium"],
    formats: {
      Video: ["MP4"],
      Photo: ["JPG", "PNG"],
      GIF: ["GIF", "MP4"]
    }
  }
};

const PlatformCard = ({ platform, icon, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(platform)}
      className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected 
          ? "bg-gradient-to-br from-pastel-blue/60 to-pastel-purple/60 shadow-pastel border border-pastel-purple/30" 
          : "bg-white/80 hover:bg-pastel-gray/20 border border-pastel-gray/30"
      }`}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className={`text-sm font-medium ${isSelected ? "text-gray-800" : "text-gray-700"}`}>
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </span>
    </motion.div>
  );
};

const OptionBadge = ({ option, isSelected, onClick }) => {
  return (
    <Badge
      variant={isSelected ? "default" : "outline"}
      className={`cursor-pointer px-3 py-1 text-sm ${
        isSelected 
          ? "bg-gradient-to-r from-pastel-blue to-pastel-purple text-gray-800 font-semibold" 
          : "bg-white text-gray-700 hover:bg-pastel-gray/20 font-medium"
      }`}
      onClick={() => onClick(option)}
    >
      {option}
    </Badge>
  );
};

const QualitySelector = ({ platform, selectedQuality, onQualityChange, selectedOption }) => {
  const qualities = platformConfig[platform].qualities;
  const formats = platformConfig[platform].formats[selectedOption];

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-4">
        <Settings className="w-5 h-5 text-gray-600" />
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Select value={selectedQuality} onValueChange={onQualityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Quality" />
            </SelectTrigger>
            <SelectContent>
              {qualities.map((quality) => (
                <SelectItem key={quality} value={quality.toLowerCase()}>
                  {quality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue={formats[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select Format" />
            </SelectTrigger>
            <SelectContent>
              {formats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const MultiPlatformDownloader = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedOption, setSelectedOption] = useState("Video");
  const [dynamicText, setDynamicText] = useState(
    "Download Videos, Photos, Reels, Stories, and IGTV from Instagram and YouTube"
  );
  const [isDownloaded, setDownloaded] = useState(false);
  const [downloadedData, setDownloadedData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState(null);
  const [error, setError] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState("high");
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Platform-specific options
  const platformOptions = {
    instagram: ["Video", "Photo", "Story", "Reel", "IGTV"],
    youtube: ["Video", "Short", "Audio"],
    facebook: ["Video", "Photo", "Story"],
    twitter: ["Video", "Photo", "GIF"],
  };

  // Handle platform selection
  const handlePlatformClick = (platform) => {
    setSelectedPlatform(platform);
    const defaultOption = platformConfig[platform].options[0];
    setSelectedOption(defaultOption);
    setSelectedQuality(platformConfig[platform].qualities[0].toLowerCase());
    setSelectedFormat(platformConfig[platform].formats[defaultOption][0]);
    setDynamicText(
      `Enter the ${platform.charAt(0).toUpperCase() + platform.slice(1)} ${defaultOption.toLowerCase()} URL to download it.`
    );
    setInputValue("");
    setError(null);
    setPreviewData(null);
  };

  // Handle option selection within a platform
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDynamicText(
      `Enter the ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} ${option.toLowerCase()} URL to download it.`
    );
    setInputValue("");
    setError(null);
  };

  // Handle quality selection for YouTube
  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
  };

  // Handle input change and platform detection
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Platform detection logic
    const url = e.target.value.toLowerCase();
    if (url.includes("instagram.com")) {
      setDetectedPlatform("instagram");
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setDetectedPlatform("youtube");
    } else if (url.includes("facebook.com") || url.includes("fb.com")) {
      setDetectedPlatform("facebook");
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      setDetectedPlatform("twitter");
    } else {
      setDetectedPlatform(null);
    }
  };

  // Apply detected platform
  const applyDetectedPlatform = () => {
    if (detectedPlatform && detectedPlatform !== selectedPlatform) {
      handlePlatformClick(detectedPlatform);
    }
  };

  // Get dynamic header text
  const getDynamicHeaderText = () => {
    if (isLoading) {
      return "Processing your request...";
    }
    
    if (error) {
      return "Oops! Something went wrong";
    }
    
    if (isDownloaded) {
      return "Your download is ready!";
    }
    
    return "Download Social Media Videos in One Click";
  };

  const handlePreview = async () => {
    if (!inputValue) return;
    
    setLoading(true);
    try {
      const service = DownloaderServiceFactory.getService(selectedPlatform);
      const preview = await service.getPreview(inputValue);
      setPreviewData(preview);
    } catch (err) {
      setError("Failed to load preview");
    } finally {
      setLoading(false);
    }
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!inputValue) {
      setError("Please enter a valid URL");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Apply detected platform if available
      if (detectedPlatform) {
        applyDetectedPlatform();
      }
      
      const service = DownloaderServiceFactory.getService(selectedPlatform);
      
      if (!service) {
        throw new Error(`Service for ${selectedPlatform} is not available`);
      }
      
      let result;
      
      switch (selectedOption.toLowerCase()) {
        case "video":
          result = await service.downloadVideo(inputValue, selectedQuality);
          break;
        case "photo":
          result = await service.downloadPhoto(inputValue);
          break;
        case "story":
          result = await service.downloadStory(inputValue);
          break;
        case "reel":
          result = await service.downloadReel(inputValue);
          break;
        case "igtv":
          result = await service.downloadIGTV(inputValue);
          break;
        case "short":
          result = await service.downloadShort(inputValue, selectedQuality);
          break;
        case "audio":
          result = await service.downloadAudio(inputValue);
          break;
        default:
          throw new Error(`Option ${selectedOption} is not supported`);
      }
      
      setDownloadedData(result);
      setDownloaded(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to download content");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setInputValue("");
    setDownloaded(false);
    setDownloadedData({});
    setError(null);
  };

  // Platform icons mapping
  const platformIcons = {
    instagram: <Instagram className="w-10 h-10 text-social-instagram" />,
    youtube: <Youtube className="w-10 h-10 text-social-youtube" />,
    facebook: <Facebook className="w-10 h-10 text-social-facebook" />,
    twitter: <Twitter className="w-10 h-10 text-social-twitter" />
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pastel-blue to-pastel-purple">
          {getDynamicHeaderText()}
        </h1>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto font-medium">
          Download high-quality content from your favorite social media platforms. Choose quality, format, and more.
        </p>
      </motion.div>

      {!isDownloaded ? (
        <Card className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm shadow-pastel border-pastel-gray/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              Select Platform & Content Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.keys(platformConfig).map((platform) => (
                <PlatformCard
                  key={platform}
                  platform={platform}
                  icon={platformIcons[platform]}
                  isSelected={selectedPlatform === platform}
                  onClick={handlePlatformClick}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {platformConfig[selectedPlatform].options.map((option) => (
                <OptionBadge
                  key={option}
                  option={option}
                  isSelected={selectedOption === option}
                  onClick={handleOptionClick}
                />
              ))}
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={`Enter ${selectedPlatform} URL here...`}
                  value={inputValue}
                  onChange={handleInputChange}
                  className="flex-1"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreview}
                        disabled={!inputValue || isLoading}
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Preview content</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {showAdvancedOptions && (
                <QualitySelector
                  platform={selectedPlatform}
                  selectedQuality={selectedQuality}
                  onQualityChange={handleQualityChange}
                  selectedOption={selectedOption}
                />
              )}

              {previewData && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    {previewData.type === "video" ? (
                      <video src={previewData.url} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={previewData.url} alt="Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {previewData.title}
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                >
                  {showAdvancedOptions ? "Hide" : "Show"} Advanced Options
                </Button>
                <Button
                  type="submit"
                  disabled={!inputValue || isLoading}
                  className="bg-gradient-to-r from-pastel-blue to-pastel-purple hover:opacity-90"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <DownloadedContent data={downloadedData} onReset={resetForm} />
      )}

      {/* Supported Platforms Section */}
      <div className="mt-16 text-center" id="features">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Supported Platforms</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2 bg-social-instagramPastel rounded-xl shadow-soft">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <span className="font-medium text-gray-800">Instagram</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2 bg-social-facebookPastel rounded-xl shadow-soft">
              <Facebook className="w-8 h-8 text-white" />
            </div>
            <span className="font-medium text-gray-800">Facebook</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2 bg-social-twitterPastel rounded-xl shadow-soft">
              <Twitter className="w-8 h-8 text-white" />
            </div>
            <span className="font-medium text-gray-800">Twitter</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2 bg-social-youtubePastel rounded-xl shadow-soft">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <span className="font-medium text-gray-800">YouTube</span>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm shadow-soft border-pastel-gray/20">
          <CardHeader>
            <div className="w-12 h-12 flex items-center justify-center mb-2 bg-pastel-blue/30 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pastel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <CardTitle>Lightning Fast</CardTitle>
            <CardDescription className="text-gray-700 font-medium">
              Download videos instantly without any waiting time or processing delays.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-soft border-pastel-gray/20">
          <CardHeader>
            <div className="w-12 h-12 flex items-center justify-center mb-2 bg-pastel-green/30 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pastel-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <CardTitle>100% Free</CardTitle>
            <CardDescription className="text-gray-700 font-medium">
              No hidden charges or subscription fees. Download as many videos as you want.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-soft border-pastel-gray/20">
          <CardHeader>
            <div className="w-12 h-12 flex items-center justify-center mb-2 bg-pastel-purple/30 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pastel-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <CardTitle>High Quality</CardTitle>
            <CardDescription className="text-gray-700 font-medium">
              Download videos in the highest available quality for the best viewing experience.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 text-center" id="how-it-works">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm shadow-soft border-pastel-gray/20">
            <CardHeader className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-pastel-blue/30 rounded-full">
                <span className="text-xl font-bold text-pastel-blue">1</span>
              </div>
              <CardTitle>Copy URL</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Copy the link to your favorite social media video
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-soft border-pastel-gray/20">
            <CardHeader className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-pastel-purple/30 rounded-full">
                <span className="text-xl font-bold text-pastel-purple">2</span>
              </div>
              <CardTitle>Paste Link</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Paste the link in the download box above
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-soft border-pastel-gray/20">
            <CardHeader className="text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-pastel-green/30 rounded-full">
                <span className="text-xl font-bold text-pastel-green">3</span>
              </div>
              <CardTitle>Download</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Click download and save your video
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-pastel-blue/40 to-pastel-purple/40 backdrop-blur-sm shadow-pastel border-pastel-gray/20">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              Ready to Download Your Videos?
            </CardTitle>
            <CardDescription className="text-gray-700 font-medium">
              Start downloading your favorite social media content now!
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-pastel-blue to-pastel-purple hover:opacity-90 transition-opacity text-gray-800 font-semibold shadow-pastel px-8 py-6"
            >
              Get Started Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MultiPlatformDownloader;
