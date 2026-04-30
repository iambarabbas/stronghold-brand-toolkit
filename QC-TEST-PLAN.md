# QC Test Plan - Stronghold Brand Toolkit (4-29 Revisions)

## How to Test

Open `index.html` in your browser and follow these test scenarios:

---

## Test 1: Aspirational Websites (NEW SECTION)

**Location:** Session 2, before Image Sort

### Visual Check:
- [ ] New card titled "Aspirational Websites" appears
- [ ] Card eyebrow says "Pre-Session Exercise"
- [ ] Description mentions "3-5 websites" and "digital references"

### Functional Check:
- [ ] URLs 1-3 have red asterisks (required)
- [ ] URLs 4-5 labeled "(optional)" in gray
- [ ] Each URL has a "Why" text area below it

### Validation Check:
1. Leave all fields empty → Click "Next"
   - **Expected:** Should block and highlight URL 1
2. Fill only URL 1 → Click "Next"
   - **Expected:** Should block and highlight URL 2
3. Fill URLs 1-3 (leave "Why" empty) → Click "Next"
   - **Expected:** Should proceed to next section ✅
4. Fill URLs 1-5 with all "Why" fields → Click "Next"
   - **Expected:** Should proceed ✅

---

## Test 2: Exercise 2.1 Image Sort - "Why" Fields Made Optional

**Location:** Session 2, Exercise 2.1

### Visual Check:
- [ ] Images 1-4 URLs have red asterisks
- [ ] Images 5-7 URLs labeled "(optional)"
- [ ] All "Why" text areas visible

### Validation Check:
1. Enter only URL 1 (leave "Why" blank) → Click "Next"
   - **Expected:** Should block (URL 2 required)
2. Enter URLs 1-4 only (leave all "Why" fields blank) → Click "Next"
   - **Expected:** Should proceed ✅ (This is the fix!)
3. Leave URL 1 blank but fill "Why 1" → Click "Next"
   - **Expected:** Should block (URL required)

**Bug that was fixed:** Previously, "Why" fields 1-4 were required. Now only URLs 1-4 are required.

---

## Test 3: Exercise 2.4 Checkbox Validation

**Location:** Session 2, Exercise 2.4 "Visual Content Standards"

### Visual Check:
- [ ] Question says "* (select at least one)"
- [ ] 8 checkboxes visible (Field photography, Portrait, etc.)

### Validation Check:
1. Leave ALL checkboxes unchecked → Fill all other fields → Click "Next"
   - **Expected:** Alert: "You must select at least one content type" ✅
   - **Expected:** Page scrolls to checkbox section
2. Check 1 checkbox → Fill other fields → Click "Next"
   - **Expected:** Proceed to next session ✅
3. Check multiple checkboxes → Fill other fields → Click "Next"
   - **Expected:** Proceed ✅

**Bug that was fixed:** Previously could click through without selecting any checkboxes. Now blocks if none selected.

---

## Test 4: Exercise 2.2 Placeholder Text Updates

**Location:** Session 2, Exercise 2.2 "Color Palette Review"

### Visual Check:
- [ ] Placeholder text for Midnight Navy notes: `"...If confirmed selected type N/A"`
- [ ] Placeholder text for Operator Gold notes: `"...If confirmed selected type N/A"`
- [ ] Placeholder text for Deep Steel notes: `"...If confirmed selected type N/A"`
- [ ] OLD text "leave blank if confirmed" should NOT appear

### Validation Check:
1. Select "Confirmed" for Midnight Navy
2. Leave notes field BLANK → Click "Next"
   - **Expected:** Validation error (field required)
3. Type "N/A" in notes field → Click "Next"
   - **Expected:** Proceeds ✅
4. Repeat for Gold and Steel colors

**Bug that was fixed:** Placeholder said "leave blank" but validation required a value. Now says "type N/A".

---

## Test 5: Exercise 2.3 Typography Placeholder Text

**Location:** Session 2, Exercise 2.3 "Typography Gut Check"

### Visual Check:
- [ ] Bebas Neue notes placeholder: `"...If confirmed selected type N/A"`
- [ ] Inter Bold notes placeholder: `"...If confirmed selected type N/A"`
- [ ] Libre Baskerville notes placeholder: `"...If confirmed selected type N/A"`

### Validation Check:
Same as Test 4 - select "Confirmed" and type "N/A" to pass validation.

---

## Test 6: Exercise 4.3 Story Bank - Team Member Removed

**Location:** Session 4, Exercise 4.3 "Story Bank Categories"

### Visual Check:
- [ ] Card description says: "...what's the minimum viable capture? Agree on where stories are stored..."
- [ ] Card description does NOT say: "Assign a team member"
- [ ] Label for category 1: `"name + minimum viable capture method"`
- [ ] Label does NOT say: `"+ who's responsible"`
- [ ] Labels for categories 2-3: `"name + capture method"`

**Bug that was fixed:** Labels and description mentioned "assign team member" / "who's responsible". Now removed.

---

## Summary of Fixes

| # | Issue | Fixed? | How to Verify |
|---|-------|--------|---------------|
| 1 | Missing Aspirational Websites section | ✅ | See new card in Session 2 |
| 2 | Image Sort "Why" fields incorrectly required | ✅ | Can leave "Why" blank for images 1-4 |
| 3 | Image Sort URLs 5-7 validation | ✅ | Already optional, no change needed |
| 4 | Exercise 2.4 checkbox validation fails | ✅ | Alert appears if none checked |
| 5 | Color/Typography placeholder says "leave blank" | ✅ | Now says "type N/A" |
| 6 | Story Bank mentions team member | ✅ | Text removed from labels |

---

## Browser Compatibility

Test in:
- [ ] Chrome/Edge
- [ ] Safari
- [ ] Firefox

---

## Final Checks

- [ ] No console errors (F12 → Console)
- [ ] All sessions load properly
- [ ] Progress bar works (shows active/done states)
- [ ] "Next" button validation works for all sessions
- [ ] LocalStorage save/load works (refresh page, data persists)

---

## Sign-Off

Tested by: ________________
Date: ________________
Browser: ________________
Result: PASS / FAIL
Notes: ________________
