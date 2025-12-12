#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 <day_number> [year]"
    echo "Example: $0 3 2025"
    echo "If year is not provided, defaults to current year (2025)"
    exit 1
}

# Check if day number is provided
if [ $# -eq 0 ]; then
    echo "Error: Day number is required"
    usage
fi

# Get day number and validate it's a number
DAY_NUMBER=$1
YEAR=${2:-2025}

# Validate day number is between 1-25
if ! [[ "$DAY_NUMBER" =~ ^[0-9]+$ ]] || [ "$DAY_NUMBER" -lt 1 ] || [ "$DAY_NUMBER" -gt 25 ]; then
    echo "Error: Day number must be between 1 and 25"
    exit 1
fi

# Pad day number with zero if single digit
PADDED_DAY=$(printf "%02d" $DAY_NUMBER)

# Create folder name
FOLDER_NAME="day-${PADDED_DAY}"
FULL_PATH="${YEAR}/${FOLDER_NAME}"

# Check if folder already exists
if [ -d "$FULL_PATH" ]; then
    echo "Error: Folder $FULL_PATH already exists"
    exit 1
fi

# Create the year directory if it doesn't exist
if [ ! -d "$YEAR" ]; then
    echo "Creating year directory: $YEAR"
    mkdir -p "$YEAR"
fi

# Create the day folder
echo "Creating folder: $FULL_PATH"
mkdir -p "$FULL_PATH"

# Create blank input.txt file
echo "Creating input.txt file"
touch "$FULL_PATH/input.txt"

# Copy baseTemplate.js to part-1.js with day number updated
echo "Creating part-1.js from baseTemplate.js"
BASE_TEMPLATE="${YEAR}/baseTemplate.js"
if [ -f "$BASE_TEMPLATE" ]; then
    # Replace day-xx with the actual day folder name and remove the TODO comment
    sed -e "s/day-xx/${FOLDER_NAME}/g" -e "/TODO add day number/d" "$BASE_TEMPLATE" > "$FULL_PATH/part-1.js"
    echo "Successfully created $FULL_PATH/part-1.js with updated day reference and removed TODO comment"
else
    echo "Warning: baseTemplate.js not found in $YEAR folder, creating empty part-1.js"
    touch "$FULL_PATH/part-1.js"
fi

echo "✅ Successfully scaffolded day $DAY_NUMBER for year $YEAR"
echo "📁 Created: $FULL_PATH/"
echo "📄 Files: input.txt, part-1.js"