#!"C:\xampp\perl\bin\perl.exe"

use strict;
use warnings;
use File::Path;

use CGI;
use URI::Escape;

# create a CGI object and print the HTTP header
my $q = CGI->new;
print $q->header();

# Get the query string
my $queryString = $q->query_string;

# Split the query string
my @parts = split(/;/,$queryString);

my $folderNames = uri_unescape((split(/=/,$parts[0]))[1]);

# Make the directory structure for the file
my @folderNamesSplit = split(/\//, $folderNames);
my $folderNamesBuild = ".";
for(my $i = 0; $i < @folderNamesSplit; $i++){
	$folderNamesBuild = $folderNamesBuild."/".$folderNamesSplit[$i];
	print $folderNamesBuild."\n";
	mkdir $folderNamesBuild;
}


my $filename  = uri_unescape((split(/=/,$parts[1]))[1]).".json";

# Build the filepath for the JSON file
my $filePath = "./".$folderNames."/".$filename;
 
#Puts file in folder.
open(OUTFILE, ">", $filePath) or die "can't do this operation";
print OUTFILE "{";
for(my $i = 2; $i < @parts; $i++){
	if($i != 2){
		print OUTFILE ", ";
	}
	print OUTFILE "\"".join("\": \"", split(/\=/, $parts[$i]))."\"";
}
print OUTFILE "}";
close(OUTFILE);
