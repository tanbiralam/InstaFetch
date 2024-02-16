const About = () => {
  return (
    <>
      <section className="py-8 md:py-16 m-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-lg bg-[#3E3232] shadow-lg">
            <div className="p-8">
              <h2 className="text-4xl font-semibold text-white mb-6">InstaFetch</h2>
              <p className="text-lg text-white">
                Welcome to InstaFetch, your premier open-source solution for effortlessly downloading Instagram photos, videos, and reels. We're committed to empowering users to access and save their favorite content with ease. InstaFetch is designed for simplicity and efficiency, allowing you to conveniently download media directly to your device for offline viewing, sharing, or archiving. The platform is open-source, welcoming contributions from developers and enthusiasts to continually improve and adapt to evolving user needs. Whether you're preserving cherished memories, seeking inspiration, or simply enjoying offline access to media, InstaFetch is here to serve you. Join us in making Instagram content more accessible and enjoyable for everyone. Try InstaFetch today!
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-[#503C3C] shadow-lg">
            <div className="p-8">
              <h2 className="text-4xl font-semibold text-white mb-6">How To Download?</h2>
              <ul className="list-disc pl-6 text-lg text-white">
                <li>Obtain the link of the post/video/story you wish to download.</li>
                <li>Paste the copied link into the input field and click the <span className="font-bold">Download</span> button.</li>
                <li>Ensure to switch the options toggle to "Video" if you intend to download a video, or select the appropriate option for other media types.</li>
                <li>Please note that this tool utilizes a free version of an API, which may result in data fetching taking approximately 10 seconds.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg bg-[#7E6363] shadow-lg sm:col-span-2">
            <div className="p-8">
              <h2 className="text-4xl font-semibold text-white mb-6">Contributing to InstaFetch</h2>
              <ul className="list-disc pl-6 text-lg text-white">
                <li>We welcome contributions from developers and enthusiasts alike to enhance the functionality and usability of InstaFetch.</li>
                <li>If you're passionate about open-source development and want to make a positive impact, there are various ways you can contribute.</li>
                <li>You can contribute by identifying and fixing bugs, adding new features, improving documentation, or even just providing feedback and suggestions.</li>
                <li>Fork the project repository on GitHub, make your changes, and submit a pull request. Our team will review your contributions and merge them into the main codebase.</li>
                <li>By contributing to InstaFetch, you're not only improving the tool for yourself but also for the entire community of users. Join us in making InstaFetch the best it can be!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
