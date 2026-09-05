import { useEffect, useRef } from 'react';
import { useLocation } from '@remix-run/react';
import { useCanvas } from './canvas-context';
import { startCanvas, stopCanvas } from '~/components/renderCanvas';
import styles from './background-canvas.module.css';

export function BackgroundCanvas() {
  const { canvasEnabled } = useCanvas();
  const canvasRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (canvasEnabled && canvasRef.current) {
      startCanvas(canvasRef.current);
    } else {
      stopCanvas();
    }

    return () => {
      stopCanvas();
    };
  }, [canvasEnabled, location.pathname]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className={styles.canvas}
      data-visible={canvasEnabled}
      aria-hidden="true"
    />
  );
}
