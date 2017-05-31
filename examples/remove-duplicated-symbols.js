module.exports = function (sketch) {
	const uniqueSymbols = new Map();
	const duplicatedSymbols = [];

	sketch.pages.forEach(page => {
		page.getAll('symbolMaster')
			.forEach(master => {
				if (uniqueSymbols.has(master.name)) {
					duplicatedSymbols.push(master);
				} else {
					uniqueSymbols.set(master.name, master);
				}
			});
	});

	sketch.pages.forEach(page => {
		page.getAll('symbolInstance')
			.forEach(instance => {
				const master = uniqueSymbols.get(instance.symbolMaster.name);
				instance.symbolMaster = master;
			});
	});

	duplicatedSymbols.forEach(symbol => symbol.detach());
}
