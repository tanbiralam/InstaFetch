import { AnimatedListDemo } from "./AnimatedListDemo";

const About = () => {
  return (
    <div className="mt-2 flex gap-2 sm:flex-row flex-col justify-center items-center">
      <AnimatedListDemo />
      <div className="relative flex max-h-[200px] min-h-[400px] w-full max-w-[24rem] flex-col overflow-hidden rounded-lg border bg-transparent p-6">
        <h1 className="text-2xl font-bold">About Instafetch</h1>
        <p className="mt-2 text-lg">
          Welcome to <strong>InstaFetch</strong> - your premier solution for
          effortlessly downloading Instagram photos, videos, and reels. Whether
          you&apos;re saving precious memories, looking for ideas, or just
          enjoying offline access to media, InstaFetch is here to help you.
        </p>

        <h2 className="mt-2 text-lg font-semibold text-lime-600">
          Interested in contributing or suggesting a new feature? You&apos;re
          always welcome here. <a href="https://github.com/tanbiralam/InstaFetch" target="blank"><strong className="text-lime-900">Contribute</strong> </a>now!
        </h2>
      </div>
    </div>
  );
};

export default About;
