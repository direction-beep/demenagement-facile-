# Script pour envoyer un article reel au webhook Make.com
# Usage: .\test-webhook-article-reel.ps1 [slug-article]

$MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/2orlnnf5v2xj4jbjik44h5cet211ftj2"
$BLOG_DIR = "blog"
$SITE_URL = "https://voc-call.fr"

# Mots-cles pour exclure les articles candidats/teleoperateurs
$EXCLUDE_KEYWORDS = @(
    'teleconseiller',
    'teleoperateur',
    'téléconseiller',
    'téléopérateur',
    'devenir-teleconseiller',
    'recrutement-teleconseiller',
    'carriere-teleconseiller',
    'candidat',
    'recrutement'
)

function Extract-MetaFromHTML {
    param([string]$htmlPath)
    
    $html = Get-Content $htmlPath -Raw -Encoding UTF8
    
    # Extract title
    $titleMatch = $html -match '<title>(.*?)</title>'
    $title = if ($titleMatch) { 
        ($matches[1] -replace '\s*\|\s*.*$', '').Trim() 
    } else { 
        $null 
    }
    
    # Extract description
    $descMatch = $html -match '<meta\s+name=["'']description["'']\s+content=["'']([^"'']+)["'']'
    $description = if ($descMatch) { $matches[1] } else { $null }
    
    # Extract slug from filename
    $slug = [System.IO.Path]::GetFileNameWithoutExtension($htmlPath)
    
    # Extract category
    $category = "Blog"
    $catMatch = $html -match 'article-category["''][^>]*>([^<]+)<'
    if ($catMatch) {
        $category = $matches[1].Trim()
    }
    
    # Extract read time
    $readTime = "5 min"
    $readTimeMatch = $html -match '(\d+)\s*min\s*(?:de\s*lecture|de lecture)'
    if ($readTimeMatch) {
        $readTime = "$($matches[1]) min"
    }
    
    # Extract date
    $date = (Get-Date -Format "yyyy-MM-dd")
    $dateMatch = $html -match '<meta\s+property=["'']article:published_time["'']\s+content=["'']([^"'']+)["'']'
    if ($dateMatch) {
        $date = ([DateTime]$matches[1]).ToString("yyyy-MM-dd")
    }
    
    # Extract image
    $image = "images/hero/hero-call-center.jpg"
    $imgMatch = $html -match '<img[^>]+src=["'']([^"'']*hero[^"'']*)["'']'
    if ($imgMatch) {
        $image = $matches[1] -replace '^\.\./', ''
    }
    
    # Extract full content (text only)
    $content = ""
    
    # Try to find article content section - use non-greedy match with multiline
    $contentMatch = $html -match '(?s)<article[^>]*class=["''][^"'']*article-content[^"'']*["''](?:[^>]*>)(.*?)</article>'
    if (-not $contentMatch) {
        $contentMatch = $html -match '(?s)<article[^>]*>(.*?)</article>'
    }
    if (-not $contentMatch) {
        $contentMatch = $html -match '(?s)<div[^>]*class=["''][^"'']*article-body[^"'']*["''](?:[^>]*>)(.*?)</div>'
    }
    if (-not $contentMatch) {
        $contentMatch = $html -match '(?s)<div[^>]*class=["''][^"'']*text-content[^"'']*["''](?:[^>]*>)(.*?)</div>'
    }
    
    if ($contentMatch) {
        $rawContent = $matches[1]
        
        # Remove script and style tags (multiline)
        $rawContent = $rawContent -replace '(?s)<script[^>]*>.*?</script>', ''
        $rawContent = $rawContent -replace '(?s)<style[^>]*>.*?</style>', ''
        
        # Remove navigation, footer, header elements
        $rawContent = $rawContent -replace '(?s)<nav[^>]*>.*?</nav>', ''
        $rawContent = $rawContent -replace '(?s)<header[^>]*>.*?</header>', ''
        $rawContent = $rawContent -replace '(?s)<footer[^>]*>.*?</footer>', ''
        
        # Convert common HTML elements to text with line breaks
        $rawContent = $rawContent -replace '(?s)<h[1-6][^>]*>', "`n`n"
        $rawContent = $rawContent -replace '</h[1-6]>', "`n`n"
        $rawContent = $rawContent -replace '(?s)<p[^>]*>', "`n"
        $rawContent = $rawContent -replace '</p>', "`n"
        $rawContent = $rawContent -replace '(?s)<li[^>]*>', "`n- "
        $rawContent = $rawContent -replace '</li>', "`n"
        $rawContent = $rawContent -replace '(?s)<blockquote[^>]*>', "`n> "
        $rawContent = $rawContent -replace '</blockquote>', "`n"
        
        # Remove all remaining HTML tags
        $rawContent = $rawContent -replace '<[^>]+>', ''
        
        # Decode HTML entities (simple replacements)
        $rawContent = $rawContent -replace '&amp;', '&'
        $rawContent = $rawContent -replace '&lt;', '<'
        $rawContent = $rawContent -replace '&gt;', '>'
        $rawContent = $rawContent -replace '&quot;', '"'
        $rawContent = $rawContent -replace '&#39;', "'"
        $rawContent = $rawContent -replace '&nbsp;', ' '
        $rawContent = $rawContent -replace '&eacute;', 'é'
        $rawContent = $rawContent -replace '&egrave;', 'è'
        $rawContent = $rawContent -replace '&ecirc;', 'ê'
        $rawContent = $rawContent -replace '&agrave;', 'à'
        $rawContent = $rawContent -replace '&acirc;', 'â'
        $rawContent = $rawContent -replace '&ocirc;', 'ô'
        $rawContent = $rawContent -replace '&uuml;', 'ü'
        $rawContent = $rawContent -replace '&ouml;', 'ö'
        $rawContent = $rawContent -replace '&ccedil;', 'ç'
        
        # Clean up whitespace - preserve paragraphs but remove excessive whitespace
        $rawContent = $rawContent -replace '\r\n', "`n"
        $rawContent = $rawContent -replace '\r', "`n"
        $rawContent = $rawContent -replace '\n{3,}', "`n`n"
        $rawContent = $rawContent -replace '[ \t]+', ' '
        $rawContent = $rawContent -replace ' \n', "`n"
        $rawContent = $rawContent -replace '\n ', "`n"
        
        # Remove extra newlines and trim
        $content = $rawContent.Trim()
        
        # Remove empty lines at start/end
        $content = $content -replace '^\s*\n+', ''
        $content = $content -replace '\n+\s*$', ''
    }
    
    # If still no content, try a simpler extraction
    if ([string]::IsNullOrWhiteSpace($content)) {
        # Extract all text between body tags (excluding header/footer)
        $bodyMatch = $html -match '(?s)<body[^>]*>(.*?)</body>'
        if ($bodyMatch) {
            $bodyContent = $matches[1]
            
            # Remove scripts and styles
            $bodyContent = $bodyContent -replace '(?s)<script[^>]*>.*?</script>', ''
            $bodyContent = $bodyContent -replace '(?s)<style[^>]*>.*?</style>', ''
            
            # Remove header and footer
            $bodyContent = $bodyContent -replace '(?s)<header[^>]*>.*?</header>', ''
            $bodyContent = $bodyContent -replace '(?s)<footer[^>]*>.*?</footer>', ''
            $bodyContent = $bodyContent -replace '(?s)<nav[^>]*>.*?</nav>', ''
            
            # Remove all HTML tags
            $bodyContent = $bodyContent -replace '<[^>]+>', ' '
            
            # Decode HTML entities (simple replacements)
            $bodyContent = $bodyContent -replace '&amp;', '&'
            $bodyContent = $bodyContent -replace '&lt;', '<'
            $bodyContent = $bodyContent -replace '&gt;', '>'
            $bodyContent = $bodyContent -replace '&quot;', '"'
            $bodyContent = $bodyContent -replace '&#39;', "'"
            $bodyContent = $bodyContent -replace '&nbsp;', ' '
            $bodyContent = $bodyContent -replace '&eacute;', 'é'
            $bodyContent = $bodyContent -replace '&egrave;', 'è'
            $bodyContent = $bodyContent -replace '&ecirc;', 'ê'
            $bodyContent = $bodyContent -replace '&agrave;', 'à'
            $bodyContent = $bodyContent -replace '&acirc;', 'â'
            $bodyContent = $bodyContent -replace '&ocirc;', 'ô'
            
            # Clean up
            $bodyContent = $bodyContent -replace '\s+', ' '
            $content = $bodyContent.Trim()
        }
    }
    
    return @{
        slug = $slug
        title = $title
        excerpt = $description
        category = $category
        readTime = $readTime
        date = $date
        image = $image
        content = $content
    }
}

function Is-ExcludedArticle {
    param($meta)
    
    $text = "$($meta.slug) $($meta.title) $($meta.category) $($meta.excerpt)".ToLower()
    
    foreach ($keyword in $EXCLUDE_KEYWORDS) {
        if ($text -like "*$keyword*") {
            return $true
        }
    }
    
    return $false
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   TEST WEBHOOK AVEC ARTICLE REEL" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Chercher un article reel (non exclu)
$articles = Get-ChildItem -Path $BLOG_DIR -Filter "*.html" | Where-Object { 
    $_.Name -notlike "categorie*" -and $_.Name -ne "blog.html" 
}

$selectedArticle = $null

foreach ($article in $articles) {
    $meta = Extract-MetaFromHTML $article.FullName
    
    if (-not (Is-ExcludedArticle $meta)) {
        $selectedArticle = $meta
        $selectedArticle.url = "$SITE_URL/blog/$($meta.slug).html"
        break
    }
}

if (-not $selectedArticle) {
    Write-Host "Aucun article trouve (non exclu)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Articles exclus:" -ForegroundColor Yellow
    foreach ($article in $articles) {
        $meta = Extract-MetaFromHTML $article.FullName
        if (Is-ExcludedArticle $meta) {
            Write-Host "  - $($meta.slug) ($($meta.title))" -ForegroundColor Gray
        }
    }
    exit 1
}

Write-Host "Article selectionne:" -ForegroundColor Green
Write-Host "  Slug: $($selectedArticle.slug)" -ForegroundColor White
Write-Host "  Titre: $($selectedArticle.title)" -ForegroundColor White
Write-Host "  Categorie: $($selectedArticle.category)" -ForegroundColor White
Write-Host "  Temps de lecture: $($selectedArticle.readTime)" -ForegroundColor White
Write-Host "  URL: $($selectedArticle.url)" -ForegroundColor White
if ($selectedArticle.content) {
    $contentLength = $selectedArticle.content.Length
    Write-Host "  Contenu: $contentLength caracteres" -ForegroundColor White
    Write-Host "  Apercu: $($selectedArticle.content.Substring(0, [Math]::Min(100, $contentLength)))..." -ForegroundColor Gray
}
Write-Host ""

$payload = @{
    title = $selectedArticle.title
    slug = $selectedArticle.slug
    excerpt = $selectedArticle.excerpt
    category = $selectedArticle.category
    readTime = $selectedArticle.readTime
    url = $selectedArticle.url
    date = $selectedArticle.date
    image = $selectedArticle.image
    content = $selectedArticle.content
    publishedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
} | ConvertTo-Json -Depth 10

Write-Host "Envoi au webhook Make.com..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $MAKE_WEBHOOK_URL -Method Post -Body $payload -ContentType "application/json"
    
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "   SUCCES !" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Article envoye au webhook avec succes !" -ForegroundColor Green
    Write-Host ""
    Write-Host "Reponse du webhook:" -ForegroundColor Cyan
    Write-Host ($response | ConvertTo-Json -Depth 5) -ForegroundColor White
    Write-Host ""
    Write-Host "Verifiez dans Make.com que le webhook a ete declenche." -ForegroundColor Yellow
    Write-Host ""
    
} catch {
    Write-Host "================================================" -ForegroundColor Red
    Write-Host "   ERREUR" -ForegroundColor Red
    Write-Host "================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Erreur lors de l'appel au webhook:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Reponse du serveur:" -ForegroundColor Yellow
        Write-Host $responseBody -ForegroundColor White
        Write-Host ""
    }
}

Write-Host "Appuyez sur une touche pour quitter..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

