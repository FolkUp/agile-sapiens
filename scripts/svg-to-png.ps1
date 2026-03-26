# Convert SVG to PNG for OG image
# Optimal social media dimensions: 1200x630

Add-Type -AssemblyName System.Drawing

# Paths
$svgPath = "C:\Transit\agile-sapiens\static\assets\og-image-default.svg"
$pngPath = "C:\Transit\agile-sapiens\static\assets\og-image-default.png"

# Create bitmap with optimal social media dimensions
$width = 1200
$height = 630
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Set high quality rendering
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Fill background with white
$graphics.Clear([System.Drawing.Color]::White)

# Create blue brush for the hexagon (FolkUp primary color #2563eb)
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(37, 99, 235))

# Draw a centered hexagon
$centerX = $width / 2
$centerY = $height / 2
$radius = 120

# Create hexagon points
$hexPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$points = @()

for ($i = 0; $i -lt 6; $i++) {
    $angle = $i * [Math]::PI / 3
    $x = $centerX + $radius * [Math]::Cos($angle)
    $y = $centerY + $radius * [Math]::Sin($angle)
    $points += New-Object System.Drawing.PointF($x, $y)
}

$hexPath.AddPolygon($points)
$graphics.FillPath($blueBrush, $hexPath)

# Add inner hexagon detail (from original SVG design)
$innerRadius = $radius * 0.7
$innerPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$innerPoints = @()

for ($i = 0; $i -lt 6; $i++) {
    $angle = $i * [Math]::PI / 3
    $x = $centerX + $innerRadius * [Math]::Cos($angle)
    $y = $centerY + $innerRadius * [Math]::Sin($angle)
    $innerPoints += New-Object System.Drawing.PointF($x, $y)
}

$innerPath.AddPolygon($innerPoints)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$graphics.FillPath($whiteBrush, $innerPath)

# Add title text
$font = New-Object System.Drawing.Font("Segoe UI", 48, [System.Drawing.FontStyle]::Bold)
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(37, 99, 235))
$titleText = "AGILE SAPIENS"
$textSize = $graphics.MeasureString($titleText, $font)
$textX = ($width - $textSize.Width) / 2
$textY = $centerY + $radius + 40

$graphics.DrawString($titleText, $font, $textBrush, $textX, $textY)

# Save PNG
$bitmap.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$graphics.Dispose()
$bitmap.Dispose()
$blueBrush.Dispose()
$whiteBrush.Dispose()
$textBrush.Dispose()
$hexPath.Dispose()
$innerPath.Dispose()
$font.Dispose()

Write-Host "OG image generated successfully: $pngPath"
Write-Host "Dimensions: ${width}x${height} (optimized for social media)"