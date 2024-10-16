import { useEffect, useRef, useState } from "react";

interface Leaf {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  rotation: {
    axis: "X" | "Y" | "Z";
    value: number;
    speed: number;
    x: number;
  };
  xSpeedVariation: number;
  ySpeed: number;
}

const LeafScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const timer = useRef(0);
  const options = {
    numLeaves: 20,
    wind: {
      magnitude: 1.2,
      maxSpeed: 12,
      duration: 300,
      start: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      speed: (t: number, y: number) => 0,
    },
  };

  // Initialize the leaves and set up the scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const createLeaf = (): Leaf => {
      const el = document.createElement("div");
      el.className = "leaf";
      container.appendChild(el);

      return resetLeaf({
        el,
        x: 0,
        y: 0,
        z: 0,
        rotation: { axis: "X", value: 0, speed: 0, x: 0 },
        xSpeedVariation: 0,
        ySpeed: 0,
      });
    };

    const resetLeaf = (leaf: Leaf): Leaf => {
      leaf.x = width * 2 - Math.random() * width * 1.75;
      leaf.y = -10;
      leaf.z = Math.random() * 200;

      if (leaf.x > width) {
        leaf.x = width + 10;
        leaf.y = (Math.random() * height) / 2;
      }

      if (timer.current === 0) {
        leaf.y = Math.random() * height;
      }

      leaf.rotation.speed = Math.random() * 10;
      const randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf.rotation.axis = "X";
      } else if (randomAxis > 0.25) {
        leaf.rotation.axis = "Y";
        leaf.rotation.x = Math.random() * 180 + 90;
      } else {
        leaf.rotation.axis = "Z";
        leaf.rotation.x = Math.random() * 360 - 180;
        leaf.rotation.speed = Math.random() * 3;
      }

      leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf.ySpeed = Math.random() + 1.5;

      return leaf;
    };

    const updateLeaf = (leaf: Leaf) => {
      const leafWindSpeed = options.wind.speed(
        timer.current - options.wind.start,
        leaf.y
      );
      const xSpeed = leafWindSpeed + leaf.xSpeedVariation;

      leaf.x -= xSpeed;
      leaf.y += leaf.ySpeed;
      leaf.rotation.value += leaf.rotation.speed;

      const transform = `translateX(${leaf.x}px) translateY(${leaf.y}px) translateZ(${leaf.z}px) rotate${leaf.rotation.axis}(${leaf.rotation.value}deg)`;
      if (leaf.rotation.axis !== "X") {
        leaf.el.style.transform = `${transform} rotateX(${leaf.rotation.x}deg)`;
      } else {
        leaf.el.style.transform = transform;
      }

      if (leaf.x < -10 || leaf.y > height + 10) {
        resetLeaf(leaf);
      }
    };

    const updateWind = () => {
      if (
        timer.current === 0 ||
        timer.current > options.wind.start + options.wind.duration
      ) {
        options.wind.magnitude = Math.random() * options.wind.maxSpeed;
        options.wind.duration =
          options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        options.wind.start = timer.current;

        options.wind.speed = (t: number, y: number) => {
          const a =
            ((options.wind.magnitude / 2) * (height - (2 * y) / 3)) / height;
          return (
            a *
              Math.sin(
                ((2 * Math.PI) / options.wind.duration) * t + (3 * Math.PI) / 2
              ) +
            a
          );
        };
      }
    };

    const renderScene = () => {
      updateWind();
      leaves.forEach(updateLeaf);
      timer.current++;
      requestAnimationFrame(renderScene);
    };

    const initialLeaves = Array.from({ length: options.numLeaves }, createLeaf);
    setLeaves(initialLeaves);

    renderScene();

    // Cleanup function
    return () => {
      initialLeaves.forEach((leaf) => container.removeChild(leaf.el));
    };
  }, []);

  return (
    <div ref={containerRef} className="falling-leaves relative w-full h-full">
      <style jsx>{`
        .falling-leaves {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          overflow: hidden;
          background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/125707/sidebar-bg.png")
            no-repeat center center;
          background-size: cover;
        }

        .leaf {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/125707/leaf.svg")
            no-repeat;
          background-size: 100%;
          transform-style: preserve-3d;
          backface-visibility: visible;
        }
      `}</style>
    </div>
  );
};

export default LeafScene;
