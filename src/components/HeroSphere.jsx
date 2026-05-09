import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function HeroSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let w = mount.clientWidth;
    let h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Nodes
    const nodeGeo = new THREE.SphereGeometry(0.022, 6, 6);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const nodeCount = 130;
    const sphereR = 2.8;
    const positions = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = sphereR * Math.sin(phi) * Math.cos(theta);
      const y = sphereR * Math.sin(phi) * Math.sin(theta);
      const z = sphereR * Math.cos(phi);
      positions.push(new THREE.Vector3(x, y, z));
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(x, y, z);
      group.add(mesh);
    }

    // Connections
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xef4444, opacity: 0.18, transparent: true });
    const maxDist = 1.35;
    const edgeGeos = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (positions[i].distanceTo(positions[j]) < maxDist) {
          const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
          edgeGeos.push(geo);
          group.add(new THREE.Line(geo, edgeMat));
        }
      }
    }

    // Faint inner glow
    const glowGeo = new THREE.SphereGeometry(2.6, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xef4444, opacity: 0.03, transparent: true, side: THREE.BackSide });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    // GSAP Y-axis rotation
    const rotationTween = gsap.to(group.rotation, { y: Math.PI * 2, duration: 28, repeat: -1, ease: 'none' });

    // Intro scale-in
    gsap.from(group.scale, { x: 0, y: 0, z: 0, duration: 1.6, ease: 'back.out(1.2)' });

    // Mouse parallax
    let mx = 0, my = 0;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.55;
      my = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let rafId;
    let contextLost = false;

    const tick = () => {
      if (contextLost) return;
      rafId = requestAnimationFrame(tick);
      group.rotation.x += (my - group.rotation.x) * 0.022;
      renderer.render(scene, camera);
    };
    tick();

    // WebGL context loss — prevent default so browser can restore it
    const onContextLost = (e) => {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(rafId);
    };
    const onContextRestored = () => {
      contextLost = false;
      tick();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false);

    const onResize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      // Stop everything first
      cancelAnimationFrame(rafId);
      rotationTween.kill();
      contextLost = true;

      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      // Remove canvas from DOM before disposing
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      // Guard disposals — context may already be gone
      try {
        nodeGeo.dispose();
        nodeMat.dispose();
        edgeMat.dispose();
        edgeGeos.forEach((g) => g.dispose());
        glowGeo.dispose();
        glowMat.dispose();
        renderer.dispose();
      } catch (_) {
        // Context was lost before cleanup; nothing to do
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
