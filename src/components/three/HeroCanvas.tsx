"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Fewer, softer points — spec allowed ~800 on constrained devices */
const PARTICLE_COUNT = 720;

function createSoftParticleTexture() {
  const s = 64;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,0.95)");
  g.addColorStop(0.2, "rgba(255,255,255,0.2)");
  g.addColorStop(0.45, "rgba(255,255,255,0.04)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (window.innerWidth < 768) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const map = createSoftParticleTexture();
    const count = PARTICLE_COUNT;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const accent = Math.random() < 0.04;
      if (accent) {
        colors[i * 3] = 0.35;
        colors[i * 3 + 1] = 0.55;
        colors[i * 3 + 2] = 1;
      } else {
        const g = 0.55 + Math.random() * 0.35;
        colors[i * 3] = g;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = g + 0.04;
      }
      offsets[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      map: map ?? undefined,
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2(999, 999);
    const mouse3 = new THREE.Vector3();
    const onMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse3.set(mouse.x * 16, mouse.y * 9, 0);
    };
    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const ox = offsets[i];
        arr[ix] += Math.sin(t * 0.25 + ox) * 0.0008;
        arr[ix + 1] += Math.cos(t * 0.22 + ox) * 0.0008;

        const px = arr[ix];
        const py = arr[ix + 1];
        const pz = arr[ix + 2];
        const dx = px - mouse3.x;
        const dy = py - mouse3.y;
        const dz = pz - mouse3.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.2 && dist > 0.001) {
          const f = (2.2 - dist) * 0.012;
          arr[ix] += (dx / dist) * f;
          arr[ix + 1] += (dy / dist) * f;
          arr[ix + 2] += (dz / dist) * f;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      map?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 opacity-0 md:opacity-100"
      style={{ animation: "fadeIn 600ms ease forwards" }}
    />
  );
}
