import chalk from 'chalk';

const getPokemon = async (name) => {
    try {
        const response = await fetch(
            'https://pokeapi.co/api/v2/pokemon/' + name
        );
        const pokemon = await response.json();

        displayPokemonInfo(pokemon);
    } catch (err) {
        throw new Error(`${name} not found, Try again. `);
    }
};

const displayPokemonInfo = (pokemon) => {
    const types = getPokemonTypes(pokemon);
    const moves = getPokemonMoves(pokemon);
    const stats = getPokemonStats(pokemon);
    const abilities = getPokemonAbilities(pokemon);

    console.log(`
    ${chalk.bgBlack(pokemon.name.toUpperCase())} (${types})
    ${chalk.bgGreen('Moves')}: ${moves.join(' | ')} 
    ${chalk.bgYellow('Base Stats')}: ${stats.join(' | ')}
    ${chalk.bgRed('Abilities')}: ${abilities
        .map((ability) => (!ability.is_hidden ? ability.name : ''))
        .join(', ')}(hidden: ${
        abilities.find((ability) => ability.is_hidden).name
    })
    \n`);
};

const getPokemonTypes = (pokemon) => {
    let types;

    if (pokemon.types.length !== 1) {
        types = `${pokemon.types[0].type.name} | ${pokemon.types[1].type.name}`;
    } else {
        types = pokemon.types[0].type.name;
    }

    return types;
};

const getPokemonMoves = (pokemon, limit = 4) => {
    const moves = [];

    for (let i = 0; i < limit; i++) {
        moves.push(pokemon.moves[i].move.name);
    }

    return moves;
};

const getPokemonStats = (pokemon) => {
    const stats = [];

    pokemon.stats.forEach((stat) => {
        const newStat = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;

        stats.push(newStat);
    });

    return stats;
};

const getPokemonAbilities = (pokemon) => {
    const abilities = [];

    if (pokemon.abilities.length > 1) {
        pokemon.abilities.forEach((currPoke) => {
            abilities.push({
                name: currPoke.ability.name,
                is_hidden: currPoke.is_hidden,
            });
        });
    }

    return abilities;
};

export default getPokemon;
