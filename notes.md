# Payments API

Link: [https://dashboard.stripe.com/test/]

1. Create new Stripe project
2. Copy _STRIPE SECRET KEY_ and _NEXT PUBLIC STRIPE PUBLIC KEY_ into the env variables
3. Create product and get _STRIPE PRICE ID_
4. Set _FRONTEND URL_ from CodeSandbox preview eg. [https://******.sse.codesandbox.io/]
5. Configure _Terms of Service_ and _Privacy Policy_ in [https://dashboard.stripe.com/test/settings/billing/portal]
6. Go to Developer -> Webooks and _Add Endpoint_ with events
   **checkout.session.completed**, **customer.subscription.updated** and **customer.subscription.deleted** and endpoint url [/api/billing/hook] eg. [https://rn9mm.sse.codesandbox.io/api/billing/hook]
7. Copy _STRIPE WEBHOOK SECRET_ from the endpoint

# Landing Page

Link: [https://openchakra.app/]

8. Import _components.json_ into the editor
9. Edit the layout with new marketing copy and theming
10. Do **Export code** and copy the _exported code_ into _pages/index.js_

# Domain and legal

Link: [https://domains.google.com/registrar]

11. Buy domain
12. Setup _contact_ email alias
13. Change domain and company name in _pages/terms.js_ and _pages/privacy.js_

# Marketing Analytics

Link: [https://analytics.google.com/analytics/web/]

14. Create a new google analytics property
15. Copy **tracking_id** _UA-xxxxxxxx-x_ into _pages/index.js_

# Product Analytics

Link: [https://app.fullstory.com/]

16. Create a new fullstory account with _contain@domain_ email
17. Copy **org_id** _xxxxxx_ into _components/seo.js_
