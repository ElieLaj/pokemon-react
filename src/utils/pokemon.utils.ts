import { Pokemon } from "../models/pokemon";

export const PokemonTypes = Object.freeze({
    NORMAL: 'Normal',
    FEU: 'Feu',
    EAU: 'Eau',
    PLANTE: 'Plante',
    ÉLECTRIQUE: 'Électrique',
    GLACE: 'Glace',
    COMBAT: 'Combat',
    POISON: 'Poison',
    SOL: 'Sol',
    VOL: 'Vol',
    PSY: 'Psy',
    INSECTE: 'Insecte',
    ROCHE: 'Roche',
    SPECTRE: 'Spectre',
    DRAGON: 'Dragon',
    TÉNÈBRES: 'Ténèbres',
    ACIER: 'Acier',
    FÉE: 'Fée'
});

export const getColorByType = (type) => {
    const colors = {
        Normal: '#A8A77A',
        Feu: '#EE8130',
        Eau: '#6390F0',
        Plante: '#7AC74C',
        Électrik: '#F7D02C',
        Glace: '#96D9D6',
        Combat: '#C22E28',
        Poison: '#A33EA1',
        Sol: '#E2BF65',
        Vol: '#A98FF3',
        Psy: '#F95587',
        Insecte: '#A6B91A',
        Roche: '#B6A136',
        Spectre: '#735797',
        Dragon: '#6F35FC',
        Ténèbres: '#705746',
        Acier: '#B7B7CE',
        Fée: '#D685AD'
    };
    return colors[type] || '#000000';
};


export const calculateDamage = (origin: Pokemon, target: Pokemon) => {
    
    let originStat = 0;
    let targetStat = 0;

    if(origin.stats.attack > origin.stats.special_attack) {
        originStat = origin.stats.attack
        targetStat = target.stats.defense
    }
    else {
        originStat = origin.stats.special_attack
        targetStat = target.stats.special_defense
    }

    let modifier = 1;
    target.apiResistances.forEach((targetRes) => {
        origin.apiTypes.forEach(originType => {
            modifier = modifier * (targetRes.name === originType.name ? targetRes.damage_multiplier : 1);
        });
    })

    const baseDamage = (((((origin.level * 0.4 + 2) * originStat * origin.level) / targetStat) / 50) + 2)
    const damage = Math.max(Math.floor(baseDamage * modifier * (Math.random() * 0.15 + 0.85)), 1);

    let dialogue = ''

    if(modifier >= 2 ){
        dialogue = 'C\'est super efficace !'
    } else if (modifier < 1) {
        dialogue = 'Ce n\'est pas très efficace'
    }

    return { damage, dialogue }
}