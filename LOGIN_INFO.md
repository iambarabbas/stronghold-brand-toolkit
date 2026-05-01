# Stronghold Brand Toolkit - Password Protected

## Access Information

**Live URL:** https://iambarabbas.github.io/stronghold-brand-toolkit/

**Login Page:** https://iambarabbas.github.io/stronghold-brand-toolkit/login.html

**Password:** `Stronghold2026`

---

## How It Works

1. When users visit the toolkit, they are automatically redirected to `login.html`
2. They enter the password: `Stronghold2026`
3. Upon successful login, they are redirected to the main toolkit page
4. Authentication is stored in `sessionStorage` (lasts for the browser session)
5. If they close the browser, they'll need to log in again

---

## Security Note

This is client-side authentication only (password is in JavaScript). It provides basic protection but is NOT secure against determined users who can view source code. For true security, you would need server-side authentication.

This solution is appropriate for:
- ✅ Sharing with trusted partners
- ✅ Light protection from casual access
- ✅ Simple password-gating without backend infrastructure

**Not appropriate for:**
- ❌ Highly sensitive data
- ❌ Public-facing critical resources
- ❌ Compliance-required security
