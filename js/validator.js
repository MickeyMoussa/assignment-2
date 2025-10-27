const form = document.querySelector('form');

  if (form) {
    const rules = {
      name: {
        el: form.elements.name,
   
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ'.\- ]{2,40}$/,
        message: "Use 2–40 letters (spaces, - ' . allowed)."
      },
      email: {
        el: form.elements.email,
      
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
        message: "Enter a valid email like name@example.com."
      },
      message: {
        el: form.elements.message,
    
        test: v => v.trim().length >= 10,
        message: "Please write at least 10 characters."
      }
    };
  
    function fieldMsgNode(input) {
      let n = input.parentElement.querySelector('.field-msg');
      if (!n) {
        n = document.createElement('div');
        n.className = 'field-msg';
        input.parentElement.appendChild(n);
      }
      return n;
    }
  
    function validateKey(key) {
      const r = rules[key];
      const v = r.el.value;
      const ok = r.regex ? r.regex.test(v) : r.test(v);
      const msg = fieldMsgNode(r.el);
  
      if (!ok) {
        r.el.setAttribute('aria-invalid', 'true');
        msg.textContent = r.message;
        msg.className = 'field-msg error';
      } else {
        r.el.removeAttribute('aria-invalid');
        msg.textContent = "✓";
        msg.className = 'field-msg ok';
      }
      return ok;
    }
  
    
    Object.keys(rules).forEach(k => {
      ['input', 'blur'].forEach(ev =>
        rules[k].el.addEventListener(ev, () => validateKey(k))
      );
    });
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const allOK = Object.keys(rules).every(validateKey);
  
      let status = document.getElementById('form-status');
      if (!status) {
        status = document.createElement('div');
        status.id = 'form-status';
        form.appendChild(status);
      }
  
      if (allOK) {
        status.textContent = "All good — your message looks valid!";
        status.className = 'form-status ok';
        form.reset();
        
        form.querySelectorAll('.field-msg').forEach(n => (n.textContent = ''));
      } else {
        status.textContent = "Please fix the highlighted fields.";
        status.className = 'form-status error';
      }
    });
  }
