## Pull Request Checklist

Please review and check all that apply before requesting a review:

The goal is to ensure the work is ready for QA, Design Review and can easily fulfill the acceptance criteria.

- [ ] Fulfills Acceptance Criteria
- [ ] Mobile First Design and use of responsive properties rem and %
- [ ] Above the fold / Below the fold optimization
- [ ] Using NextJs Image + Link Components
- [ ] Ensure 'use client' is only used when necessary to avoid non server side rendering
- [ ] Logic Optimization using Memo
- [ ] Render Hidden Content to allow full page SEO/GEO
- [ ] All unused SCSS classes, variables, types and console logs removed
- [ ] Storybook: setup args, conditional prop types + logic

---

**User Story**
<!-- ex.As a {user} I want to {user journey} so that {user need} -->
As a user browsing games, I want to see Metric Gamers breakdown of a game so that I can learn more about their ranking, relevant game information at a glance through a clean and attractive interface without getting overwhelmed or confused, I would like the ability to learn more however that goes into more depth about the ranking consideration for a metric.

<!-- Describe the requirements/objective of this component in bullet form -->
**Acceptance Criteria:**
- Display category tags (top of component)
- Game Title
- Rating for relevant metrics
- Game Tags
- Images
- Accordion to learn more