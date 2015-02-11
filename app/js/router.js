var routes = {
	'/books': function () {
		$('p').html('Books');
		console.log('books');
	},
	'/author': function () {
		$('p').html('Author');
		console.log('author');
	}
}

var router = new Router(routes);
router.init();