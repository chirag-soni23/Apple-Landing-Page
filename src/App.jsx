import { Canvas } from "@react-three/fiber";
import React from "react";
import MacCanvas from "./canvas/MacCanvas";
import { motion } from "framer-motion";

const navbarItems = ["Mac", "iPad", "Services", "iOS", "Products"];

const navVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut", duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ease: "easeOut", duration: 0.5 } },
};

const App = () => {
  return (
    <div className="w-screen h-screen bg-black text-white relative overflow-hidden">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="absolute top-0 w-full flex justify-center z-30"
      >
        <motion.ul className="flex space-x-10 py-6 text-sm font-semibold tracking-wide">
          {navbarItems.map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              whileHover={{
                y: -3,
                scale: 1.1,
                color: "#ffffff",
                textShadow: "0px 0px 8px #ffffff",
              }}
              className="cursor-pointer text-gray-400"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      <motion.div className="absolute top-1/4 left-12 z-20 max-w-lg">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl font-bold tracking-tight leading-tight"
        >
          The Future of MacBook Pro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-gray-400 text-lg"
        >
          Power, speed, and elegance—redefined. Experience the ultimate laptop
          experience.
        </motion.p>

        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "#ffffff",
            color: "#000",
            boxShadow: "0 0 20px #fff",
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 border border-gray-500 rounded-lg text-sm font-semibold transition-all"
        >
          Explore Now
        </motion.button>
      </motion.div>

      <MacCanvas />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, yoyo: Infinity, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 flex flex-col items-center space-y-2"
      >
        <div className="animate-bounce w-3 h-3 rounded-full bg-white"></div>
        <p className="text-sm">Scroll down</p>
      </motion.div>
    </div>
  );
};

export default App;
