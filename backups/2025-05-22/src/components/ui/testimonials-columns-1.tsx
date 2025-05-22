"use client";
import { motion } from "framer-motion";
import React from "react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: {
    text: string;
    image: string;
    name: string;
    role: string;
  }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-6 md:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 max-w-xs w-full bg-white" 
                  key={i}
                  style={{
                    boxShadow: "0 4px 20px rgba(42, 195, 122, 0.08)"
                  }}
                >
                  <div className="text-[#334155] text-sm md:text-base leading-relaxed italic">
                    &ldquo;{text}&rdquo;
                  </div>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-[#1E293B] text-sm">{name}</div>
                      <div className="text-xs text-[#64748B]">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
}; 