import { useCallback, useEffect, useRef } from "react";
import { EngineStatus } from "../../../../api/Slices/engine/types";
import { CarCondition } from "../../../../api/Slices/garage/types";
import useWinnerStore from "../Store/Use-winner-store";

const INCREASE_SPEED = 1;
const DIVIDER = 1000;
const ZERO = 0;

interface UseCarAnimationProps {
  status: EngineStatus;
  speed: number;
  condition: CarCondition;
  initialPosition: number;
  onReachTheEnd: (position: number, time: number) => void;
  handlePosition: (position: number) => void;
}

interface UseCarAnimationResult {
  carRef: React.RefObject<HTMLDivElement | null>;
}

export default function useCarAnimation({
  status,
  speed,
  condition,
  initialPosition,
  onReachTheEnd,
  handlePosition
}: UseCarAnimationProps): UseCarAnimationResult {
  const positionRef = useRef<number>(initialPosition);
  const animationId = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const roadLength = useRef<number>(ZERO);
  const isCarStarted = useRef<boolean>(false);
  const startTimeRef = useRef<number | null>(null);
  const { raceInProgress } = useWinnerStore(state => ({
    raceInProgress: state.raceInProgress
  }));
  const animate = useCallback(
    (time: number): void => {
      if (previousTimeRef.current !== null && condition === CarCondition.running) {
        const deltaTime = time - previousTimeRef.current;

        const adjustedSpeed = status === EngineStatus.drive ? speed * INCREASE_SPEED : speed;
        const newPosition = positionRef.current + (adjustedSpeed * deltaTime) / DIVIDER;

        positionRef.current = Math.min(newPosition, roadLength.current);

        if (positionRef.current >= roadLength.current) {
          // elapsed in seconds
          const elapsed = startTimeRef.current !== null ? (time - startTimeRef.current) / DIVIDER : ZERO;
          onReachTheEnd(positionRef.current, +elapsed.toFixed(1));
          return;
        }

        if (carRef.current) {
          carRef.current.style.transform = `translateX(${positionRef.current}px)`;
        }
      }

      if (condition === CarCondition.running) {
        previousTimeRef.current = time;
        animationId.current = requestAnimationFrame(animate);
      }
    },
    [speed, status, onReachTheEnd, condition]
  );

  const handleResize = useCallback((): void => {
    if (carRef.current?.parentElement) {
      roadLength.current = carRef.current.parentElement.scrollWidth - carRef.current.scrollWidth || ZERO;
    }
  }, []);

  useEffect(() => {
    if (carRef.current?.parentElement) {
      positionRef.current = initialPosition;
      carRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }
  }, [initialPosition]);

  useEffect(() => {
    if (!raceInProgress) {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
      return;
    }

    if (carRef.current?.parentElement) {
      roadLength.current = carRef.current.parentElement.scrollWidth - carRef.current.scrollWidth || ZERO;
    }

    window.addEventListener("resize", handleResize);

    if (status !== EngineStatus.stopped) {
      // Only set these once, when animation starts
      if (animationId.current === null) {
        previousTimeRef.current = performance.now();
        if (positionRef.current === initialPosition) {
          startTimeRef.current = previousTimeRef.current;
        }
        animationId.current = requestAnimationFrame(animate);

        if (!isCarStarted.current) {
          handlePosition(1);
          isCarStarted.current = true;
        }
      }
    } else if (animationId.current) {
      if (condition === CarCondition.broken) {
        handlePosition(positionRef.current);
      } else if (positionRef.current < roadLength.current) {
        if (carRef.current) {
          positionRef.current = ZERO;
          carRef.current.style.transform = "translateX(0px)";
        }
      }

      cancelAnimationFrame(animationId.current);
      animationId.current = null;
      previousTimeRef.current = null;
      startTimeRef.current = null;
      isCarStarted.current = false;
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
    };
  }, [condition, speed, animate, handleResize, status, handlePosition, initialPosition, raceInProgress]);
  return { carRef };
}
