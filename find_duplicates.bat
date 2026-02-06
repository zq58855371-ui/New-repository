@echo off
setlocal enabledelayedexpansion

echo 正在扫描G盘重复文件，请稍候...
echo 扫描结果将保存到 G:\duplicate_report.txt

REM 使用PowerShell查找重复文件并输出到报告
powershell -Command "
$files = Get-ChildItem -Path 'G:\' -File -Recurse | Group-Object Length | Where-Object {$_.Count -gt 1} | Select-Object -ExpandProperty Group
$duplicates = @()
foreach ($group in (Get-ChildItem -Path 'G:\' -File -Recurse | Group-Object Length | Where-Object {$_.Count -gt 1})) {
    $group.Group | Select-Object FullName, Length | Out-String
    foreach ($item in $group.Group) {
        $duplicates += $item.FullName
    }
}
$duplicates | Out-File -FilePath 'G:\duplicate_report.txt'
"

echo 扫描完成。结果已保存至 G:\duplicate_report.txt
pause