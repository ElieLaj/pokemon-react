export class PokemonType {
    id: number;
    name: string;
    image: string;
    englishName: string;

    constructor(id: number, name: string, image: string, englishName: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.englishName = englishName;
    }
}