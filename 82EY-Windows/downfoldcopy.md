```
$downloadPath = "$env:USERPROFILE\Downloads"
$fsw = New-Object IO.FileSystemWatcher $downloadPath
$fsw.EnableRaisingEvents = $true
Register-ObjectEvent $fsw Created -Action {
    Start-Sleep -Seconds 1
    Set-Clipboard -Path $Event.SourceEventArgs.FullPath
}

```