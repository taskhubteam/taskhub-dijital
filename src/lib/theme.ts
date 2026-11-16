export const THEME_KEY = "taskhub-dijital-theme";

/**
 * Runs before first paint (inlined in <head> by the root layout) so the saved / system theme is
 * applied without a light→dark flash on server-rendered pages.
 */
export const THEME_BOOT_SCRIPT = `try{if(location.pathname.indexOf("/admin")===0)throw 0;var t=localStorage.getItem("${THEME_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}`;
