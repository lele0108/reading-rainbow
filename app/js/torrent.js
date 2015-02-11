/**
 *	Download a torrent file given a magnet link
*/
function downloadTorrent(magnetLink) {
	var WebTorrent = require('webtorrent');
	var client = new WebTorrent();
	client.download(magnetLink, function (torrent) {
		torrent.files.forEach(function (file) {
			if (file.name.indexOf('epub') >= 0) {
				// var source = file.createReadStream();
				// var destination = $scope.fs.createWriteStream(file.name);
				// source.pipe(destination);
				// return destination;
				// destination.on('close', function() {
				// 	$(".hello").append('<a href="read.html?name=' + file.name + '"><button class="fuckme">Hi</button></a>');
				// 	$( ".fuckme" ).click();
				// });
			}
		});
	});
}

/**
 *	Filter a torrent file by setting a seeder floor of 5
*/
function filterBySeeders(torrent) {
	if (torrent.seed >= 5) return torrent;
}

/**
 *	Select a torrent from a collection by comparing by number of seeders
*/
function compareBySeeders(torrents) {
	var mostSeededTorrent;
	torrents
	.filter(filterBySeeders)
	.forEach(function (torrent) {
		if (mostSeededTorrent === undefined || mostSeededTorrent.seed < torrent.seed)
			mostSeededTorrent = torrent;
	});
	return mostSeededTorrent;
}

/**
 *	Sample array of JSON objects for testing
*/
var testData = [
	{
		name: 'first',
		seed: 6
	},
	{
		name: 'second',
		seed: 15
	},
	{
		name: 'third',
		seed: 73
	}, {
		name: 'fourth',
		seed: 1
	}, {
		name: 'fifth',
		seed: 4
	}
];