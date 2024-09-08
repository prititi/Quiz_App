import React, { useEffect } from "react";
import { particlesCursor } from "https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js";

const CursorEffect = () => {
  useEffect(() => {
    const container = document.getElementById("cursor-effect-section");
    if (container && !container.dataset.initialized) {
      const pc = particlesCursor({
        el: container,
        gpgpuSize: 512,
        colors: [0x00ff00, 0x0000ff],
        color: 0xff0000,
        coordScale: 0.5,
        noiseIntensity: 0.001,
        noiseTimeCoef: 0.0001,
        pointSize: 5,
        pointDecay: 0.0025,
        sleepRadiusX: 250,
        sleepRadiusY: 250,
        sleepTimeCoefX: 0.001,
        sleepTimeCoefY: 0.002,
      });

      container.dataset.initialized = true;

      const handleClick = () => {
        pc.uniforms.uColor.value.set(Math.random() * 0xffffff);
        pc.uniforms.uCoordScale.value = 0.001 + Math.random() * 2;
        pc.uniforms.uNoiseIntensity.value = 0.0001 + Math.random() * 0.001;
        pc.uniforms.uPointSize.value = 1 + Math.random() * 10;
      };

      document.body.addEventListener("click", handleClick);

      return () => {
        document.body.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return <div id="cursor-effect-section" className="absolute inset-0 w-full"></div>;
};

export default CursorEffect;
