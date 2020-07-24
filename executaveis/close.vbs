strComputer ="."
On Error Resume Next

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'node.exe'")

set colProcesses1=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'mongod.exe'")

For Each Processo In colProcesses
	Processo.Terminate()
Next

For Each Processo1 In colProcesses1
	Processo1.Terminate()
Next

On Error GoTo 0
WScript.Quit