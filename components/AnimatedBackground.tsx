// // 'use client';

// // import { useEffect } from 'react';
// // import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// // // Helper to make smoother motion
// // const createBlobMotion = (
// //   mx: any,
// //   my: any,
// //   xRange: [string, string],
// //   yRange: [string, string],
// //   springConfig = { stiffness: 40, damping: 20 }
// // ) => ({
// //   x: useSpring(useTransform(mx, [-0.5, 0.5], xRange), springConfig),
// //   y: useSpring(useTransform(my, [-0.5, 0.5], yRange), springConfig),
// // });

// // export default function AnimatedBackground() {
// //   const mx = useMotionValue(0);
// //   const my = useMotionValue(0);

// //   useEffect(() => {
// //     const handleMouseMove = (e: MouseEvent) => {
// //       mx.set(e.clientX / window.innerWidth - 0.5);
// //       my.set(e.clientY / window.innerHeight - 0.5);
// //     };
// //     window.addEventListener('mousemove', handleMouseMove);
// //     return () => window.removeEventListener('mousemove', handleMouseMove);
// //   }, []);

// //   const blob1 = createBlobMotion(mx, my, ['-30%', '30%'], ['-20%', '20%']);
// //   const blob2 = createBlobMotion(mx, my, ['20%', '-20%'], ['25%', '-25%']);
// //   const blob3 = createBlobMotion(mx, my, ['-10%', '10%'], ['20%', '-20%']);
// //   const blob4 = createBlobMotion(mx, my, ['-15%', '15%'], ['-30%', '30%']);
// //   const blob5 = createBlobMotion(mx, my, ['5%', '-5%'], ['-15%', '15%']);

// //   return (
// //     <div className="absolute fixed inset-0 overflow-hidden pointer-events-none">
// //       {/* Glow Blobs */}
// //       <motion.div
// //         style={{ x: blob1.x, y: blob1.y }}
// //         className="absolute w-[550px] h-[550px] bg-gradient-to-tr from-blue-500 to-purple-700 opacity-30 blur-[160px] rounded-full top-[-20%] left-[-20%] pointer-events-none animate-float"
// //       />
// //       <motion.div
// //         style={{ x: blob2.x, y: blob2.y }}
// //         className="absolute w-[480px] h-[480px] bg-gradient-to-tr from-rose-500 to-pink-600 opacity-25 blur-[130px] rounded-full bottom-[-25%] right-[-20%] pointer-events-none animate-slower-float"
// //       />
// //       <motion.div
// //         style={{ x: blob3.x, y: blob3.y }}
// //         className="absolute w-[300px] h-[300px] bg-cyan-400 opacity-20 blur-[90px] rounded-full top-[5%] right-[30%] pointer-events-none animate-slowest-float"
// //       />
// //       <motion.div
// //         style={{ x: blob4.x, y: blob4.y }}
// //         className="absolute w-[360px] h-[360px] bg-yellow-400 opacity-10 blur-[110px] rounded-full bottom-[10%] left-[30%] pointer-events-none animate-rotate"
// //       />
// //       <motion.div
// //         style={{ x: blob5.x, y: blob5.y }}
// //         className="absolute w-[200px] h-[200px] bg-green-300 opacity-15 blur-[70px] rounded-full top-[20%] left-[60%] pointer-events-none animate-wiggle"
// //       />
// //     </div>
// //   );
// // }


// 'use client';

// import { useEffect } from 'react';
// import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// const createBlobMotion = (
//   mx: any,
//   my: any,
//   xRange: [string, string],
//   yRange: [string, string],
//   springConfig = { stiffness: 40, damping: 20 }
// ) => ({
//   x: useSpring(useTransform(mx, [-0.5, 0.5], xRange), springConfig),
//   y: useSpring(useTransform(my, [-0.5, 0.5], yRange), springConfig),
// });

// export default function AnimatedBackground() {
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       mx.set(e.clientX / window.innerWidth - 0.5);
//       my.set(e.clientY / window.innerHeight - 0.5);
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const blob1 = createBlobMotion(mx, my, ['-30%', '30%'], ['-20%', '20%']);
//   const blob2 = createBlobMotion(mx, my, ['20%', '-20%'], ['25%', '-25%']);
//   const blob3 = createBlobMotion(mx, my, ['-10%', '10%'], ['20%', '-20%']);
//   const blob4 = createBlobMotion(mx, my, ['-15%', '15%'], ['-30%', '30%']);
//   const blob5 = createBlobMotion(mx, my, ['5%', '-5%'], ['-15%', '15%']);

//   return (
//     <div className="absolute fixed inset-0 overflow-hidden pointer-events-none z-0">
//       {/* Blurred Color Blobs */}
//       <motion.div style={{ x: blob1.x, y: blob1.y }} className="absolute w-[550px] h-[550px] bg-gradient-to-tr from-blue-500 to-purple-700 opacity-30 blur-[160px] rounded-full top-[-20%] left-[-20%] animate-float" />
//       <motion.div style={{ x: blob2.x, y: blob2.y }} className="absolute w-[480px] h-[480px] bg-gradient-to-tr from-rose-500 to-pink-600 opacity-25 blur-[130px] rounded-full bottom-[-25%] right-[-20%] animate-slower-float" />
//       <motion.div style={{ x: blob3.x, y: blob3.y }} className="absolute w-[300px] h-[300px] bg-cyan-400 opacity-20 blur-[90px] rounded-full top-[5%] right-[30%] animate-slowest-float" />
//       <motion.div style={{ x: blob4.x, y: blob4.y }} className="absolute w-[360px] h-[360px] bg-yellow-400 opacity-10 blur-[110px] rounded-full bottom-[10%] left-[30%] animate-rotate" />
//       <motion.div style={{ x: blob5.x, y: blob5.y }} className="absolute w-[200px] h-[200px] bg-green-300 opacity-15 blur-[70px] rounded-full top-[20%] left-[60%] animate-wiggle" />

//       {/* Geometric/Decorative Shapes */}
//       {/* Ring */}
//       <motion.div
//         initial={{ rotate: 0 }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
//         className="absolute w-[120px] h-[120px] border-4 border-white/20 rounded-full top-[30%] left-[10%] blur-sm"
//       />

//       {/* Triangle */}
//       <motion.div
//         initial={{ rotate: 0 }}
//         animate={{ rotate: -360 }}
//         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//         className="absolute top-[50%] left-[50%] scale-200 blur-sm w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-transparent border-b-green-400 opacity-10"
//       />

//       {/* Pulsing square */}
//       <motion.div
//         initial={{ scale: 1 }}
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ duration: 3, repeat: Infinity }}
//         className="absolute w-[80px] h-[80px] bg-blue-300/10 top-[70%] right-[10%] rotate-12 blur-sm"
//       />

//       {/* Tiny dot pulse */}
//       {/* <motion.div
//         initial={{ opacity: 0.4 }}
//         animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
//         transition={{ duration: 4, repeat: Infinity }}
//         className="absolute w-[10px] h-[10px] bg-white/30 rounded-full top-[50%] left-[50%]"
//       /> */}
//     </div>
//   );
// }



import { cn } from "@/lib/utils";
import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="absolute top-0 -z-10 flex h-[125%] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}
