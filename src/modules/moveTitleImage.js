/**
 * Description - Moves title image up on page
 *  load.
 */

const moveTitleImage = () => {
  const app = document.getElementById("app");
  const el = document.getElementById("titleImage");
  
  el.classList.add("moveImage");
  app.classList.add("moveApp");
};

export { moveTitleImage as default };
