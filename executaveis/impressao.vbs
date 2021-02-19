'--------------------------------------
' Mandando arquivos para impressão
'--------------------------------------
Wscript.sleep 1000
Set objPrinter = CreateObject("WScript.Network")
objPrinter.SetDefaultPrinter "Microsoft Print to PDF"
TargetFolder = "C:\darya-x64\backend\commandCreate\"
Set objShell = CreateObject("Shell.Application")
Set objFolder = objShell.Namespace(TargetFolder)
Set colItems = objFolder.Items
For Each objItem in colItems
objItem.InvokeVerbEx("Print")
Next
Wscript.Sleep 1000
Set oldPrinter = CreateObject("WScript.Network")
oldPrinter.SetDefaultPrinter "Microsoft Print to PDF"
'--------------------------------------
' apagando arquivo após 1 segundo
'--------------------------------------
Wscript.sleep 1000
set ApagaArquivo=CreateObject("Scripting.FileSystemObject")
set folder = ApagaArquivo.getFolder("C:\darya-x64\backend\commandCreate\")
for each file in folder.files
file.delete
next