"use client";
import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="relative w-32 h-32">
        <motion.img
          src="/logo.svg"
          alt="Logo"
          className="w-full h-full"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-primary rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <motion.p
        className="absolute bottom-10 text-xl font-medium text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
};

export default Loader;
