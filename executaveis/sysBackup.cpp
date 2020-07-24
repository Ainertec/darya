#include<stdio.h>
#include<stdlib.h>

int main(){
	
	//faz backup a pasta indicada
	system("cd C:\\data\\bin\\ && mongodump --out=/data/backup");
	
	return 0;
}
