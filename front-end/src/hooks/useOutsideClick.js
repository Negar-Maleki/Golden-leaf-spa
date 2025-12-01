import { useEffect, useRef } from "react";

function useOutsideClick(handle, listenCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    function onDocumentClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handle && handle(e);
      }
    }
    document.addEventListener("click", onDocumentClick, listenCapturing);
    return () => {
      document.removeEventListener("click", onDocumentClick, listenCapturing);
    };
  }, [handle, listenCapturing]);

  return ref;
}

export default useOutsideClick;
