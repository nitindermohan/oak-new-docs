#!/bin/bash

remove_unwanted_tags() {
    local file="$1"
    
    if [ -z "$file" ]; then
        echo "Usage: remove_unwanted_tags <file>"
        return 1
    fi

    if [ ! -f "$file" ]; then
        echo "Error: File '$file' not found"
        return 1
    fi

    local temp_file=$(mktemp)

    # Remove SVG blocks
    sed -e '/<rect fill/,/<\/g>/{
        /<rect fill/!{/<\/g>/!d}
        /<rect fill/d
        /<\/g>/d
    }' "$file" > "$temp_file"

    # Remove style tags and their content
    sed -i -e '/<style>/,/<\/style>/d' "$temp_file"

    mv "$temp_file" "$file"
}

find docs/build/html/ -type f -name "*.html" | while read -r file; do
    echo "Processing: $file"
    remove_unwanted_tags "$file"
done
