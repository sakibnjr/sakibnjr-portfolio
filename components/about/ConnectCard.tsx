import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type Platform = "github" | "linkedin" | "instagram";

interface LinkItem {
  icon: React.ReactElement;
  url: string;
  label: string;
}

const links: Record<Platform, LinkItem> = {
  github: {
    icon: <FaGithub />,
    url: "https://github.com/sakibnjr",
    label: "GitHub Profile",
  },
  linkedin: {
    icon: <FaLinkedin />,
    url: "https://linkedin.com/in/sakibnjr",
    label: "LinkedIn Profile",
  },
  instagram: {
    icon: <FaInstagram />,
    url: "https://www.instagram.com/not_ewr_sakib/",
    label: "Instagram Profile",
  },
};

const ConnectCard: React.FC = () => {
  const [active, setActive] = useState<Platform>("github");

  const handleCopy = () => {
    navigator.clipboard.writeText(links[active].url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full bg-card border border-border/50 rounded-xl shadow-lg p-6 dark:bg-background"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground"
      >
        Connect With Me
      </motion.h2>

      <div className="flex justify-center space-x-6 mb-6">
        {Object.entries(links).map(([key, { icon, label }]) => (
          <motion.button
            key={key}
            onClick={() => setActive(key as Platform)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative group flex flex-col items-center ${
              active === key ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <span className="text-2xl mb-1">{icon}</span>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-6">
              {label}
            </span>
            {active === key && (
              <motion.div
                layoutId="activePlatform"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex items-center justify-between bg-background/50 border border-border/50 text-foreground font-mono px-4 py-3 rounded-lg"
      >
        <span className="truncate">{links[active].url}</span>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-muted-foreground hover:text-primary transition-colors ml-4"
        >
          <FiCopy className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ConnectCard;
