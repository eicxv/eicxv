import { useRef, useState, useEffect, useCallback } from 'react';

export default function useResizeObserver(ref) {
  const [contentRect, setContentRect] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      console.log(entries);
      // if (!Array.isArray(entries) || !entries.length) {
      //   return;
      // }
      // const entry = entries[0];
      // if (width != entry.contentRect.width) {
      //   setWidth(entry.contentRect.width);
      // }
      // if (height != entry.contentRect.height) {
      //   setHeight(entry.contentRect.height);
      // }
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, []);

  return contentRect;
}

// // -----------

// function getRect(element) {
//   if (!element) {
//     return null;
//   }
//   const rect = element.getBoundingClientRect();
//   return rect;
// }

// function useBoundingRect(ref) {
//   const [rect, setRect] = useState(getRect(ref?.current));

//   var handleResize = useCallback(
//     function handleResize() {
//       if (ref.current) {
//         setRect(getRect(ref.current));
//       }
//     },
//     [ref]
//   );

//   useEffect(
//     function () {
//       if (!ref.current) {
//         return;
//       }

//       handleResize();

//       if (typeof ResizeObserver === 'function') {
//         var resizeObserver = new ResizeObserver(function () {
//           handleResize();
//         });
//         resizeObserver.observe(ref.current);

//         return function () {
//           resizeObserver.disconnect(ref.current);
//           resizeObserver = null;
//         };
//       } else {
//         window.addEventListener('resize', handleResize);

//         return function () {
//           window.removeEventListener('resize', handleResize);
//         };
//       }
//     },
//     [ref.current]
//   );

//   return rect;
// }

// export default useBoundingRect;
