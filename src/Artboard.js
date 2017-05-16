class Artboard {
	constructor(data) {
		this.data = data;
	}

	getName() {
		return this.data.name;
	}

	getArtboards() {
        if (!this.artboards) {
            this.artboards = this.data.layers
                .filter((layer) => {
                    return layer._class === 'artboard';
                })
                .map((layer) => {
                    return new Artboard(layer);
                });
        }

        return this.artboards;
    }
}

module.exports = Artboard;