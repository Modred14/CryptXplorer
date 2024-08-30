import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const ThreeDBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio); // Ensures sharp rendering on high DPI screens
    mountRef.current.appendChild(renderer.domElement);

    // Create font loader
    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const texts = [];
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; // Characters to display

        for (let i = 0; i < 1500; i++) {
          const char =
            characters[Math.floor(Math.random() * characters.length)];
          const textGeometry = new TextGeometry(char, {
            font: font,
            size: 0.4,
            depth: 0.1,
          });

          // Create material (green color)
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

          // Create text mesh
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.x = Math.random() * (width / 10) - width / 20; // Adjust to full screen width
          textMesh.position.y = Math.random() * 20 - 10;
          textMesh.position.z = Math.random() * 10 - 5;
          textMesh.scale.set(0.5, 0.5, 0.5);
          texts.push(textMesh);
          scene.add(textMesh);
        }

        // Animation function
        const animate = function () {
          requestAnimationFrame(animate);

          // Move texts down
          texts.forEach((text) => {
            text.position.y -= 0.1;
            if (text.position.y < -10) {
              text.position.y = 10;
              text.position.x = Math.random() * (width / 10) - width / 20; // Adjust x position to full screen width
            }
          });

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error("An error happened loading the font.", error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);

      // Dispose of geometries, materials, and textures
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1, 
      }}
    />
  );
};

export default ThreeDBackground;
