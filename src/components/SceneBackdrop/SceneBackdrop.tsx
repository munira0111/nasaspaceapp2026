import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type SceneTab = 'home' | 'map' | 'dashboard' | 'how-it-works' | 'global';

interface Props {
  activeTab: SceneTab;
  focusKey: number;
}

const makeMaterial = (color: number, options: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({
    color,
    metalness: 0.55,
    roughness: 0.38,
    transparent: true,
    opacity: 0.82,
    ...options,
  });

function createObject(tab: SceneTab) {
  const group = new THREE.Group();
  const cyan = makeMaterial(0x38bdf8, { emissive: 0x087ba8, emissiveIntensity: 0.55 });
  const gold = makeMaterial(0xf97316, { emissive: 0x9a3500, emissiveIntensity: 0.45 });
  const dark = makeMaterial(0x0b2740, { metalness: 0.78, roughness: 0.28 });

  if (tab === 'dashboard') {
    const heights = [0.7, 1.2, 0.95, 1.65, 1.35, 1.9, 1.1];
    heights.forEach((height, index) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, height, 0.16),
        index === 5 ? gold : cyan,
      );
      bar.position.set((index - 3) * 0.28, height / 2 - 0.85, 0);
      group.add(bar);
    });
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.035, 0.5), dark);
    base.position.y = -0.9;
    group.add(base);
  } else if (tab === 'how-it-works') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.2, 0.48), dark);
    group.add(body);
    [-1, 1].forEach((side) => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.055, 0.6), cyan);
      panel.position.x = side * 0.92;
      group.add(panel);
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5), gold);
      strut.rotation.z = Math.PI / 2;
      strut.position.x = side * 0.42;
      group.add(strut);
    });
    const antenna = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.025, 8, 48), gold);
    antenna.position.set(0, -0.38, 0.18);
    antenna.rotation.x = Math.PI / 2.6;
    group.add(antenna);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.4), cyan);
    mast.position.set(0, -0.2, 0.08);
    group.add(mast);
  } else {
    const radius = tab === 'map' ? 1.3 : 1.45;
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 48, 32),
      makeMaterial(0x0b2740, { roughness: 0.58, metalness: 0.28, emissive: 0x031324 }),
    );
    group.add(globe);

    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.008, 24, 16),
      makeMaterial(0x38bdf8, {
        wireframe: true,
        opacity: tab === 'map' ? 0.4 : 0.23,
        emissive: 0x075778,
        emissiveIntensity: 0.25,
      }),
    );
    group.add(grid);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 1.36, 0.009, 6, 120),
      makeMaterial(0x38bdf8, { opacity: 0.48, emissive: 0x087ba8 }),
    );
    orbit.rotation.set(0.88, 0.12, 0.32);
    group.add(orbit);

    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 12), gold);
    marker.position.set(radius * 1.22, 0.35, 0.75);
    group.add(marker);

    if (tab === 'map') {
      const scan = new THREE.Mesh(
        new THREE.TorusGeometry(radius * 1.55, 0.012, 6, 120),
        makeMaterial(0xf97316, { opacity: 0.7, emissive: 0x9a3500 }),
      );
      scan.rotation.set(1.1, 0.42, -0.15);
      group.add(scan);
    }
  }

  group.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
      child.material.userData.baseOpacity = child.material.opacity;
    }
  });
  return group;
}

export function SceneBackdrop({ activeTab, focusKey }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const stageRef = useRef<THREE.Group | null>(null);
  const focusTargetRef = useRef(7.4);
  const tabRef = useRef(activeTab);
  const focusRef = useRef(focusKey);
  const transitionRef = useRef<{
    incoming: THREE.Group | null;
    outgoing: THREE.Group | null;
    start: number;
  }>({ incoming: null, outgoing: null, start: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x030712, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7.4;
    sceneRef.current = scene;
    cameraRef.current = camera;

    scene.add(new THREE.AmbientLight(0x8dcfff, 1.35));
    const keyLight = new THREE.PointLight(0x38bdf8, 22, 20);
    keyLight.position.set(2, 2, 4);
    scene.add(keyLight);
    const warmLight = new THREE.PointLight(0xf97316, 9, 14);
    warmLight.position.set(-3, -1, 2);
    scene.add(warmLight);

    const stage = new THREE.Group();
    stage.position.x = window.innerWidth < 700 ? 0.9 : 2.15;
    scene.add(stage);
    stageRef.current = stage;

    const starPositions = new Float32Array(450 * 3);
    for (let index = 0; index < 450; index += 1) {
      starPositions[index * 3] = (Math.random() - 0.5) * 20;
      starPositions[index * 3 + 1] = (Math.random() - 0.5) * 12;
      starPositions[index * 3 + 2] = -2 - Math.random() * 10;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({ color: 0x9bdfff, size: 0.018, transparent: true, opacity: 0.58 }),
    );
    scene.add(stars);

    let incoming: THREE.Group | null = createObject(tabRef.current);
    incoming.position.x = 0;
    stage.add(incoming);
    transitionRef.current = { incoming, outgoing: null, start: performance.now() };
    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
      renderer.setSize(window.innerWidth, window.innerHeight);
      stage.position.x = window.innerWidth < 700 ? 0.9 : 2.15;
    };

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);
      const transition = transitionRef.current;
      const progress = Math.min((now - transition.start) / 1150, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      if (transition.incoming) {
        transition.incoming.position.x = (1 - eased) * 3.9;
        transition.incoming.rotation.y += 0.0025;
        transition.incoming.rotation.x = Math.sin(now * 0.00028) * 0.09;
        transition.incoming.position.y = Math.sin(now * 0.00042) * 0.08;
        transition.incoming.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
            const baseOpacity = child.material.userData.baseOpacity ?? 0.82;
            child.material.opacity = baseOpacity * Math.min(progress * 2.3, 1);
          }
        });
      }
      if (transition.outgoing) {
        transition.outgoing.position.x = -eased * 4.2;
        transition.outgoing.rotation.y -= 0.004;
        transition.outgoing.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
            const baseOpacity = child.material.userData.baseOpacity ?? 0.82;
            child.material.opacity = baseOpacity * (1 - eased);
          }
        });
        if (progress === 1) {
          stage.remove(transition.outgoing);
          transition.outgoing.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (child.material instanceof THREE.Material) child.material.dispose();
            }
          });
          transition.outgoing = null;
        }
      }

      camera.position.z += (focusTargetRef.current - camera.position.z) * 0.075;
      const cameraTargetX = focusTargetRef.current < 7.4 ? stage.position.x : 0;
      camera.position.x += (cameraTargetX - camera.position.x) * 0.075;
      stage.rotation.y += (pointerX * 0.11 - stage.rotation.y) * 0.025;
      stage.rotation.x += (-pointerY * 0.07 - stage.rotation.x) * 0.025;
      stars.rotation.y = now * 0.000012;
      renderer.render(scene, camera);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      starsGeometry.dispose();
      stars.material.dispose();
      stage.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) child.material.dispose();
        }
      });
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
      sceneRef.current = null;
      cameraRef.current = null;
      stageRef.current = null;
      transitionRef.current = { incoming: null, outgoing: null, start: 0 };
    };
  }, []);

  useEffect(() => {
    if (tabRef.current === activeTab) return;
    tabRef.current = activeTab;
    const stage = stageRef.current;
    if (!stage) return;
    const transition = transitionRef.current;
    const current = transition.incoming;
    if (!current) return;
    if (transition.outgoing) {
      stage.remove(transition.outgoing);
      transition.outgoing.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) child.material.dispose();
        }
      });
    }
    const next = createObject(activeTab);
    next.position.x = 3.9;
    stage.add(next);
    transition.outgoing = current;
    transition.incoming = next;
    transition.start = performance.now();
    next.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = 0;
      }
    });
  }, [activeTab]);

  useEffect(() => {
    if (focusRef.current === focusKey) return;
    focusRef.current = focusKey;
    focusTargetRef.current = 3.6;
    const timer = window.setTimeout(() => {
      focusTargetRef.current = 7.4;
    }, 950);
    return () => window.clearTimeout(timer);
  }, [focusKey]);

  return <div ref={hostRef} className="scene-backdrop" aria-hidden="true" />;
}