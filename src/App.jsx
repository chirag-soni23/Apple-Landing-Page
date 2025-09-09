import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MacCanvas from "./canvas/MacCanvas";
import IPhoneCanvas from "./canvas/IPhoneCanvas";
import AirPodsCanvas from "./canvas/AirPodsCanvas";
import HeadPhoneCanvas from "./canvas/HeadPhoneCanvas";
import { GridBackground } from "./background/Background";

const products = {
  Mac: {
    canvas: <MacCanvas />,
    title: "The Future of MacBook Pro",
    subtitle:
      "Power, speed, and elegance—redefined. Experience the ultimate laptop experience.",
  },
  iPhone: {
    canvas: <IPhoneCanvas />,
    title: "Meet the New iPhone",
    subtitle:
      "Revolutionary design, incredible camera, and unmatched performance in your hands.",
  },
  Pods: {
    canvas: <AirPodsCanvas />,
    title: "AirPods Reimagined",
    subtitle:
      "Immersive sound, seamless connection, and comfort that lasts all day.",
  },
  Headphone: {
    canvas: <HeadPhoneCanvas />,
    title: "Feel the Beat with Headphones",
    subtitle:
      "Crystal-clear audio, deep bass, and comfort designed for endless listening.",
  },
};

const navbarItems = ["Mac", "iPhone", "Pods", "Headphone"];

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
  const [selected, setSelected] = useState("Mac");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255,255,255,0.7)",
      mixBlendMode: "difference",
    },
    navHover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255,255,255,0.9)",
      mixBlendMode: "difference",
    },
    btnHover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255,255,255,0.9)",
      mixBlendMode: "difference",
    },
  };

  return (
    <div className="w-screen h-screen bg-black text-white relative overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <GridBackground />

      {/* Navbar */}
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
              onClick={() => setSelected(item)}
              onMouseEnter={() => setCursorVariant("navHover")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{
                y: -3,
                scale: 1.1,
                color: "#ffffff",
                textShadow: "0px 0px 8px #ffffff",
              }}
              className={`cursor-pointer ${
                selected === item ? "text-white" : "text-gray-400"
              }`}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      {/* Text Block */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected + "-text-block"}
          className="absolute top-1/4 left-12 z-20 max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl font-bold tracking-tight leading-tight">
            {products[selected].title}
          </h1>
          <p className="mt-6 text-gray-400 text-lg">
            {products[selected].subtitle}
          </p>
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
      </AnimatePresence>

      {/* Canvases */}
      <div className="absolute inset-0 z-10">
        {Object.keys(products).map((key) => (
          <motion.div
            key={key}
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: selected === key ? 1 : 0,
              y: selected === key ? 0 : 100,
            }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {products[key].canvas}
          </motion.div>
        ))}
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, repeat: Infinity, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 flex flex-col items-center space-y-2"
      >
        <div className="animate-bounce w-3 h-3 rounded-full bg-white"></div>
        <p className="text-sm">Scroll down</p>
      </motion.div>
    </div>
  );
};

export default App;
