import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import UploadSection from "@/components/organisms/UploadSection";
import FileHistory from "@/components/organisms/FileHistory";
import StatsSection from "@/components/organisms/StatsSection";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header />
      
      <main className="pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <UploadSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatsSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <FileHistory />
        </motion.div>
      </main>
    </div>
  );
};

export default UploadPage;