# `websnapse-3`

Hypothetical WebSnapse upgrade project. Maybe I'll get ahold of this in Y3 S1, but I think it'd be helpful to lay out some preliminaries so that I can hit the ground running.

## Tech Stack

- `create-t3-app`
  - Next.js
  - TypeScript
  - Tailwind CSS

This covers the frontend bits.

- Testing
  - Vitest
  - Playwright

WebSnapse is a project that I feel is very "testable": given that SN P systems (and their simulations) are essentially algorithmic entities, the tests shouldn't be that difficult to come up with.

Playwright is there for E2E testing purposes.

- Backend?
  - file uploads/downloads
  - database for community-contributed samples

This may be the first personal project where I sink deep into backend work: it's kinda exciting! I'm planning on exploring cutting-edge technologies for this: MERN may work, but I want to familiarize myself with something new that can possibly make backend 'click' with me.

- Deployment
  - in Vercel we trust
