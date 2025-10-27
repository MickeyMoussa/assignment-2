# AI Use
AI was used in this assignment. Particularly, it was used to generate Regular Expressions for string matching in the form input validation
## log
Here’s an updated set of eight hypothetical prompt‑versus‑response examples. Each answer now includes a short code fragment to illustrate the concept, while keeping the emphasis on explanation rather than wall‑to‑wall code.

**1. Prompt:** *“my winbox window is empty even though I mounted content in it due to it being hidden. How do I unhide it when clicked to show it in the window?”*
**Output:** Blank windows usually mean the element you’re mounting is still hidden. Use the `hidden` attribute or a `display:none` style, but remember to remove it just before mounting. For example, in your click handler you might do:

```js
content.hidden = false;        // unhide before mount
content.style.removeProperty('display');
```

…and then, in the `onclose` callback, re‑hide it with `content.hidden = true;`. Also make sure your script runs after the DOM is loaded by adding `defer` to your script tag.

---

**2. Prompt:** *“stop more than 1 winbox opening at a time”*
**Output:** Track the window instance in a variable so you can detect if it already exists. A typical pattern looks like:

```js
let aboutWin = null;
icon.addEventListener('click', () => {
  if (aboutWin) { aboutWin.focus(); return; }
  aboutWin = new WinBox({ /* options */ });
});
```

When you close the window, set `aboutWin = null;` in the `onclose` callback. This way, subsequent clicks will reuse the existing window rather than spawning a new one.

---

**3. Prompt:** *“the validator works but now the icon/winbox broken”*
**Output:** An unhandled error in your validation logic can halt the rest of your script. It’s good practice to isolate your form code in its own function and call it after the DOM is ready. For example:

```js
function initFormValidation() {
  // attach event listeners and regex tests here
}
document.addEventListener('DOMContentLoaded', initFormValidation);
```

Also check your browser console for errors—sometimes a typo in a regex or an element lookup (`form.elements.email`) can throw an exception and prevent later code (like your WinBox setup) from running.

---

**4. Prompt:** *“how can I display greeting messages in the page?”*
**Output:** Compute the current hour and then use a conditional expression. One concise approach is:

```js
const hour = new Date().getHours();
const greeting =
  hour < 12 ? 'Good morning!' :
  hour < 18 ? 'Good afternoon!' :
              'Good evening!';
```

Then insert `greeting` into an element’s text content. Running this code after the DOM loads ensures the element is present when you set its content.

---

**5. Prompt:** *“how do I keep the inspiration hidden until a click is done then not hidden”*
**Output:** Place the text in the HTML but keep it hidden by default with the `hidden` attribute:

```html
<h6 id="inspiration" hidden>I'm inspired by many people…</h6>
```

When the icon is clicked, unhide it with `element.hidden = false;`, mount it in a WinBox, and re‑apply `hidden = true` when the window closes. Don’t mix `hidden` with inline `style="display:none"` unless you carefully remove both, because two layers of hiding can lead to blank windows.

---

**6. Prompt:** *“/^[A-Za-z]{2,}$/ works for email validation”*
**Output:** It might be too restrictive. The pattern you showed, for example `/^[A-Za-z]{2,}$/`, would reject perfectly valid emails. A more forgiving pattern is:

```js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
```

This checks for at least one character before and after the `@`, and a domain with a dot and at least two characters. It isn’t perfect, but it covers most real‑world addresses without being overly strict.

---

**7. Prompt:** *“hidden and display: none are the same thing?”*
**Output:** The `hidden` attribute is semantically meaningful—it hints to browsers and assistive technologies that the content shouldn’t be displayed. Inline styles (`style="display:none"`) are more manual and override any CSS classes you might apply later. For example:

```html
<h6 id="aboutmecontent" hidden>…</h6>   <!-- hidden attribute -->
<h6 id="aboutmecontent" style="display:none">…</h6> <!-- inline style -->
```

Both hide the element visually, but the first is cleaner when toggling with `element.hidden = false;` in JavaScript.

---

**8. Prompt:** *“I will split the validation and the winbox js into two I think thats whats causing errors.”*
**Output:** Splitting can improve readability. For example, put your WinBox logic in `windows.js` and your form validation in `form-validation.js`. In your HTML you’d load them like this:

```html
<script src="js/windows.js" defer></script>
<script src="js/form-validation.js" defer></script>
```

The `defer` attribute tells the browser to wait until the DOM is fully parsed before executing each file, ensuring that your code runs in the right order without blocking page rendering. This separation doesn’t fix logic issues on its own, but it makes each concern easier to maintain.
