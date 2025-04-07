## CMD
```
@echo off
setlocal

:: Use PowerShell to open a folder selection dialog
for /f "delims=" %%i in ('powershell -noprofile -command "Add-Type -AssemblyName System.Windows.Forms; $f = New-Object Windows.Forms.FolderBrowserDialog; if($f.ShowDialog() -eq 'OK') {$f.SelectedPath}"') do set "targetFolder=%%i"

:: Set the file extension to delete
set "ext=.json"

:: Confirm selected folder and extension
echo Target folder: %targetFolder%
echo Deleting all "%ext%" files recursively...
pause

:: Delete files with specified extension
for /r "%targetFolder%" %%f in (*%ext%) do (
    echo Deleting: "%%f"
    del /f /q "%%f"
)

echo Done.
pause

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