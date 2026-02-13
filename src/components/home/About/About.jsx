import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "motion/react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Error Boundary for 3D content
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Magician Model loading error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const MagicianModel = (props) => {
  const { scene } = useGLTF("https://assets.2026.abhivyaktifest.in/3d-Models/magician_3d_model.glb");
  const meshRef = useRef();
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentScale, setCurrentScale] = useState(3.2);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 768);

      // Adjust scale for specific viewport range where model gets cut off
      if (width >= 769 && width <= 1100) {
        setCurrentScale(2.5);
      } else {
        setCurrentScale(3.2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Base rotation from props
  const baseRotation = props.rotation || [0, 0, 0];

  useFrame((state) => {
    if (!meshRef.current || !isDesktop) return;

    // Subtle tilt based on mouse position
    const mouseX = state.mouse.x;
    const mouseY = state.y;

    // Target rotation: Base + small tilt
    const tiltX = 0; // Disable vertical tilt
    const tiltY = mouseX * 0.2; // Increased horizontal tilt intensity

    // Smooth interpolation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      baseRotation[0] + tiltX,
      0.1,
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      baseRotation[1] + tiltY,
      0.1,
    );
  });

  return (
    <primitive object={scene} ref={meshRef} scale={currentScale} {...props} />
  );
};

useGLTF.preload("https://assets.2026.abhivyaktifest.in/3d-Models/magician_3d_model.glb");

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.8]);
  const raysOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-fit bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('https://assets.2026.abhivyaktifest.in/images/Home/image2.jpg')" }}
    >
      {/* Darkening Overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-black z-0 pointer-events-none"
      />

      {/* Light Rays - positioned to match typical "rays from top" composition */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ray 1 - Leftish */}
        <motion.div
          style={{ opacity: raysOpacity }}
          className="absolute -top-20 left-[20%] w-24 h-[120%] bg-linear-to-b from-white/20 via-white/5 to-transparent blur-3xl origin-top -rotate-12"
        />
        {/* Ray 2 - Center-Left */}
        <motion.div
          style={{ opacity: raysOpacity }}
          className="absolute -top-20 left-[40%] w-32 h-[120%] bg-linear-to-b from-white/30 via-white/10 to-transparent blur-[60px] origin-top -rotate-6"
        />
        {/* Ray 3 - Center-Right */}
        <motion.div
          style={{ opacity: raysOpacity }}
          className="absolute -top-20 left-[60%] w-20 h-[120%] bg-linear-to-b from-white/25 via-white/5 to-transparent blur-2xl origin-top rotate-12"
        />
      </div>

      <div className="w-full h-full bg-black/70 relative z-10">
        <div className="w-full h-fit flex flex-col">
          <div className="px-6 pt-16 pb-4 w-full h-fit bg-linear-to-b from-black/95 to-transparent flex items-center gap-3 sm:gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-10 sm:w-26 h-0.5 rounded-full bg-white origin-left"
            />
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.5 } },
              }}
              className="flex gap-1.5"
            >
              {["The", "Annual", "Cultural", "Festival"].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 1 } },
                  }}
                  className="text-white font-bold"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <div className="grow w-full h-fit px-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 1,
                delay: 2,
              }}
              className="w-full max-w-150 h-16 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('https://assets.2026.abhivyaktifest.in/images/Home/aboutab.png')" }}
            ></motion.div>
            <div className="grow sm:px-3 py-6 w-full flex flex-col md:flex-row justify-evenly items-center gap-6">
              <div className="hidden w-full h-100 md:w-1/2 md:h-150 md:flex items-center justify-center">
                <ErrorBoundary>
                  <Canvas
                    dpr={1}
                    camera={{ position: [0, 0, 5], fov: 40 }}
                    gl={{ preserveDrawingBuffer: true, alpha: true }}
                    onCreated={({ gl }) => {
                      gl.domElement.addEventListener(
                        "webglcontextlost",
                        (event) => {
                          event.preventDefault();
                          console.error("WebGL Context Lost!");
                        },
                      );
                    }}
                  >
                    <ambientLight intensity={1.2} />
                    <spotLight
                      position={[5, 5, 5]}
                      angle={0.5}
                      penumbra={1}
                      intensity={3}
                    />
                    <pointLight position={[-5, 2, 5]} intensity={2} />
                    <Suspense fallback={null}>
                      <MagicianModel
                        // Scale is handled internally for responsiveness
                        position={[0, 0, 0]}
                        rotation={[0, 1.7 + Math.PI, 0]}
                      />
                      <Environment preset="city" />
                      {/* OrbitControls removed per request for "static" hold */}
                    </Suspense>
                  </Canvas>
                </ErrorBoundary>
              </div>
              <div className="w-full max-w-[max(700px,45vw)] flex flex-col justify-center h-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                  }}
                  className="w-full text-white md:text-xl text-justify"
                >
                  Abhivyakti, the annual cultural fest of IIIT Nagpur, is a grand celebration of expression and artistry. It serves as a dynamic platform for students to showcase their talents and foster collaboration, transforming the campus into a vibrant hub of creative brilliance.
                  The festival features an immersive blend of music, dance, and theatre alongside signature pro-shows and stunning art exhibitions. Every segment is designed to inspire and entertain, inviting the community to explore their potential within a high-energy carnival atmosphere.
                </motion.div>
                <div className="mt-6 w-full md:w-fit grid place-items-center">
                  <button
                    type="button"
                    className="px-5 py-1.5 border border-[#676767] bg-linear-to-b from-[#3e1b08] to-[#602410] text-white rounded-md"
                  >
                    Explore Theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24 grid place-items-center">
          {/* <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-230 border-2 border-white/30 backdrop-blur-2xl p-3 sm:p-5 md:px-16 md:py-8 rounded-2xl sm:rounded-3xl lg:rounded-4xl">
            <div className="w-full aspect-video sm:h-120 border-4 border-double border-amber-200/30 overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/droNt6x2P7E"
                title='"The Greatest Show" Background Animation'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
