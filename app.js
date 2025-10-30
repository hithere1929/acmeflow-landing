(function(){
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

  // Mobile menu toggle
  const navToggle = $('.nav-toggle');
  const mobileMenu = $('#mobile-menu');
  if(navToggle && mobileMenu){
    navToggle.addEventListener('click',()=>{
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen? 'Close menu':'Open menu');
    });
    // Close menu on link click
    $$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>{
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }));
  }

  // Smooth scroll handled by CSS. Also close mobile on desktop links
  $$('#desktop-menu a').forEach(a=>a.addEventListener('click',()=>{
    mobileMenu?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded','false');
  }));

  // Intersection Observer for reveal animations
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },{ threshold: 0.12 });
  $$('.reveal').forEach(el=>io.observe(el));

  // Track CTA clicks
  $$('[data-track]').forEach(el=>{
    el.addEventListener('click',()=>{
      const key = el.getAttribute('data-track');
      console.log('[track]', key);
    });
  });

  // Contact form validation + mock POST
  const form = $('#contact-form');
  const statusBox = $('#form-status');
  if(form){
    const fields = {
      fullName: $('#fullName'),
      email: $('#email'),
      company: $('#company'),
      message: $('#message')
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function setFieldError(input, msg){
      const container = input.closest('.form-field');
      const error = $('.field-error', container);
      if(error){ error.textContent = msg || ''; }
      if(msg){ input.setAttribute('aria-invalid','true'); }
      else { input.removeAttribute('aria-invalid'); }
    }
    function validate(){
      let ok = true;
      if(!fields.fullName.value.trim()){
        setFieldError(fields.fullName,'Full name is required.'); ok=false;
      } else setFieldError(fields.fullName,'');
      if(!emailRegex.test(fields.email.value.trim())){
        setFieldError(fields.email,'Please enter a valid email.'); ok=false;
      } else setFieldError(fields.email,'');
      if(!fields.message.value.trim()){
        setFieldError(fields.message,'Please add a short message.'); ok=false;
      } else setFieldError(fields.message,'');
      // Company optional
      return ok;
    }

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      statusBox.className = 'form-status';
      statusBox.textContent = '';
      if(!validate()) return;

      const btn = $('button[type="submit"]', form);
      btn.disabled = true; btn.style.opacity = .7;
      try{
        // Mock API call
        const payload = {
          fullName: fields.fullName.value.trim(),
          email: fields.email.value.trim(),
          company: fields.company.value.trim(),
          message: fields.message.value.trim()
        };
        console.log('Submitting form', payload);
        await new Promise(res=>setTimeout(res, 900));
        // If real endpoint needed, uncomment:
        // await fetch('https://httpbin.org/post',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});

        statusBox.classList.add('success');
        statusBox.textContent = 'Thanks! Your message has been sent.';
        form.reset();
      }catch(err){
        statusBox.classList.add('error');
        statusBox.textContent = 'Sorry, something went wrong. Please try again.';
      }finally{
        btn.disabled = false; btn.style.opacity = 1;
      }
    });
  }
})();


