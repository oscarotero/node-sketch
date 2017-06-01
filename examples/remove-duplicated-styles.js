module.exports = function (sketch) {
	const uniqueSharedStyles = new Map();
	const uniqueTextStyles = new Map();
	const duplicatedStyles = [];

	sketch.sharedStyles.forEach(style => {
		if (uniqueSharedStyles.has(style.name)) {
			duplicatedStyles.push(style);
		} else {
			uniqueSharedStyles.set(style.name, style);
		}
	});

	sketch.textStyles.forEach(style => {
		if (uniqueTextStyles.has(style.name)) {
			duplicatedStyles.push(style);
		} else {
			uniqueTextStyles.set(style.name, style);
		}
	});

	sketch.pages.forEach(page => {
		page.getAll('style', style => style.sharedStyle)
			.forEach(style => {
				if (style.parent._class === 'text') {
					style.sharedStyle = uniqueTextStyles.get(style.sharedStyle.name);
				} else {
					style.sharedStyle = uniqueSharedStyles.get(style.sharedStyle.name);
				}
			});
	});

	duplicatedStyles.forEach(style => style.detach());

	console.log(`Removed ${duplicatedStyles.length} duplicated styles`);
}
