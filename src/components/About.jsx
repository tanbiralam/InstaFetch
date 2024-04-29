import { BentoGrid, BentoGridItem } from "./ui/bentogrid";

const About = () => {
  const items = [
    {
      title: "InstaFetch",
      description: "Welcome to InstaFetch, your premier open-source solution for effortlessly downloading Instagram photos, videos, and reels. We're committed to empowering users to access and save their favorite content with ease. InstaFetch is designed for simplicity and efficiency, allowing you to conveniently download media directly to your device for offline viewing, sharing, or archiving. The platform is open-source, welcoming contributions from developers and enthusiasts to continually improve and adapt to evolving user needs. Whether you're preserving cherished memories, seeking inspiration, or simply enjoying offline access to media, InstaFetch is here to serve you. Join us in making Instagram content more accessible and enjoyable for everyone. Try InstaFetch today!",
     
    },
    {
      title: "How To Download?",
      description: "Obtain the link of the post/video/story you wish to download. Paste the copied link into the input field and click the Download button. Ensure to switch the options toggle to 'Video' if you intend to download a video, or select the appropriate option for other media types. Please note that this tool utilizes a free version of an API, which may result in data fetching taking approximately 10 seconds.",
      
    },
    {
      title: "Contributing to InstaFetch",
      description: "We welcome contributions from developers and enthusiasts alike to enhance the functionality and usability of InstaFetch. If you're passionate about open-source development and want to make a positive impact, there are various ways you can contribute. You can contribute by identifying and fixing bugs, adding new features, improving documentation, or even just providing feedback and suggestions. Fork the project repository on GitHub, make your changes, and submit a pull request. Our team will review your contributions and merge them into the main codebase. By contributing to InstaFetch, you're not only improving the tool for yourself but also for the entire community of users. Join us in making InstaFetch the best it can be!",
 
    },
  ];

  return (
    <BentoGrid className="mt-10 mb-10 max-w-7xl mx-auto grid-cols-1 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <BentoGridItem
          key={index}
          title={item.title}
          description={item.description}
          header={null}
          icon={null}
          className={null}
         
        />
      ))}
    </BentoGrid>
  );
};

export default About;
