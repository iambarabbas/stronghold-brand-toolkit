# Changes Summary - Stronghold Brand Toolkit (April 29, 2026)

## CSV Source
File: `4-28.csv` from Brett's Desktop

---

## Change 1: Added Aspirational Websites Section

**CSV Request:**
> "Missing Websites that Stronghold wants to emulate. Aspirational websites / digital references. Submit 3-5 sites that nail the feeling Stronghold wants. Add a text box for a URL and a text box for Why. Make only 3 mandatory"

**BEFORE:** No aspirational websites section existed

**AFTER:** New card added to Session 2 (before Exercise 2.1):
```
Title: Aspirational Websites
Description: Submit 3-5 websites that nail the feeling Stronghold wants.

Fields:
- Website URL 1 * + Why text area (required)
- Website URL 2 * + Why text area (required)  
- Website URL 3 * + Why text area (required)
- Website URL 4 (optional) + Why text area
- Website URL 5 (optional) + Why text area
```

---

## Change 2: Exercise 2.1 Image Sort - Made "Why" Fields Optional

**CSV Request:**
> "Users need to enter the first 4 URLs. Right now its not required"

**BEFORE:**
```html
<textarea id="s2_1_why1" name="s2_1_why1" required></textarea>
<textarea id="s2_1_why2" name="s2_1_why2" required></textarea>
<textarea id="s2_1_why3" name="s2_1_why3" required></textarea>
<textarea id="s2_1_why4" name="s2_1_why4" required></textarea>
```
User could NOT proceed without filling "Why" explanations.

**AFTER:**
```html
<textarea id="s2_1_why1" name="s2_1_why1"></textarea>
<textarea id="s2_1_why2" name="s2_1_why2"></textarea>
<textarea id="s2_1_why3" name="s2_1_why3"></textarea>
<textarea id="s2_1_why4" name="s2_1_why4"></textarea>
```
User CAN proceed with just URLs 1-4 (no "Why" required).

---

## Change 3: Exercise 2.1 Image URLs 5-7 Already Optional

**CSV Request:**
> "Image URL and the text field for 5, 6 and 7 are not required fields. They are optional."

**STATUS:** Already correct, no change needed.
- URLs 5-7 were already marked `(optional)`
- Text fields 5-7 had no `required` attribute

---

## Change 4: Exercise 2.4 Checkbox Validation

**CSV Request:**
> "Validation fails, you can click thru without selecting any"

**BEFORE:**
```html
<input type="checkbox" name="s2_4_types" value="field_photo" required>
```
HTML5 checkbox validation doesn't work for groups. User could click through.

**AFTER:**
```javascript
// Added to validateCurrentStep() function:
if (cur === 2) {
  const checkboxes = currentStepEl.querySelectorAll('input[name="s2_4_types"]');
  const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
  if (!anyChecked) {
    alert('⚠️ Exercise 2.4: Visual Content Standards\n\n' +
          'You must select at least one content type.\n\n' +
          'Please check at least one option in "Which content types are approved..."');
    checkboxes[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
}
```
Now blocks if NO checkboxes selected.

---

## Change 5: Placeholder Text Updates (Exercise 2.2 & 2.3)

**CSV Request:**
> "The text box says if confirmed leave blank.. But if you leave it blank, it throws a validation error. Change placeholder/tip copy to... If confirmed selected type N/A"

**BEFORE:**
```
placeholder="What should change and why? (leave blank if confirmed)"
```

**AFTER:**
```
placeholder="What should change and why? (If confirmed selected type N/A)"
```

**Files affected:**
- Exercise 2.2: `s2_2_navy_notes`, `s2_2_gold_notes`, `s2_2_steel_notes`
- Exercise 2.3: `s2_3_headline_notes`, `s2_3_body_notes`, `s2_3_quote_notes`

**Why:** Fields are marked `required`, so "leave blank" was misleading. Users must type "N/A" to pass validation.

---

## Change 6: Exercise 4.3 Story Bank - Removed Team Member

**CSV Request:**
> "Remove Assign team member"

**BEFORE:**
```
Card description: "...Assign a team member and agree on where stories are stored..."

Labels:
- "Story category 1: name + minimum viable capture method + who's responsible:"
- "Story category 2: name + capture method + who's responsible:"
- "Story category 3: name + capture method + who's responsible:"
```

**AFTER:**
```
Card description: "...Agree on where stories are stored..."

Labels:
- "Story category 1: name + minimum viable capture method:"
- "Story category 2: name + capture method:"
- "Story category 3: name + capture method:"
```

**Why:** Team assignment removed from scope of this exercise.

---

## Testing Notes

All changes preserve:
- ✅ Existing form data structure
- ✅ LocalStorage compatibility
- ✅ Google Apps Script submission format
- ✅ Styling and layout
- ✅ Progress tracking

Changes only affect:
- Required/optional field validation
- Placeholder text
- Field labels
- Added 1 new section (Aspirational Websites)

---

## Files Modified
- `index.html` (all changes in one file)

## Backups
- `index.html.backup-4-29` (before changes)
- `index.html.backup-4-24` (previous version)

## Git
```bash
cd ~/Desktop/stronghold-brand-toolkit
git add index.html
git commit -m "Apply 4-28 CSV revisions: 
- Add aspirational websites section (3 required, 2 optional)
- Make image sort 'Why' fields optional (URLs still required)
- Fix Exercise 2.4 checkbox validation (now blocks if none selected)
- Update placeholder text: 'leave blank' → 'type N/A'
- Remove team member assignment from Story Bank"
git push origin main
```
