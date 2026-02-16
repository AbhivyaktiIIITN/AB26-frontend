import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const sectionConfig = {
  subtitle: "Canvas of Voices and Vibes",
  showSubtitle: true,
};

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
    console.error("Model loading error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// ------------------------------------------------------------------
// 1. MODEL COMPONENT (Dynamic Interactable)
// ------------------------------------------------------------------
const MaskModel = (props) => {
  const { scene } = useGLTF(
    "https://assets.2026.abhivyaktifest.in/3d-Models/gold_masquerade_mask.glb",
  );
  const meshRef = useRef();
  const lightRef = useRef(); // Dynamic glossy light

  // Base rotation from props
  const baseRotation = props.rotation || [0, 0, 0];

  useFrame((state) => {
    if (!meshRef.current) return;

    // --- 1. SMOOTH TILT ---
    // Mouse coordinates: x (-1 to 1), y (-1 to 1)
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    // Target rotation: Base + small tilt based on mouse
    // Invert Y input for X rotation to feel natural (mouse up -> look up/tilt back)
    const tiltX = -mouseY * 0.2; // Max 0.2 rad tilt vertical
    const tiltY = mouseX * 0.3; // Max 0.3 rad tilt horizontal

    // Smoothly interpolate current rotation to target
    // lerp(current, target, factor) - factor 0.1 gives smooth delay
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

    // --- 2. GLOSSY CURSOR FOLLOWER ---
    if (lightRef.current) {
      // Position the light relative to the camera/view
      // Map mouse to world coordinates roughly at the model's Z depth
      // Assuming model is at ~0 and camera at 6
      lightRef.current.position.x = mouseX * 6;
      lightRef.current.position.y = mouseY * 4;
      // Keep Z in front of the model to reflect
      lightRef.current.position.z = 3;
    }
  });

  return (
    <group>
      {/* The Model */}
      <primitive
        object={scene}
        ref={meshRef}
        {...props}
        // Overwrite props.rotation with initial referenced value if needed,
        // but useFrame handles the updates.
        // We set initial rotation solely to avoid jumps before first frame.
      />

      {/* 
              Dynamic "Wet" Light 
              - PointLight creates a specular highlight.
              - High intensity, small distance to keep it localized around cursor.
              - White color for pure gloss.
            */}
      <pointLight
        ref={lightRef}
        intensity={5}
        distance={6}
        decay={2}
        color="#ffffff"
      />
    </group>
  );
};

useGLTF.preload(
  "https://assets.2026.abhivyaktifest.in/3d-Models/gold_masquerade_mask.glb",
);

// ------------------------------------------------------------------
// 2. MAIN COMPONENT
// ------------------------------------------------------------------
const AboutTheme = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.innerWidth >= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full text-[#D4AF37] overflow-hidden flex flex-col justify-center px-2 md:px-16 py-8 md:py-12">
      <div className="section-title">
        {sectionConfig.showSubtitle && (
          <div className="subtitle-line">
            <span className="line"></span>
            <span className="subtitle-text">{sectionConfig.subtitle}</span>
          </div>
        )}

        <h1
          className="tracking-wide uppercase text-5xl sm:text-6xl md:text-8xl"
          style={{ fontFamily: "'Aquila', serif", fontWeight: 400 }}
        >
          <span className="text-white">about</span>{" "}
          <span className="text-[#FDB931]">theme</span>
        </h1>
      </div>

      {/* CONTENT GRID */}
      <div className="w-full px-5 gap-6 md:gap-8 lg:gap-12 relative z-20 flex flex-col md:flex-row md:items-start">
        {/* COL 1: TITLE */}
        <div className="flex flex-row flex-wrap md:flex-col items-center md:items-start gap-2 md:gap-0 justify-center md:justify-start w-full md:w-auto md:flex-shrink-0">
          <span
            className="text-[#FDB931] text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-serif tracking-widest uppercase leading-tight"
            style={{ fontFamily: "'Besta Baru', serif", fontWeight: 400 }}
          >
            The
          </span>
          <h2
            className="text-[#FDB931] text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-serif tracking-widest uppercase leading-tight"
            style={{ fontFamily: "'Besta Baru', serif", fontWeight: 400 }}
          >
            Enchanted
          </h2>
          <h2
            className="text-[#FDB931] text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-serif tracking-widest uppercase leading-tight mt-0"
            style={{ fontFamily: "'Besta Baru', serif", fontWeight: 400 }}
          >
            Circus
          </h2>
        </div>
        {/* COL 2: PARAGRAPH */}
        <div className="w-full md:flex-1 md:px-4 lg:px-8">
          <p
            className="leading-relaxed  text-justify opacity-90 text-base md:text-lg lg:text-xl"
            style={{
              fontFamily: "'Gabarito', sans-serif",
              fontWeight: 500,
              color: "white",
            }}
          >
            The Enchanted Circus is an invitation to leave the ordinary behind
            and step into a realm where the impossible feels like home. It is a
            celebration of the whimsical and the purely joyful, transforming our
            campus into a spectacle of golden lights and laughter. At its heart,
            this theme is a tribute to that breathtaking moment of wonder when
            art and melody fill the night. We are creating a Midnight Carnival
            wrapped in velvet and stardust, blending vintage charm with surreal
            magic. In this arena, there are no spectators, only participants in
            the magic. The Enchanted Circus is your playground, a reminder that
            when we come together, we create a spectacle that lingers in the
            heart long after the curtains fall.
          </p>
        </div>

        {/* COL 3: MASK CONTAINER (3D Model) */}
        <div className="hidden xl:flex md:w-80 lg:w-96 xl:w-md 2xl:w-lg md:shrink-0 relative h-100 md:h-auto md:min-h-150 w-full items-center justify-center">
          {isDesktop && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] z-10 pointer-events-auto">
              <ErrorBoundary>
                <Canvas
                  dpr={1} // Lower DPR to prevent crash
                  gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    powerPreference: "default",
                  }}
                  camera={{
                    position: [0, 0, 6],
                    fov: 35,
                  }}
                  onCreated={({ gl }) => {
                    // console.log("WebGL Context Created:", gl.info);
                    gl.domElement.addEventListener(
                      "webglcontextlost",
                      (event) => {
                        event.preventDefault();
                        console.error("WebGL Context Lost!");
                      },
                    );
                  }}
                >
                  <ambientLight intensity={0.5} />
                  {/* Main Key Light - Warmer and Stronger */}
                  <spotLight
                    position={[5, 2, 8]}
                    angle={0.5}
                    penumbra={1}
                    intensity={8}
                    color="#FFD700"
                    // castShadow // Disabled to prevent crash
                  />
                  {/* Fill Light from opposite side */}
                  <pointLight
                    position={[-5, 0, 5]}
                    intensity={2}
                    color="#FDB931"
                  />
                  {/* Rim Light for edge definition */}
                  <pointLight
                    position={[0, 5, -5]}
                    intensity={3}
                    color="#FFFFFF"
                  />

                  <Suspense fallback={null}>
                    {/* 
                                      STATIC PLACEMENT (True Front Face, Left Half Shown):
                                      - Scale: 4
                                      - Orientation: [0, -Math.PI / 2, 0] (Rotated 90deg to face front)
                                      - Position: [1.5, 0.4, 0] (Adjusted split)
                                  */}
                    <MaskModel
                      scale={4}
                      position={[1.5, 0.4, 0]}
                      rotation={[0, -Math.PI / 2, 0]}
                    />
                    <Environment preset="city" environmentIntensity={1.5} />
                  </Suspense>
                </Canvas>
              </ErrorBoundary>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutTheme;
