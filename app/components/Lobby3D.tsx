'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

type Counter = {
  x: number;
  image: string;
  label: string;
  action: () => void;
};

const ROOM_W = 14;
const ROOM_D = 12;
const ROOM_H = 5;
const EYE_HEIGHT = 1.7;
const MOVE_SPEED = 4.2;
const LOOK_SENSITIVITY = 0.0016;
const MAX_PITCH = 1.2;

export function Lobby3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c0a);
    scene.fog = new THREE.Fog(0x0b0c0a, 8, 22);

    const camera = new THREE.PerspectiveCamera(
      65,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, EYE_HEIGHT, 6);

    // yaw = 0 -> kamera menghadap -z, yaitu ke arah loket (loket ada di z negatif).
    let yaw = 0;
    let pitch = 0;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dirLight = new THREE.DirectionalLight(0xffcf8a, 0.9);
    dirLight.position.set(3, 6, 4);
    scene.add(dirLight);
    const amberGlow = new THREE.PointLight(0xeb802f, 1.2, 15);
    amberGlow.position.set(0, 3, -3);
    scene.add(amberGlow);

    const floorMat = new THREE.MeshStandardMaterial({ color: 0x14150f, roughness: 0.9 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const grid = new THREE.GridHelper(ROOM_W, 20, 0xeb802f, 0x2b2c22);
    (grid.material as THREE.Material).opacity = 0.25;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0x131409, roughness: 1 });

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), wallMat);
    backWall.position.set(0, ROOM_H / 2, -ROOM_D / 2);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
    leftWall.position.set(-ROOM_W / 2, ROOM_H / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
    rightWall.position.set(ROOM_W / 2, ROOM_H / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);

    function makeSignTexture(text: string, opts?: { bg?: string; fg?: string }) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const bg = opts?.bg ?? '#eb802f';
      const fg = opts?.fg ?? '#eb802f';
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(6, 6, canvas.width - 12, canvas.height - 12);
      ctx.fillStyle = fg;
      ctx.font = 'bold 44px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    function makeProgressTexture(claimed: number, total: number) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 220;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#00d4ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(6, 6, canvas.width - 12, canvas.height - 12);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('APPLY WL', canvas.width / 2, 46);
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = '#eb802f';
      ctx.fillText('WHITELIST PROGRESS', canvas.width / 2, 92);
      const barX = 40, barY = 115, barW = canvas.width - 80, barH = 30;
      ctx.strokeStyle = '#eb802f';
      ctx.lineWidth = 4;
      ctx.strokeRect(barX, barY, barW, barH);
      const pct = Math.min(claimed / total, 1);
      ctx.fillStyle = '#eb802f';
      ctx.fillRect(barX + 3, barY + 3, (barW - 6) * pct, barH - 6);
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${claimed} / ${total}`, canvas.width / 2, barY + barH + 34);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return { tex, canvas, ctx };
    }

    // Dinding kiri: Robinhood Chain
    const rhSignMat = new THREE.MeshBasicMaterial({
      map: makeSignTexture('ROBINHOOD', { bg: '#00c805', fg: '#000000' }),
    });
    const rhSign = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.8), rhSignMat);
    rhSign.position.set(-ROOM_W / 2 + 0.05, 3, -1);
    rhSign.rotation.y = Math.PI / 2;
    scene.add(rhSign);

    const supplySignMat = new THREE.MeshBasicMaterial({
      map: makeSignTexture('4,444 NFTS', { bg: '#c9bfb7', fg: '#000000' }),
    });
    const supplySign = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.8), supplySignMat);
    supplySign.position.set(-ROOM_W / 2 + 0.05, 1.8, -1);
    supplySign.rotation.y = Math.PI / 2;
    scene.add(supplySign);

    // Dinding kanan: OpenSea + progress WL
    const progress = makeProgressTexture(0, 1000);
    const progressMat = new THREE.MeshBasicMaterial({ map: progress.tex });
    const progressSign = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.3), progressMat);
    progressSign.position.set(ROOM_W / 2 - 0.05, 2.4, -1);
    progressSign.rotation.y = -Math.PI / 2;
    scene.add(progressSign);

    fetch('/api/whitelist/count')
      .then((res) => res.json())
      .then((data) => {
        const claimed = data.count ?? 0;
        const ctx = progress.ctx;
        const canvas = progress.canvas;
        ctx.fillStyle = '#6fff00';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(6, 6, canvas.width - 12, canvas.height - 12);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 30px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('APPLY WL', canvas.width / 2, 46);
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = '#eb802f';
        ctx.fillText('WHITELIST PROGRESS', canvas.width / 2, 92);
        const barX = 40, barY = 115, barW = canvas.width - 80, barH = 30;
        ctx.strokeStyle = '#eb802f';
        ctx.lineWidth = 4;
        ctx.strokeRect(barX, barY, barW, barH);
        const pct = Math.min(claimed / 1000, 1);
        ctx.fillStyle = '#eb802f';
        ctx.fillRect(barX + 3, barY + 3, (barW - 6) * pct, barH - 6);
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${claimed} / 1000`, canvas.width / 2, barY + barH + 34);
        progress.tex.needsUpdate = true;
      })
      .catch(() => {});

    // Counter: navigasi lintas halaman (bukan scroll di halaman yang sama lagi)
    const counters: Counter[] = [
      {
        x: -4.5,
        image: '/images/roster-1.png',
        label: 'APPLY WL',
        action: () => { window.location.href = '/floor#whitelist'; },
      },
      {
        x: -1.5,
        image: '/images/roster-2.png',
        label: 'ROSTER',
        action: () => { window.location.href = '/floor#roster'; },
      },
      {
        x: 1.5,
        image: '/images/roster-3.png',
        label: 'STAKING',
        action: () => router.push('/staking'),
      },
      {
        x: 4.5,
        image: '/images/roster-4.png',
        label: 'FAQ',
        action: () => { window.location.href = '/floor#faq'; },
      },
    ];

    const loader = new THREE.TextureLoader();
    const clickable: THREE.Object3D[] = [];
    const deskBounds: { x: number; z: number }[] = [];

    counters.forEach((c) => {
      const group = new THREE.Group();
      const deskZ = -ROOM_D / 2 + 3;
      group.position.set(c.x, 0, deskZ);
      deskBounds.push({ x: c.x, z: deskZ });

      const deskMat = new THREE.MeshStandardMaterial({ color: 0x1f2117, roughness: 0.7 });
      const desk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 0.9), deskMat);
      desk.position.set(0, 0.55, 0);
      group.add(desk);

      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 0.08, 0.95),
        new THREE.MeshStandardMaterial({ color: 0xeb802f, roughness: 0.4 })
      );
      trim.position.set(0, 1.1, 0);
      group.add(trim);

      loader.load(c.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.magFilter = THREE.NearestFilter;
        const mat = new THREE.MeshBasicMaterial({ map: tex });
        const billboard = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), mat);
        billboard.position.set(0, 2.1, -0.3);
        group.add(billboard);
      });

      const signTex = makeSignTexture(c.label);
      const signMat = new THREE.MeshBasicMaterial({ map: signTex });
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), signMat);
      sign.position.set(0, 3.2, -0.28);
      group.add(sign);

      const hit = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 3.6, 1.2),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.position.set(0, 1.6, 0);
      hit.userData.action = c.action;
      group.add(hit);
      clickable.push(hit);

      scene.add(group);
    });

    let isDragging = false;
    let dragMoved = 0;
    let lastX = 0;
    let lastY = 0;

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      dragMoved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dragMoved += Math.abs(dx) + Math.abs(dy);
      yaw -= dx * LOOK_SENSITIVITY;
      pitch -= dy * LOOK_SENSITIVITY;
      pitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch));
      lastX = e.clientX;
      lastY = e.clientY;
    }

    const raycaster = new THREE.Raycaster();

    function onPointerUp(e: PointerEvent) {
      isDragging = false;
      if (dragMoved < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const py = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(new THREE.Vector2(px, py), camera);
        const hits = raycaster.intersectObjects(clickable);
        if (hits.length > 0) {
          const action = hits[0].object.userData.action;
          if (action) action();
        }
      }
    }

    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    function onKeyDown(e: KeyboardEvent) {
      if (['w', 'W', 'ArrowUp'].includes(e.key)) moveState.current.forward = true;
      if (['s', 'S', 'ArrowDown'].includes(e.key)) moveState.current.backward = true;
      if (['a', 'A', 'ArrowLeft'].includes(e.key)) moveState.current.left = true;
      if (['d', 'D', 'ArrowRight'].includes(e.key)) moveState.current.right = true;
    }
    function onKeyUp(e: KeyboardEvent) {
      if (['w', 'W', 'ArrowUp'].includes(e.key)) moveState.current.forward = false;
      if (['s', 'S', 'ArrowDown'].includes(e.key)) moveState.current.backward = false;
      if (['a', 'A', 'ArrowLeft'].includes(e.key)) moveState.current.left = false;
      if (['d', 'D', 'ArrowRight'].includes(e.key)) moveState.current.right = false;
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    function clampPosition(x: number, z: number) {
      const margin = 0.6;
      let nx = Math.max(-ROOM_W / 2 + margin, Math.min(ROOM_W / 2 - margin, x));
      let nz = Math.max(-ROOM_D / 2 + 1.6, Math.min(ROOM_D / 2 - margin, z));
      for (const d of deskBounds) {
        const dx = nx - d.x;
        const dz = nz - d.z;
        if (Math.abs(dx) < 1.3 && Math.abs(dz) < 0.7) {
          if (Math.abs(dz) > Math.abs(dx)) {
            nz = d.z + (dz > 0 ? 0.7 : -0.7);
          } else {
            nx = d.x + (dx > 0 ? 1.3 : -1.3);
          }
        }
      }
      return { x: nx, z: nz };
    }

    const clock = new THREE.Clock();
    let frameId: number;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);

      const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');
      camera.quaternion.setFromEuler(euler);

      const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, yaw, 0));
      const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, yaw, 0));

      let moveX = 0;
      let moveZ = 0;
      if (moveState.current.forward) { moveX += forward.x; moveZ += forward.z; }
      if (moveState.current.backward) { moveX -= forward.x; moveZ -= forward.z; }
      if (moveState.current.right) { moveX += right.x; moveZ += right.z; }
      if (moveState.current.left) { moveX -= right.x; moveZ -= right.z; }

      const len = Math.hypot(moveX, moveZ);
      if (len > 0) {
        moveX = (moveX / len) * MOVE_SPEED * delta;
        moveZ = (moveZ / len) * MOVE_SPEED * delta;
        const clamped = clampPosition(camera.position.x + moveX, camera.position.z + moveZ);
        camera.position.x = clamped.x;
        camera.position.z = clamped.z;
      }

      renderer.render(scene, camera);
    }
    animate();
    setLoading(false);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  function press(key: 'forward' | 'backward' | 'left' | 'right', value: boolean) {
    moveState.current[key] = value;
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div ref={containerRef} className="w-full h-full" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-exbr-bg">
          <span className="font-pixel text-xs text-exbr-amber animate-pulse">LOADING LOBBY...</span>
        </div>
      )}

      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-pixel text-[9px] md:text-[10px] text-white/50 bg-black/60 border-2 border-exbr-line px-3 py-2 whitespace-nowrap hidden md:block">
        WASD / ARROW KEYS TO WALK · DRAG TO LOOK · CLICK A COUNTER
      </div>

      <div className="md:hidden absolute bottom-4 left-4 grid grid-cols-3 gap-1 w-32">
        <div />
        <button
          onPointerDown={(e) => { e.preventDefault(); press('forward', true); }}
          onPointerUp={() => press('forward', false)}
          onPointerLeave={() => press('forward', false)}
          className="bg-black/70 border-2 border-exbr-line text-exbr-amber font-pixel text-xs py-3"
        >
          ▲
        </button>
        <div />
        <button
          onPointerDown={(e) => { e.preventDefault(); press('left', true); }}
          onPointerUp={() => press('left', false)}
          onPointerLeave={() => press('left', false)}
          className="bg-black/70 border-2 border-exbr-line text-exbr-amber font-pixel text-xs py-3"
        >
          ◀
        </button>
        <button
          onPointerDown={(e) => { e.preventDefault(); press('backward', true); }}
          onPointerUp={() => press('backward', false)}
          onPointerLeave={() => press('backward', false)}
          className="bg-black/70 border-2 border-exbr-line text-exbr-amber font-pixel text-xs py-3"
        >
          ▼
        </button>
        <button
          onPointerDown={(e) => { e.preventDefault(); press('right', true); }}
          onPointerUp={() => press('right', false)}
          onPointerLeave={() => press('right', false)}
          className="bg-black/70 border-2 border-exbr-line text-exbr-amber font-pixel text-xs py-3"
        >
          ▶
        </button>
      </div>

      <div className="md:hidden absolute bottom-4 right-4 font-pixel text-[9px] text-white/50 bg-black/60 border-2 border-exbr-line px-3 py-2 max-w-[120px] text-right">
        DRAG SCREEN TO LOOK
      </div>
    </div>
  );
}
