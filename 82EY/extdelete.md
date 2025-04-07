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