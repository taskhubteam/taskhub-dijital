/**
 * Scrolls to the contact section on the current page or navigates to home page contact section
 */
export function scrollToContact() {
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  } else {
    // If contact section doesn't exist on current page, navigate to home page
    window.location.href = "/#contact";
  }
}
