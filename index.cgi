#!"C:\xampp\perl\bin\perl.exe"

use strict;
use warnings;

use CGI;

# create a CGI object and print the HTTP header
my $q = CGI->new;
print $q->header();


print "<html>";
print "<head>";
print "<title>Sample program</title>";
print "<script type='text/javascript' src='ProblemEditing.js'></script>";
print "<script type='text/javascript' src='jquery.js'></script>";

# Simulating the page loading
print "<script type='text/javascript'>";
	# Simulates when you click "Edit" button
	print "function simulateRestoreState(){window.location = '?author=' + \$('#author').val() + '&hmwkSet=' + \$('#set').val() + '&fileName=' + \$('#prob').val();}";
	# Simulates when you are creating a new problem
	print "function simulateRestoreStateReset(){window.location = window.location.href.split('?')[0];}";
print "</script>";

print "</head>";

if($q->param("author") ne "" && $q->param("hmwkSet") ne "" && $q->param("fileName") ne ""){
	print "<body onload='restoreState()'>";


	print "<form id='form'>";
	print "<div class='question'><h1>What is the best city? </h1><input id='q1city1' class='DuqWorkSave' type='radio' name='q1' value='a'/>a. city1<br/><input id='q1city2' class='DuqWorkSave' type='radio' name='q1' value='b'/>b. city2<br/></div>";
	print "<div class='question'><h1>What is your name? </h1><input id='MyName' class='DuqWorkSave' type='text'/></div>";
	print "<div class='question'><h1>I am a Duquesne alumni</h1>Yes <input id='DuqAlum' class='DuqWorkSave' type='checkbox'/>";
	print "<br/><br/><br/>";
	print "<div class='question'><input type='button' onclick='saveState()' value='Submit'/></div>";
	print "</form>";
	
	print "<hr/>";
	print "<div>Click this if you would like to try saving a new problem: <input type='button' onclick='simulateRestoreStateReset()' value='Reset'/></div>";
}
else{
	# Make the person pick a file to save/restore to/from
	print "<div>Pick your file name: Author: <input id='author' type='text'/>, HomeworkSet: <input id='set' type='text'/>, ProblemName: <input id='prob' type='text'/><input type='button' onclick='simulateRestoreState()' value='Go'/></div>";
}

print "</html>";