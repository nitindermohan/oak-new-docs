#!/bin/bash

remove_svg_blocks() {
    local file="$1"
    
    if [ -z "$file" ]; then
        echo "Usage: remove_svg_blocks <file>"
        return 1
    fi

    if [ ! -f "$file" ]; then
        echo "Error: File '$file' not found"
        return 1
    fi

    local temp_file=$(mktemp)

    sed -e '/<rect fill/,/<\/g>/{
        /<rect fill/!{/<\/g>/!d}
        /<rect fill/d
        /<\/g>/d
    }' "$file" > "$temp_file"

    mv "$temp_file" "$file"
}

#find . -type f -name "*.html" | while read -r file; do
find docs/build/html/ -type f -name "*.html" | while read -r file; do
    echo "Processing: $file"
    remove_svg_blocks "$file"
done
