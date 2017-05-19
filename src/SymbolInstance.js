const Layer = require('./Layer');

class SymbolInstance extends Layer {
	get master()
	{
		return this.data.symbolID;
	}
}

SymbolInstance.type = 'symbolInstance';

module.exports = SymbolInstance;