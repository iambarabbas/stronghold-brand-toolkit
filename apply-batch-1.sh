#!/bin/bash

# Batch 1: Global Changes
# Rows 2-5 from CSV

FILE="index.html"

# Change 2: Replace em dashes (—) with appropriate punctuation
sed -i '' 's/ — / - /g' "$FILE"
sed -i '' 's/Package — /Package: /g' "$FILE"
sed -i '' 's/Mission — /Mission: /g' "$FILE"
sed -i '' 's/Session 1 — /Session 1: /g' "$FILE"

# Change 3: Replace emoji 📝 with SVG (prepare CSS first, then replace)
# We'll do this with a more complex replacement

# Change 4: Add rating scale labels - will do with specific line edits

echo "Basic replacements complete. Manual edits needed for Introduction page and complex replacements."
