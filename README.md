AcmeFlow Landing Page

A polished, responsive single-page marketing site for AcmeFlow (SaaS workflow automation).

Tech
- HTML5, CSS3, JavaScript (no frameworks)
- Font: Inter

Structure
- `index.html` – semantic layout and content
- `styles.css` – responsive styles, animations, branding
- `app.js` – interactivity (menu, scroll reveal, form)
- `assets/` – logo, icons, avatars, dashboard placeholder

Running locally
Open `index.html` directly or serve via a local server:

```bash
python -m http.server 5500
```

Accessibility
- All images include alt text
- Form fields are labeled and announce errors
- Keyboard focus states are visible and meet contrast
- Mobile menu button uses aria-expanded

Notes
- Smooth scroll: CSS `scroll-behavior: smooth`
- Scroll reveal: IntersectionObserver
- Form submission is mocked; replace endpoint in `app.js`

Lighthouse targets
- Performance ≥ 85
- Accessibility ≥ 85

License
© 2025 AcmeFlow Technologies. All rights reserved.


