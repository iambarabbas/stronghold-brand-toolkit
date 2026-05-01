/**
 * STRONGHOLD BRAND WORKSHOP TOOLKIT
 * Google Apps Script — Sheets Integration
 *
 * ═══════════════════════════════════════════════
 * SETUP INSTRUCTIONS (one-time, ~5 minutes)
 * ═══════════════════════════════════════════════
 *
 * STEP 1 — Create your Google Sheet
 *   - Go to sheets.google.com and create a new blank spreadsheet
 *   - Name it something like "Stronghold Brand Workshop Responses"
 *   - Copy the Sheet ID from the URL:
 *     https://docs.google.com/spreadsheets/d/  [THIS PART]  /edit
 *   - Paste it below as SPREADSHEET_ID
 *
 * STEP 2 — Open Apps Script
 *   - In your Google Sheet, click Extensions → Apps Script
 *   - Delete any existing code in the editor
 *   - Paste this entire file into the editor
 *   - Update SPREADSHEET_ID below with your Sheet ID
 *   - Click Save (Ctrl/Cmd + S)
 *
 * STEP 3 — Deploy as Web App
 *   - Click "Deploy" → "New deployment"
 *   - Click the gear icon → Select type: "Web App"
 *   - Description: "Brand Toolkit Form"
 *   - Execute as: Me
 *   - Who has access: Anyone
 *   - Click "Deploy"
 *   - Click "Authorize access" and follow the prompts
 *   - Copy the Web App URL (looks like: https://script.google.com/macros/s/ABC.../exec)
 *
 * STEP 4 — Connect to the HTML form
 *   - Open brand-toolkit.html
 *   - Find the line: const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 *   - Replace the placeholder with your Web App URL
 *   - Save the file
 *
 * STEP 5 — Deploy to Netlify
 *   - Go to netlify.com and sign in (or create a free account)
 *   - Click "Add new site" → "Deploy manually"
 *   - Drag the brand-toolkit.html file into the upload area
 *   - Netlify gives you a live URL — share this with the client
 *
 * ═══════════════════════════════════════════════
 * IMPORTANT: When you update the script, you must create
 * a NEW deployment (not edit the existing one) to apply changes.
 * ═══════════════════════════════════════════════
 */

// ─── CONFIGURE THIS ───────────────────────────
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
// ──────────────────────────────────────────────

// Field order — determines column order in the spreadsheet
const FIELDS = [
  // Contact info
  'submitted_at', 'org_name', 'contact_name', 'contact_role', 'contact_email', 'submission_date',

  // Session 1 — Brand Foundation
  's1_pre_moment', 's1_pre_explain',
  's1_warmup',
  's1_1_p1', 's1_1_p2', 's1_1_p3', 's1_1_recurring', 's1_1_combined',
  's1_2_n1', 's1_2_n2', 's1_2_n3', 's1_2_n4', 's1_2_n5',
  's1_3_problem', 's1_3_conviction', 's1_3_action', 's1_3_story',
  's1_4_p1', 's1_4_p2', 's1_4_p3', 's1_4_p4',
  's1_5_constant', 's1_5_evolution', 's1_5_3act', 's1_5_podcast',
  's1_6_v1', 's1_6_v2', 's1_6_v3', 's1_6_alts', 's1_6_chosen', 's1_6_why',

  // Session 2 — Visual Identity
  's2_pre_images', 's2_pre_brands', 's2_pre_review',
  's2_1_agree', 's2_1_cat', 's2_1_common', 's2_1_avoid',
  's2_2_navy', 's2_2_gold', 's2_2_steel', 's2_2_add', 's2_2_rules',
  's2_3_headline', 's2_3_body', 's2_3_quote', 's2_3_notes',
  's2_4_add', 's2_4_ops', 's2_4_consent', 's2_4_treatment',

  // Session 3 — Voice & Tone
  's3_pre_pieces', 's3_pre_ratings', 's3_pre_voice',
  's3_1_p1', 's3_1_p2', 's3_1_p3', 's3_1_patterns',
  's3_2_d1', 's3_2_d2', 's3_2_d3', 's3_2_d4', 's3_2_d5', 's3_2_notes',
  's3_3_web_orig', 's3_3_web_new', 's3_3_donation', 's3_3_caption',
  's3_4_approved', 's3_4_neveruse', 's3_4_adjust', 's3_4_terms',
  's3_5_1a', 's3_5_1b', 's3_5_2a', 's3_5_2b', 's3_5_3a', 's3_5_3b',
  's3_5_4a', 's3_5_4b', 's3_5_5a', 's3_5_5b', 's3_5_6a', 's3_5_6b',
  's3_5_7a', 's3_5_7b', 's3_5_8a', 's3_5_8b',

  // Session 4 — Content Strategy
  's4_pre_ig', 's4_pre_q', 's4_pre_stories',
  's4_villain',
  's4_1_mix', 's4_1_gap', 's4_1_easy', 's4_1_hard',
  's4_2_a1', 's4_2_a2', 's4_2_a3', 's4_2_a4',
  's4_3_c1', 's4_3_c2', 's4_3_c3', 's4_3_storage',
  's4_4_ig', 's4_4_email', 's4_4_best', 's4_4_yt',
  's4_5_pp1', 's4_5_pp2', 's4_5_pp3', 's4_5_pitch',
  's4_5_ol1', 's4_5_ol2', 's4_5_ol3'
];

// Human-readable column headers
const HEADERS = {
  'submitted_at': 'Submitted At',
  'org_name': 'Organization',
  'contact_name': 'Name',
  'contact_role': 'Role',
  'contact_email': 'Email',
  'submission_date': 'Date Completed',

  // S1
  's1_pre_moment': 'S1 Pre-Work: Defining Moment',
  's1_pre_explain': 'S1 Pre-Work: Plain Language Explanation',
  's1_warmup': 'S1 Warm-Up: 2 Words',
  's1_1_p1': 'S1.1 Person 1 — One Sentence',
  's1_1_p2': 'S1.1 Person 2 — One Sentence',
  's1_1_p3': 'S1.1 Person 3 — One Sentence',
  's1_1_recurring': 'S1.1 Recurring Phrases',
  's1_1_combined': 'S1.1 Draft Combined Sentence',
  's1_2_n1': 'S1.2 We Are NOT (1)',
  's1_2_n2': 'S1.2 We Are NOT (2)',
  's1_2_n3': 'S1.2 We Are NOT (3)',
  's1_2_n4': 'S1.2 We Are NOT (4)',
  's1_2_n5': 'S1.2 We Are NOT (5)',
  's1_3_problem': 'S1.3 The Problem We Saw',
  's1_3_conviction': 'S1.3 The Conviction We Had',
  's1_3_action': 'S1.3 The First Thing We Did',
  's1_3_story': 'S1.3 Origin Story (3 sentences)',
  's1_4_p1': 'S1.4 Stories of Impact — Vote + Notes',
  's1_4_p2': 'S1.4 Operator Credibility — Vote + Notes',
  's1_4_p3': 'S1.4 Radical Transparency — Vote + Notes',
  's1_4_p4': 'S1.4 Dignity & Empowerment — Vote + Notes',
  's1_5_constant': 'S1.5 The Constant',
  's1_5_evolution': 'S1.5 The Evolution',
  's1_5_3act': 'S1.5 3-Act Statement',
  's1_5_podcast': 'S1.5 30-Second Podcast Version',
  's1_6_v1': 'S1.6 Votes: A Few Good Men',
  's1_6_v2': 'S1.6 Votes: Charity With Dignity',
  's1_6_v3': 'S1.6 Votes: We Run Toward the Fire',
  's1_6_alts': 'S1.6 Alternative Motto Options',
  's1_6_chosen': 'S1.6 Chosen Motto',
  's1_6_why': 'S1.6 Why This Motto',

  // S2
  's2_pre_images': 'S2 Pre-Work: Images Collected',
  's2_pre_brands': 'S2 Pre-Work: Brands You Respect',
  's2_pre_review': 'S2 Pre-Work: Brand OS Review Notes',
  's2_1_agree': 'S2.1 Images With Most Agreement',
  's2_1_cat': 'S2.1 Primary Visual Category',
  's2_1_common': 'S2.1 What Images Have In Common',
  's2_1_avoid': 'S2.1 What We Should NOT Use',
  's2_2_navy': 'S2.2 Midnight Navy Status',
  's2_2_gold': 'S2.2 Operator Gold Status',
  's2_2_steel': 'S2.2 Deep Steel Status',
  's2_2_add': 'S2.2 Colors to Add/Replace',
  's2_2_rules': 'S2.2 Usage Rule Disagreements',
  's2_3_headline': 'S2.3 Headline Font Decision',
  's2_3_body': 'S2.3 Body Font Decision',
  's2_3_quote': 'S2.3 Pull Quote Font Decision',
  's2_3_notes': 'S2.3 Typography Notes',
  's2_4_add': 'S2.4 Photography Rules to Add',
  's2_4_ops': 'S2.4 Operational Constraints',
  's2_4_consent': 'S2.4 Consent & Security',
  's2_4_treatment': 'S2.4 Approved Image Treatment',

  // S3
  's3_pre_pieces': 'S3 Pre-Work: Content Pieces',
  's3_pre_ratings': 'S3 Pre-Work: Ratings',
  's3_pre_voice': 'S3 Pre-Work: Your Voice Paragraph',
  's3_1_p1': 'S3.1 Content Piece 1 — Audit',
  's3_1_p2': 'S3.1 Content Piece 2 — Audit',
  's3_1_p3': 'S3.1 Content Piece 3 — Audit',
  's3_1_patterns': 'S3.1 Common Patterns',
  's3_2_d1': 'S3.2 Dial: Formal/Casual (1–5)',
  's3_2_d2': 'S3.2 Dial: Polished/Raw (1–5)',
  's3_2_d3': 'S3.2 Dial: Corporate/Personal (1–5)',
  's3_2_d4': 'S3.2 Dial: Cautious/Bold (1–5)',
  's3_2_d5': 'S3.2 Dial: Institutional/Insurgent (1–5)',
  's3_2_notes': 'S3.2 Dial Notes',
  's3_3_web_orig': 'S3.3 Website Para — Original',
  's3_3_web_new': 'S3.3 Website Para — Rewrite',
  's3_3_donation': 'S3.3 Donation Ask — Rewrite',
  's3_3_caption': 'S3.3 Instagram Caption — Rewrite',
  's3_4_approved': 'S3.4 Approved Words to Add',
  's3_4_neveruse': 'S3.4 Never-Use Words to Add',
  's3_4_adjust': 'S3.4 Rules to Adjust',
  's3_4_terms': 'S3.4 Stronghold-Specific Terms',
  's3_5_1a': 'S3.5 Pair 1A', 's3_5_1b': 'S3.5 Pair 1B',
  's3_5_2a': 'S3.5 Pair 2A', 's3_5_2b': 'S3.5 Pair 2B',
  's3_5_3a': 'S3.5 Pair 3A', 's3_5_3b': 'S3.5 Pair 3B',
  's3_5_4a': 'S3.5 Pair 4A', 's3_5_4b': 'S3.5 Pair 4B',
  's3_5_5a': 'S3.5 Pair 5A', 's3_5_5b': 'S3.5 Pair 5B',
  's3_5_6a': 'S3.5 Pair 6A', 's3_5_6b': 'S3.5 Pair 6B',
  's3_5_7a': 'S3.5 Pair 7A', 's3_5_7b': 'S3.5 Pair 7B',
  's3_5_8a': 'S3.5 Pair 8A', 's3_5_8b': 'S3.5 Pair 8B',

  // S4
  's4_pre_ig': 'S4 Pre-Work: Instagram Topics',
  's4_pre_q': 'S4 Pre-Work: Supporter Questions',
  's4_pre_stories': 'S4 Pre-Work: Story Types',
  's4_villain': 'S4 Warm-Up: The Villain',
  's4_1_mix': 'S4.1 Content Mix',
  's4_1_gap': 'S4.1 Biggest Gap',
  's4_1_easy': 'S4.1 Easiest to Add',
  's4_1_hard': 'S4.1 Hardest to Produce',
  's4_2_a1': 'S4.2 New Visitors Message',
  's4_2_a2': 'S4.2 Existing Supporters Message',
  's4_2_a3': 'S4.2 Grants/Institutional Message',
  's4_2_a4': 'S4.2 Media/Podcasts Message',
  's4_3_c1': 'S4.3 Story Category 1',
  's4_3_c2': 'S4.3 Story Category 2',
  's4_3_c3': 'S4.3 Story Category 3',
  's4_3_storage': 'S4.3 Storage & Handoff',
  's4_4_ig': 'S4.4 Instagram Cadence',
  's4_4_email': 'S4.4 Email Cadence',
  's4_4_best': 'S4.4 Best Channel',
  's4_4_yt': 'S4.4 YouTube Starting Point',
  's4_5_pp1': 'S4.5 Proof Point 1 + Analogy',
  's4_5_pp2': 'S4.5 Proof Point 2 + Analogy',
  's4_5_pp3': 'S4.5 Proof Point 3 + Analogy',
  's4_5_pitch': 'S4.5 90-Second Podcast Pitch',
  's4_5_ol1': 'S4.5 One-Liner 1',
  's4_5_ol2': 'S4.5 One-Liner 2',
  's4_5_ol3': 'S4.5 One-Liner 3'
};


/**
 * Receives form submissions from the HTML toolkit.
 * Called automatically when the form submits.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheets()[0]; // Use the first sheet

    // Create header row on first submission
    if (sheet.getLastRow() === 0) {
      const headerRow = FIELDS.map(f => HEADERS[f] || f);
      sheet.appendRow(headerRow);

      // Style the header row with Stronghold brand colors
      const headerRange = sheet.getRange(1, 1, 1, headerRow.length);
      headerRange.setBackground('#0B1D2E');
      headerRange.setFontColor('#C4A35A');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(10);
      sheet.setFrozenRows(1);

      // Auto-resize columns (up to first 10 for performance)
      for (let i = 1; i <= Math.min(10, headerRow.length); i++) {
        sheet.setColumnWidth(i, 220);
      }
    }

    // Build the data row in field order
    const row = FIELDS.map(field => data[field] !== undefined ? data[field] : '');
    sheet.appendRow(row);

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Response recorded.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log the error for debugging (visible in Apps Script logs)
    Logger.log('Error in doPost: ' + err.message);

    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * Test function — run this manually from the Apps Script editor
 * to verify your spreadsheet ID is correct before deploying.
 * Click the Run button (▶) with this function selected.
 */
function testConnection() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✓ Connected to spreadsheet: "' + ss.getName() + '"');
    Logger.log('  Sheet: ' + ss.getSheets()[0].getName());
    Logger.log('  URL: ' + ss.getUrl());
  } catch (err) {
    Logger.log('✗ Connection failed: ' + err.message);
    Logger.log('  Make sure SPREADSHEET_ID is correct.');
  }
}
