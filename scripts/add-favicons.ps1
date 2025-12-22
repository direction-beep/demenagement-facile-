$snippet = @"
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
"@

$fontAwesomeTag = "<link rel=""stylesheet"" href=""https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"">"

Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $path = $_.FullName
    $content = Get-Content $path -Raw
    $updated = $false

    $cleaned = [regex]::Replace($content, '(?im)^\s*<link[^>]+rel="(?:shortcut\s+icon|icon)"[^>]*>\s*\r?\n?', '')
    if ($cleaned -ne $content) {
        $content = $cleaned
        $updated = $true
    }

    if ($content -notmatch 'href="/images/favicon-32.png"') {
        if ($content -match [regex]::Escape($fontAwesomeTag)) {
            $content = $content -replace [regex]::Escape($fontAwesomeTag), ($fontAwesomeTag + "`r`n" + $snippet)
            $updated = $true
        } elseif ($content -match '</head>') {
            $content = $content -replace '</head>', ($snippet + "`r`n</head>")
            $updated = $true
        }
    }

    if ($updated) {
        Set-Content -Path $path -Value $content -Encoding UTF8
    }
}
