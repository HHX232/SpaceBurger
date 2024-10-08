import { useEffect, useMemo, useState,RefObject } from "react";

// Кастомный хук для отслеживания видимости компонента в окне 

export default function useOnScreen(ref: RefObject<Element>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting)
      }
      ),
    [ref]
  );

  useEffect(() => {
    if(ref.current){
    observer.observe(ref.current);
  }
   
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
