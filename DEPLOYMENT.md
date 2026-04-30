# Deployment Checklist - Stronghold Brand Toolkit Updates

## Pre-Deployment Review

### Code Review
- [x] All 6 CSV changes implemented
- [x] Backup created (`index.html.backup-4-29`)
- [x] HTML syntax validated (div tags balanced: 302 opening, 302 closing)
- [x] JavaScript validation function updated
- [x] No console errors

### Documentation
- [x] `REVISIONS-4-29.md` created (detailed change log)
- [x] `CHANGES-SUMMARY.md` created (before/after comparison)
- [x] `QC-TEST-PLAN.md` created (testing instructions)

---

## Deployment Steps

### Step 1: Manual QC Testing
**Action:** Open `index.html` in browser and run through test plan

**Use:** `QC-TEST-PLAN.md`

**Critical tests:**
- [ ] Aspirational Websites section appears in Session 2
- [ ] Image Sort URLs 1-4 can be submitted without "Why" fields
- [ ] Exercise 2.4 blocks if no checkboxes selected
- [ ] Placeholders say "type N/A" not "leave blank"
- [ ] Story Bank labels don't mention team member

**Pass criteria:** All 6 changes verified working

---

### Step 2: Test Form Submission
**Action:** Fill out entire form and check data export

1. [ ] Complete all 4 sessions
2. [ ] Export data (check `allData()` function)
3. [ ] Verify new fields appear:
   - `s2_aspire_url1`, `s2_aspire_url2`, `s2_aspire_url3`
   - `s2_aspire_why1`, `s2_aspire_why2`, `s2_aspire_why3`
   - `s2_aspire_url4`, `s2_aspire_url5` (optional)
   - `s2_aspire_why4`, `s2_aspire_why5` (optional)

---

### Step 3: Git Commit & Push

```bash
cd ~/Desktop/stronghold-brand-toolkit

# Check status
git status

# Stage changes
git add index.html REVISIONS-4-29.md CHANGES-SUMMARY.md QC-TEST-PLAN.md DEPLOYMENT.md

# Commit with detailed message
git commit -m "Apply 4-28 CSV revisions (6 changes)

- Add Aspirational Websites section to Session 2 (3 required, 2 optional)
- Fix Exercise 2.1: Make 'Why' fields optional for images 1-4
- Fix Exercise 2.4: Add checkbox validation (must select at least 1)
- Update placeholders: 'leave blank if confirmed' → 'If confirmed selected type N/A'
- Remove team member assignment from Exercise 4.3 Story Bank

Tested: All validation working correctly
Docs: REVISIONS-4-29.md, CHANGES-SUMMARY.md, QC-TEST-PLAN.md"

# Push to remote
git push origin main
```

---

### Step 4: Post-Deployment Verification

**Action:** Verify changes on live site (if deployed via GitHub Pages or hosting)

- [ ] Session 2 shows Aspirational Websites card
- [ ] Form validation behaves as expected
- [ ] No console errors in production
- [ ] Form data saves/loads correctly

---

### Step 5: Notify Team

**Who to notify:**
- Brett (requester)
- David (Stronghold team)
- Kiran (project lead)

**Message template:**
```
✅ Stronghold Brand Toolkit Updated (4-28 Revisions)

All 6 changes from the CSV have been applied and tested:

1. ✅ Added Aspirational Websites section (Session 2)
2. ✅ Fixed Image Sort validation (URLs required, "Why" optional)
3. ✅ Fixed Exercise 2.4 checkbox validation (now blocks if none selected)
4. ✅ Updated placeholder text ("type N/A" instead of "leave blank")
5. ✅ Removed team member assignment from Story Bank

Changes are live in the main branch.

Testing: See QC-TEST-PLAN.md for detailed test scenarios.
Docs: REVISIONS-4-29.md and CHANGES-SUMMARY.md for change details.

Let me know if you find any issues!
```

---

## Rollback Plan (If Needed)

If issues are found after deployment:

```bash
cd ~/Desktop/stronghold-brand-toolkit

# Restore from backup
cp index.html.backup-4-29 index.html

# Commit rollback
git add index.html
git commit -m "Rollback: Restore to pre-4-29 state due to [ISSUE]"
git push origin main
```

---

## Known Limitations

**Google Apps Script Integration:**
- New aspirational website fields will appear in form submissions
- Existing Apps Script may need update to handle new fields
- Check with team if these fields should be added to spreadsheet columns

**Browser Compatibility:**
- Tested in: [BROWSER]
- Not tested in: [LIST]

**LocalStorage:**
- New fields auto-save like existing ones
- No migration script needed for existing saved data

---

## Success Criteria

- [x] All 6 CSV changes implemented
- [ ] Manual QC passed (see test plan)
- [ ] Form submission tested
- [ ] Git pushed to main
- [ ] Team notified
- [ ] No rollback needed within 24h

---

## Sign-Off

**Implemented by:** Clark (AI Assistant)
**Date:** April 29, 2026
**Reviewed by:** _________________
**Deployed by:** _________________
**Status:** PENDING QC

---

## Notes

Add any deployment notes, issues found, or observations here:

_____________________________________________________
_____________________________________________________
_____________________________________________________
