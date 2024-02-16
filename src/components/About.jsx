const About = () => {
  return (
    <>
      <section>
        <div className="py-8 md:py-16 m-4 grid gap-6 sm:grid-cols-2">
          <div className="min-h-[100px] rounded-lg bg-orange-500 shadow">
            <div className="py-2 container mx-auto px-4">
              <div className="mb-10">
                <h2 className="text-4xl font-semibold text-white text-left">
                  InstaFetch
                </h2>
                <p className="text-lg text-white mt-4 text-left">
                  Welcome to InstaFetch, your premier open-source solution for
                  effortlessly downloading Instagram photos, videos, and reels.
                  We're committed to empowering users to access and save their
                  favorite content with ease. InstaFetch is designed for
                  simplicity and efficiency, allowing you to conveniently
                  download media directly to your device for offline viewing,
                  sharing, or archiving. Our platform is open-source, welcoming
                  contributions from developers and enthusiasts to continually
                  improve and adapt to evolving user needs. Whether you're
                  preserving cherished memories, seeking inspiration, or simply
                  enjoying offline access to media, InstaFetch is here to serve
                  you. Join us in making Instagram content more accessible and
                  enjoyable for everyone. Try InstaFetch today!
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-[100px] bg-red-500 rounded-lg ">
            <div className="min-h-[100px] rounded-lg bg-teal-500 shadow">
              <div className="py-2 container mx-auto px-4">
                <div className="mb-10">
                  <h2 className="text-4xl font-semibold text-white text-left">
                    How To Download?
                  </h2>
                  <ul className="list-disc pl-6 text-white">
                    <li>
                      Get the link of the post/video/story that you want to
                      download.
                    </li>
                    <li>
                      Paste the copied link in the{" "}
                      <span className="font-bold">Input Field</span> and hit{" "}
                      <span className="font-bold">Downloa</span> .
                    </li>
                    <li>
                      If you want to download a video, make sure to switch the
                      options toggle in "Video" to download, same goes for
                      others.
                    </li>
                    <li>
                      This tool uses a free version of an API so it will take
                      time to fetch the data (approximately 10 seconds).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
