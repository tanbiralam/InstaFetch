import { cn } from "../lib/utils";
import { AnimatedList } from "./ui/animatedList";
import PropTypes from 'prop-types';


let notifications = [
  {
    name: "Copy the Link",
    description: "Get the link from Instagram",
    time: "15m ago",
    icon: "1️⃣",
    color: "#00C9A7",
  },
  {
    name: "Paste the Link",
    description: "Paste it in the download box",
    time: "10m ago",
    icon: "2️⃣",
    color: "#FFB800",
  },
  {
    name: "Click Download",
    description: "Wait a few seconds",
    time: "5m ago",
    icon: "3️⃣",
    color: "#FF3D71",
  },
  {
    name: "Download Your Video",
    description: "Click download again (last time)",
    time: "2m ago",
    icon: "4️⃣",
    color: "#1E86FF",
  },
];




notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg font-bold">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

Notification.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export function AnimatedListDemo() {
  return (
    <div className="relative flex max-h-[400px] min-h-[400px] w-full max-w-[32rem] flex-col overflow-hidden rounded-lg border bg-transparent p-6 ">
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} className=""/>
        ))}
      </AnimatedList>
    </div>
  );
}
