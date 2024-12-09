"use client";

import { useEffect, useRef } from "react";
import { useSeason } from "@/app/context/SeasonContext";

// Leaf scene component for the home page banner

interface Leaf {
  el: HTMLDivElement;
  x: number;
  y: number;
  z: number;
  rotation: {
    axis: string;
    value: number;
    speed: number;
    x: number;
  };
  xSpeedVariation: number;
  ySpeed: number;
}

const FallingLeaves: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { season } = useSeason();
  const currentSeasonImagePath = `/static/${season}.svg`;

  console.log("Current Season Image Path:", currentSeasonImagePath);

  useEffect(() => {
    class LeafScene {
      viewport: HTMLDivElement;
      world: HTMLDivElement;
      leaves: Leaf[] = [];
      width: number;
      height: number;
      timer: number = 0;
      options = {
        numLeaves: 20,
        wind: {
          magnitude: 1.2,
          maxSpeed: 12,
          duration: 300,
          start: 0,

          speed: (t: number, y: number) => 0,
        },
      };

      constructor(el: HTMLDivElement) {
        this.viewport = el;
        this.world = document.createElement("div");
        this.width = el.offsetWidth;
        this.height = el.offsetHeight;
      }

      _resetLeaf(leaf: Leaf, imagePath: string) {
        leaf.x = this.width * 2 - Math.random() * this.width * 1.75;
        leaf.y = -10;
        leaf.z = Math.random() * 200;
        if (leaf.x > this.width) {
          leaf.x = this.width + 10;
          leaf.y = (Math.random() * this.height) / 2;
        }
        if (this.timer === 0) {
          leaf.y = Math.random() * this.height;
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

        // Image assignment
        leaf.el.style.background = `url(${currentSeasonImagePath}) no-repeat`;
        leaf.el.style.backgroundSize = "100%";

        return leaf;
      }

      _updateLeaf(leaf: Leaf) {
        const leafWindSpeed = this.options.wind.speed(
          this.timer - this.options.wind.start,
          leaf.y
        );
        const xSpeed = leafWindSpeed + leaf.xSpeedVariation;
        leaf.x -= xSpeed;
        leaf.y += leaf.ySpeed;
        leaf.rotation.value += leaf.rotation.speed;

        const transform = `
          translateX(${leaf.x}px)
          translateY(${leaf.y}px)
          translateZ(${leaf.z}px)
          rotate${leaf.rotation.axis}(${leaf.rotation.value}deg)
          ${leaf.rotation.axis !== "X" ? `rotateX(${leaf.rotation.x}deg)` : ""}
        `;
        leaf.el.style.transform = transform;

        if (leaf.x < -10 || leaf.y > this.height + 10) {
          this._resetLeaf(leaf, currentSeasonImagePath);
        }
      }

      _updateWind() {
        if (
          this.timer === 0 ||
          this.timer > this.options.wind.start + this.options.wind.duration
        ) {
          this.options.wind.magnitude =
            Math.random() * this.options.wind.maxSpeed;
          this.options.wind.duration =
            this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
          this.options.wind.start = this.timer;
          const screenHeight = this.height;

          this.options.wind.speed = (t: number, y: number) => {
            // Ensure both t and y are used
            const a =
              ((this.options.wind.magnitude / 2) *
                (screenHeight - (2 * y) / 3)) /
              screenHeight;
            return (
              a *
                Math.sin(
                  ((2 * Math.PI) / this.options.wind.duration) * t +
                    (3 * Math.PI) / 2
                ) +
              a
            );
          };
        }
      }

      init(imagePath: string) {
        for (let i = 0; i < this.options.numLeaves; i++) {
          const leaf: Leaf = {
            el: document.createElement("div"),
            x: 0,
            y: 0,
            z: 0,
            rotation: { axis: "X", value: 0, speed: 0, x: 0 },
            xSpeedVariation: 0,
            ySpeed: 0,
          };
          this._resetLeaf(leaf, currentSeasonImagePath);
          this.leaves.push(leaf);
          this.world.appendChild(leaf.el);
        }

        this.world.className = "leaf-scene";
        this.viewport.appendChild(this.world);
        this.world.style.perspective = "400px";

        window.onresize = () => {
          this.width = this.viewport.offsetWidth;
          this.height = this.viewport.offsetHeight;
        };
      }

      render() {
        this._updateWind();
        this.leaves.forEach((leaf) => this._updateLeaf(leaf));
        this.timer++;
        requestAnimationFrame(this.render.bind(this));
      }
    }

    if (containerRef.current) {
      const leaves = new LeafScene(containerRef.current);
      leaves.init(currentSeasonImagePath);
      leaves.render();
    }
  }, [season, currentSeasonImagePath]);

  return <div ref={containerRef} className="falling-leaves absolute"></div>;
};

export default FallingLeaves;
