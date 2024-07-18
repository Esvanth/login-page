document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordLink = document.getElementById("forgotPassword");
    const forgotPasswordModal = document.getElementById("forgotPasswordModal");
    const closeModal = document.querySelector(".close");
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      forgotPasswordModal.style.display = "block";
    });
  
    closeModal.addEventListener("click", () => {
      forgotPasswordModal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = "none";
      }
    });
  
    forgotPasswordForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
  
      fetch("http://localhost:4000/api/send-reset-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          forgotPasswordModal.style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
  