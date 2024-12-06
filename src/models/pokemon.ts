import { ApiType } from "./apiType";

export interface PokemonDTO {
    id: number;
    name: string;
    image: string;
    sprite: string;
    type: string[];
    slug: string;
    stats: {
        HP: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    };
    apiGeneration: number;
    apiTypes: ApiType[];
    apiResistances: [{
        name: string;
        damage_multiplier: number;
        damage_relation: string;
    }]
}

export class Pokemon implements PokemonDTO {
    id: number;
    name: string;
    image: string;
    sprite: string;
    type: string[];
    stats: {
        HP: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    };
    baseStats: {
        HP: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    };
    slug: string;
    apiGeneration: number;
    apiTypes: ApiType[];
    apiResistances: [{
        name: string;
        damage_multiplier: number;
        damage_relation: string;
    }]
    currentHP: number;
    level: number = 50;

    constructor(data: PokemonDTO) {
        this.id = data.id;
        this.name = data.name;
        this.image = data.image;
        this.sprite = data.sprite;
        this.type = data.type;
        this.baseStats = data.stats;
        this.stats = {
            HP: Math.floor(((2 * data.stats.HP + 31) * this.level) / 100 + this.level + 10),
            attack: Math.floor(((2 * data.stats.attack + 31) * this.level) / 100 + 5),
            defense: Math.floor(((2 * data.stats.defense + 31) * this.level) / 100 + 5),
            special_attack: Math.floor(((2 * data.stats.special_attack + 31) * this.level) / 100 + 5),
            special_defense: Math.floor(((2 * data.stats.special_defense + 31) * this.level) / 100 + 5),
            speed: Math.floor(((2 * data.stats.speed + 31) * this.level) / 100 + 5),
        }
        this.slug = data.slug;
        this.apiGeneration = data.apiGeneration;
        this.apiTypes = data.apiTypes;
        this.apiResistances = data.apiResistances;
        this.currentHP = this.stats.HP;
    }
}