import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleCallbackHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // store JWT somewhere (localStorage)
      localStorage.setItem("token", token);

      // remove ?token=... from URL
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <p>Signing in with Google…</p>;
}
