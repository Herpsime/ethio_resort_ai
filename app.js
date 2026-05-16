function initAuth() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // ---------- API HELPER ----------
  async function apiCall(endpoint, data) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      return { success: false, message: "Network error" };
    }
  }

  // ---------- REGISTER ----------
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;

      const result = await apiCall("/api/register", { name, email, password });

      if (result.success) {
        alert("Registration successful!");
        window.location.href = "login.html";
      } else {
        alert(result.message);
      }
    });
  }

  // ---------- LOGIN ----------
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const errorMsg = document.getElementById("errorMsg");

      const result = await apiCall("/api/login", { email, password });

      if (result.success) {
        // Save fake session
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        alert("Login successful!");
        window.location.href = "dashboard.html";
      } else {
        errorMsg.innerText = result.message;
      }
    });
  }
}
