
// Get current hour

const now = new Date();
const hour = now.getHours();
let greeting;


if (hour < 12) {
    greeting = "Good morning!";
} else if (hour < 18) {
    greeting = "Good afternoon!";
} else {
    greeting = "Good evening!";
}

function makeWindow(iconSelector, contentId, title, background) {
    const icon = document.querySelector(iconSelector);
    const content = document.getElementById(contentId);
  
    // keep original spot to put the node back
    const placeholder = document.createComment(`${contentId} placeholder`);
    content.parentNode.insertBefore(placeholder, content.nextSibling);
  
    let win = null;
  
    icon.addEventListener('click', () => {
      if (win) { win.focus(); return; }
      content.hidden = false;
      content.style.removeProperty('display');
  
      win = new WinBox({
        title,
        background,
        width: 400,
        height: 400,
        mount: content,
        onclose: () => {
          placeholder.parentNode.insertBefore(content, placeholder);
          content.hidden = true;
          win = null;
        }
      });
    });
  }
  
  
  makeWindow('.aboutme', 'aboutmecontent', 'About Me', '#d2738a');
  makeWindow('.inspiration', 'inspiration', 'Inspiration', '#d2738a');



  