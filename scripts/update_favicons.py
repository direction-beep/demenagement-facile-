from pathlib import Path

snippet_lines = [
    '    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png">',
    '    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">',
    '    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">',
    '    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">',
]

fontawesome_marker = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'


def should_skip(line: str) -> bool:
    stripped = line.strip()
    return stripped.startswith('<link') and (
        '/images/favicon-' in stripped
        or 'apple-touch-icon' in stripped
        or 'favicon.ico' in stripped
        or 'rel="shortcut icon"' in stripped
    )


for path in Path('.').rglob('*.html'):
    lines = path.read_text(encoding='utf-8').splitlines()
    new_lines = []
    inserted = False
    changed = False

    for line in lines:
        if should_skip(line):
            changed = True
            continue

        if (not inserted) and (fontawesome_marker in line):
            new_lines.append(line)
            new_lines.extend(snippet_lines)
            inserted = True
            changed = True
        else:
            new_lines.append(line)

    if not inserted:
        for index, line in enumerate(new_lines):
            if '</head>' in line:
                new_lines[index:index] = snippet_lines
                inserted = True
                changed = True
                break

    if changed:
        path.write_text('\n'.join(new_lines) + '\n', encoding='utf-8')
