import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-pastel-blue/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-pastel-blue to-pastel-purple">InstaFetch</span>
        </h2>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto font-medium">
          Your premier solution for effortlessly downloading social media content
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full bg-white/90 backdrop-blur-sm shadow-pastel border-pastel-gray/20">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Our Mission</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Making social media content accessible to everyone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-800 font-medium">
                Welcome to <span className="font-semibold">InstaFetch</span> - your premier solution for effortlessly downloading Instagram photos, videos, and reels. Whether you're saving precious memories, looking for ideas, or just enjoying offline access to media, InstaFetch is here to help you.
              </p>
              <p className="text-gray-800 font-medium">
                Our tool is designed to be simple, fast, and reliable. We believe in providing a seamless experience for our users, with no registration required and no hidden fees.
              </p>
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-pastel-blue text-pastel-blue hover:bg-pastel-blue/10 font-medium"
                  onClick={() => window.open("https://github.com/tanbiralam/InstaFetch", "_blank")}
                >
                  <Github size={18} />
                  <span>View on GitHub</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full bg-white/90 backdrop-blur-sm shadow-pastel border-pastel-gray/20">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Contribute</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Help us make InstaFetch even better
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-800 font-medium">
                InstaFetch is an open-source project, and we welcome contributions from developers of all skill levels. Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.
              </p>
              <p className="text-gray-800 font-medium">
                Interested in contributing or suggesting a new feature? You're always welcome here. Join our community of developers and help us make InstaFetch the best social media downloader available.
              </p>
              <div className="pt-4">
                <Button 
                  className="bg-gradient-to-r from-pastel-blue to-pastel-purple hover:opacity-90 transition-opacity text-gray-800 font-semibold shadow-pastel"
                  onClick={() => window.open("https://github.com/tanbiralam/InstaFetch", "_blank")}
                >
                  Contribute Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
