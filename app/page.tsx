"use client";

import { ButtonLinks } from "@/components/ButtonLinks";
import FeatureOneSVG from "@/components/icons/FeatureOneSVG";
import FeatureTwoSVG from "@/components/icons/FeatureTwoSVG";
import FeatureThreeSVG from "@/components/icons/FeatureThreeSVG";
import { motion } from "motion/react";
import ImageCarousel from "@/components/ImageCarousel";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Brand Name Section */}
      <div className="relative z-20 py-6 px-10 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue/60  to-green/60 text-transparent bg-clip-text ">
          <Link href="/">trendsAI</Link>
        </motion.h1>

        <div className="space-x-4 text-zinc-300">
          <Link href="/dashboard">Explore</Link>
          <Link href="/about">About</Link>
          <Link href="/submit">Submit</Link>
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-0 w-96 h-96 bg-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8 pt-16 pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center">
            <h1 className="text-7xl font-bold tracking-tight mb-8">
              Discover the Future of{" "}
              <motion.span
                animate={{
                  textShadow: [
                    "0px 0px 5px rgba(57, 255, 20, 1)",
                    "0px 0px 15px rgba(7, 145, 145, 1)",
                    "0px 0px 5px rgba(57, 255, 20, 1)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-green/50 to-blue/50">
                AI
              </motion.span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Your gateway to exploring and discovering the most innovative AI
              applications and models. Join our community to stay ahead in the
              AI revolution.
            </p>
            <div className="flex flex-col sm:flex-row mb-10 gap-4 justify-center items-center">
              <ButtonLinks
                href="/register"
                className="bg-white text-black rounded-full hover:bg-gray-100 transition-colors duration-200">
                Start for free
              </ButtonLinks>

              <ButtonLinks
                href="/dashboard"
                className="border border-green/20 rounded-full hover:bg-white/10 transition-colors duration-200">
                Explore Apps
              </ButtonLinks>
            </div>

            <ImageCarousel />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24">
            <h2 className="text-6xl font-bold mb-4">
              Where AI discovery and
              <br />
              innovation become one
            </h2>
          </motion.div>

          {/* Feature Items */}
          <div className="space-y-32">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-green/15 to-blue/10 mb-6">
                  <FeatureOneSVG />
                </div>
                <h3 className="text-3xl font-bold mb-4">AI Apps</h3>
                <p className="text-xl text-gray-400">
                  Discover and explore the most innovative AI applications rated
                  by our community. Stay ahead of the curve with the latest AI
                  technology.
                </p>
              </div>
              <div className="flex-1 relative h-96 w-full bg-gradient-to-br from-green/20 to-blue/10 rounded-2xl overflow-hidden">
                {/* App showcase/demo content here */}
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-green/15 to-blue/10 bg-purple-500/10 mb-6">
                  <FeatureTwoSVG />
                </div>
                <h3 className="text-3xl font-bold mb-4">AI Models</h3>
                <p className="text-xl text-gray-400">
                  Access and compare different AI models to find the perfect fit
                  for your needs. Make informed decisions with comprehensive
                  model analysis.
                </p>
              </div>
              <div className="flex-1 relative h-96 w-full bg-gradient-to-br from-blue/30 to-green/10 rounded-2xl overflow-hidden">
                {/* Model showcase/demo content here */}
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-green/15 to-blue/10 bg-purple-500/10 mb-6">
                  <FeatureThreeSVG />
                </div>
                <h3 className="text-3xl font-bold mb-4">Community</h3>
                <p className="text-xl text-gray-400">
                  Join discussions, share experiences, and learn from other AI
                  enthusiasts. Be part of a growing community of innovators.
                </p>
              </div>
              <div className="flex-1 relative h-96 w-full bg-gradient-to-br from-green/20 to-blue/30 rounded-2xl overflow-hidden">
                {/* Community showcase/demo content here */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue/10 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10">
            <h2 className="text-5xl font-bold mb-8">
              Ready to explore the world of AI?
            </h2>

            <ButtonLinks
              href="/auth/register"
              className="inline-block px-8 py-4 text-lg font-medium bg-white text-black rounded-full hover:bg-gray-100 transition-colors duration-200">
              Get Started now
            </ButtonLinks>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
