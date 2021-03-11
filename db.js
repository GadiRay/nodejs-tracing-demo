const DB = {
	1: 'Rick',
	2: 'Morty',
	3: 'Summer',
	4: 'Beth',
	5: 'Jerry'
};

function getCharacterById(id) {
	return DB[id];
}

module.exports = getCharacterById;