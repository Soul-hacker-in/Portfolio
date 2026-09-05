import { createContext, useContext, useEffect, useState } from 'react';

export const CanvasContext = createContext({
  canvasEnabled: true,
  toggleCanvas: () => {},
});

const STORAGE_KEY = 'portfolio_canvas_effect_enabled';

export const CanvasProvider = ({ children }) => {
  const [canvasEnabled, setCanvasEnabled] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setCanvasEnabled(stored === 'true');
      }
    } catch {
      // Ignore localStorage read errors in SSR/incognito
    }
  }, []);

  const toggleCanvas = () => {
    setCanvasEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // Ignore localStorage write errors
      }
      return next;
    });
  };

  return (
    <CanvasContext.Provider value={{ canvasEnabled, toggleCanvas }}>
      {children}
    </CanvasContext.Provider>
  );
};

export function useCanvas() {
  return useContext(CanvasContext);
}
