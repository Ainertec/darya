strComputer ="."

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'Darya.exe'")

For Each Processo In colProcesses
	msgbox"Programa já aberto ou em andamento de abertura!",vbInformation,"Darya - Aviso"
	WScript.Quit
Next

Set WshShell = WScript.CreateObject( "WScript.shell" )
WshShell.Run "C:\\darya-x64\\frontend\\Darya.exe",0,0
WScript.Quit