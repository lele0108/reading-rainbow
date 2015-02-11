/**
 *	Determine file type of an ebook and convert to EPub format
*/
function convertToEPub() {}

/**
 *	Convert PDF file into EPub ebook file format
*/
function convertPDF() {}

/**
 *	Convert Mobi file into EPub ebook file format
*/
function convertMobi() {}

/**
 *	Convert any file format into another format
*/
function convert(inputFormat, inputFile, outputFormat, outputFile) {
	var request = require('request');
	var fs = require('fs');
	var options = {
		'apikey': '8eswGxfnuPuysM4YGx9zIofLxywOZaG6bsl1WARlPGSVMSkGc2gKGPz_ZgG0sUspFppzyZO2uiLHClEqO7zYQg',
		'input': 'upload',
		'inputformat': inputFormat,
    'outputformat': outputFormat,
		'download': 'inline'
	};
	var convertOperation = function (options, inputFile, outputFile, callback) {
		var apiRequest = request.post({
			url: 'https://api.cloudconvert.com/convert',
			followAllRedirects: true,
			qs: options
		})
		.on('error', function (err) {
			callback(err);
		})
		.on('response', function (res) {
			// If response is json
			if (res.headers['content-type'].indexOf("application/json") === 0) {
				var str = '';
				res.on('data', function(chunk) {
					str += chunk;
				});
				res.on('end', function() {
					var result = JSON.parse(str);
					if (res.statusCode == 200) callback(null, result);
					else callback(new Error(result.error ? result.error : result.message));
				});
			// If response is file
			} else {
				this.pipe(fs.createWriteStream(outputFile));
				this.on("end", function() {
					callback();
				});
			}
		});
		if (inputFile) apiRequest.form().append("file", fs.createReadStream(inputFile));
	};
	convertOperation(options, inputFile, outputFile, function(err, result) {
		if (err)
			return console.error(err);
		if (result) console.log('Success: ', result);
		else console.log('Success');
	});
}

/**
 *	Parse ebook EPub file and render contents
*/
function readEBook() {}

/**
 *	Test method to determine functionality of conversion method
*/
function testConversion() {
	convert('pdf', 'sample.pdf', 'epub', 'sample.epub');
}