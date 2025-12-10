export async function signupApi({ name, email, password, role, avatar }) {
  const response = await fetch("http://localhost:5000/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role, avatar }),
    credentials: "include",
  });

  const text = await response.text();

  const data = (() => {
    try {
      return JSON.parse(text);
    } catch (err) {
      return { message: text };
    }
  })();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
}

export async function loginApi({ email, password }) {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // Important: sends cookies
  });

  // Attempt JSON parse; fall back to text for non-JSON errors
  const text = await response.text();
  const data = (() => {
    try {
      return JSON.parse(text);
    } catch (err) {
      return { message: text };
    }
  })();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch("http://localhost:5000/api/login/user", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await response.json();

  return data;
}

export async function logoutApi() {
  const response = await fetch("http://localhost:5000/api/login/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return true;
}
