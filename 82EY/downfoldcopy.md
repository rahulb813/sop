## CMD
```
$downloadPath = "$env:USERPROFILE\Downloads"
$fsw = New-Object IO.FileSystemWatcher $downloadPath
$fsw.EnableRaisingEvents = $true
Register-ObjectEvent $fsw Created -Action {
    Start-Sleep -Seconds 1
    Set-Clipboard -Path $Event.SourceEventArgs.FullPath
}

```

## PowerShell

```
Add-Type -AssemblyName System.Windows.Forms

# Open folder picker dialog
$folderDialog = New-Object System.Windows.Forms.FolderBrowserDialog
$folderDialog.Description = "Select a folder to delete .json files from"
$dialogResult = $folderDialog.ShowDialog()

if ($dialogResult -ne 'OK') {
    Write-Host "No folder selected. Exiting." -ForegroundColor Yellow
    exit
}

$targetFolder = $folderDialog.SelectedPath
$jsonFiles = Get-ChildItem -Path $targetFolder -Recurse -Filter *.json -File

if ($jsonFiles.Count -eq 0) {
    Write-Host "No .json files found in '$targetFolder'" -ForegroundColor Yellow
    exit
}

Write-Host "`nFound $($jsonFiles.Count) .json files in:`n$targetFolder`n" -ForegroundColor Cyan
$jsonFiles | ForEach-Object { Write-Host $_.FullName }

# Ask for confirmation
$confirm = Read-Host "`nDo you want to delete these files? (Y/N)"
if ($confirm -ne 'Y' -and $confirm -ne 'y') {
    Write-Host "Aborted." -ForegroundColor Yellow
    exit
}

# 🔥 DELETE or ♻️ MOVE TO RECYCLE BIN?
# === OPTION 1: PERMANENT DELETE ===
# $jsonFiles | Remove-Item -Force

# === OPTION 2: MOVE TO RECYCLE BIN ===
Add-Type -AssemblyName Microsoft.VisualBasic
$jsonFiles | ForEach-Object {
    [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($_.FullName, 'OnlyErrorDialogs', 'SendToRecycleBin')
}

Write-Host "`nDone." -ForegroundColor Green

```