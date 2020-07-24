Set WshShell = WScript.CreateObject( "WScript.shell" )
WshShell.Run "C:\\data\\bin\\mongod.exe",0,0
WScript.Quit