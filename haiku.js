var fs = require('fs');

var dictionaryFile = fs.readFileSync("cmudict.txt", "utf8");

var wordArray = parseDict(dictionaryFile);

var wordsBySyllableCount = groupWordsBySyllableCount(wordArray);

var haikuStructure = [[2, 1, 2], [1, 2, 1, 1, 3], [3, 2]];

console.log(generateHaiku(haikuStructure, wordsBySyllableCount));

function generateHaiku(haikuStructure, wordsBySyllableCount)
{
	var lines = haikuStructure.map(function(lineStructure)
	{
		return generateLine(lineStructure, wordsBySyllableCount);
	});

	var finalHaiku = lines.join("\n");

	return finalHaiku;
}

function generateLine(lineStructure, wordsBySyllableCount)
{
	var words = lineStructure.map(function(syllables)
	{
		var word = generateWord(syllables, wordsBySyllableCount);
		return word;
	});

	var finalLine = words.join(" ");

	return finalLine;
}

function generateWord(numSyllables, wordsBySyllableCount)
{
	try
	{
		var numPossibleWords = wordsBySyllableCount[numSyllables].length;
		var possibleWords = wordsBySyllableCount[numSyllables];
		var wordIndex = Math.floor(Math.random()*numPossibleWords);
		return possibleWords[wordIndex].word;
	}
	catch(error)
	{
		console.log("Error: No words found with "+numSyllables+" syllables.");
	}
}

//console.log(wordArray.slice(10,20));

function groupWordsBySyllableCount(wordArray)
{
	var wordsBySyllableCount = [];
	wordArray.forEach(function(wordListing)
	{
		var syllables = countSyllables(wordListing);
		if(wordsBySyllableCount[syllables]===undefined)
		{
			wordsBySyllableCount[syllables]=[];
		}
		wordsBySyllableCount[syllables].push(wordListing);
	});

	return wordsBySyllableCount;
}

function parseDict(dictFile)
{
	var wordArray = dictFile.split("\n");
	wordArray = wordArray.map(function(listing)
	{
		var listingPieces = listing.split(" ");
		var wordObj = 
		{
			word: listingPieces[0],
			pronunciation: listingPieces.slice(2),
		}
		//wordObj.syllables = countSyllables(wordObj);
		return wordObj;
	});
	return wordArray;
}

function countSyllables(wordListing)
{	
 	var pronunciation = wordListing.pronunciation;
 	var syllables = 0;

 	pronunciation.forEach(function(element)
 	{
 		if(element.match(/^(\D*\d)$/))
 		{
 			syllables++;
 		}
 	});

 	return syllables;
}