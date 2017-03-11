use strict;
#use warnings;
use File::Path;

my $jsonString = "{\"location\":\"C://Users/Brian/Desktop/\",\"filename\":\"2\",\"type\":\"multi\"}";

my @parts = split(/,/,$jsonString);
my $location = $parts[0];
$location =~ s/{"location"\:\"//g;
print $location;
#my $filename  = (split(/:/,$parts[1]))[1] . ".json";
#splice(@parts, 0,-1);
#splice(@parts, 1,-1);



#my $newJson = join('',@parts);
#$newJson = '{' . $newJson;

#print $newJson . "\n";
#print $filename;

#This code writes file to a folder.
#open(OUTFILE, '>', $location.$filename) or die "Can't open the directory at $location.$filename";
#close(OUTFILE);
