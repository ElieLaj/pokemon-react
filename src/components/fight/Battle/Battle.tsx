import React, { useEffect, useState } from 'react';
import './Battle.scss';
import { Pokemon } from '../../../models/pokemon';
import {getColorByType} from '../../../utils/pokemon.utils';
import { fetchRandomPokemon } from '../../../repository/PokemonRepository';
import { calculateDamage } from '../../../utils/pokemon.utils';
interface BattleProps {
    onLoose: () => void;
    playerPokemon?: Pokemon;
}

const Battle = ({playerPokemon, onLoose }: BattleProps) => {
    const [enemy, setEnemy] = useState<Pokemon | null>(null);
    const [enemyLoading, setEnemyLoading] = useState<boolean>(true);

    const [player, setPlayer] = useState<Pokemon | null>(null);
    const [playerLoading, setPlayerLoading] = useState<boolean>(true);

    const [dialogues, setDialogues] = useState<String[]>([]);

    useEffect(() => {
        if (enemy?.currentHP === 0) {
            pushDialogue(`${enemy.name} est KO`);
            fetchEnemy();
        }
    }, [enemy?.currentHP]);


    useEffect(() => {
        fetchEnemy();
    }, []);

    useEffect(() => {
        if (playerPokemon) {
            setPlayer(playerPokemon);
            setPlayerLoading(false);
        }
    }
    , [playerPokemon]);

     const fetchEnemy = async () => {
        const enemy = await fetchRandomPokemon();
        alert('Vous marchez dans les hautes herbes !');
        setTimeout(() => {
            setEnemy({ ...enemy });
            alert('Un ' + enemy.name + ' sauvage apparait !');	
        }, 3000);
        setEnemyLoading(false);
    };

    const pushDialogue = (dialogue: String) => {
        setDialogues((prev) => [...prev, dialogue]);
    }

    const doTurn = () => {
        if (!enemy || !player) return;

        if (enemy.currentHP === 0 || player.currentHP === 0) return;

        if (enemy.stats.speed > player.stats.speed) {
            enemyTurn();
            playerTurn();
        } else {
            playerTurn();
            enemyTurn();
        }
    };

    const playerTurn = () => {
        if (!enemy || !player) return;

        if (enemy.currentHP === 0 || player.currentHP === 0) return;

        

        const {damage, dialogue} = calculateDamage(player, enemy);
        const newEnemyHP = Math.max(enemy.currentHP! - damage, 0);
        setEnemy((prev) => prev ? { ...prev, currentHP: newEnemyHP } : prev);

        pushDialogue(`${player.name} attaque ${enemy.name} et lui inflige ${damage} dégâts. ${dialogue}`);
        if (newEnemyHP === 0) {
            pushDialogue(`${enemy.name} est KO`);
        }
    };

    const enemyTurn = () => {
        if (!enemy || !player) return;

        if (enemy.currentHP === 0 || player.currentHP === 0) return;

        const { damage, dialogue } = calculateDamage(enemy, player);
        const newPlayerHP = Math.max(player.currentHP! - damage, 0);
        setPlayer((prev) => prev ? { ...prev, currentHP: newPlayerHP } : prev);

        pushDialogue(`${enemy.name} attaque ${player.name} et lui inflige ${damage} dégâts. ${dialogue}`);
        
        if (newPlayerHP === 0) {
            pushDialogue(`${player.name} est KO`);
        }
    };

    if (enemyLoading || playerLoading) return <p>Chargement...</p>;

    return (
        <div className='battle'>
            {
               
                    <div className="battle-scene">
                        {enemy && player &&
                            (
                                <div className='battle-scene__enemy'>
                                    <div className='battle-scene__pokemon-infos' style={{background: getColorByType(enemy.apiTypes[0].name)}}>
                                        <div className='battle-scene__pokemon-top'>
                                            <h2>{enemy.name}</h2>
                                            <h2>PV: {enemy.currentHP} / {enemy.stats.HP}</h2>
                                        </div>
                                        <div className='battle-scene__healthbar'>
                                            <div style={{ width: `${(enemy.currentHP! / enemy.stats.HP) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div className='battle-scene__pokemon-display'>
                                        <img src={enemy.image} alt={enemy.name} />
                                    </div>
                                </div>
                            )
                        }
                        {player && (
                            <div className='battle-scene__player'>
                                <div className='battle-scene__pokemon-display'>
                                    <img src={player.image} alt={player.name} />
                                </div>
                                <div className='battle-scene__pokemon-infos' style={{background: getColorByType(player.apiTypes[0].name)}}>
                                    <div className='battle-scene__pokemon-top'>
                                        <h2>{player.name}</h2>
                                        <h2>PV: {player.currentHP} / {player.stats.HP}</h2>
                                    </div>
                                    <div className='battle-scene__healthbar'>
                                        <div style={{ width: `${(player.currentHP! / player.stats.HP) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className='battle-scene__actions'>
                            <button onClick={() => doTurn()}>Attaquer</button>
                        </div>
                        <div className='battle-scene__dialogue'>
                            {dialogues.map((dialogue, index) => (
                                <p key={index}>{dialogue}</p>
                            ))}
                        </div>

                        {player && player.currentHP === 0 && 
                            <div className='battle-scene__actions'>
                                <p>Vous avez perdu</p>
                                <button onClick={() => onLoose()}>Recommencer</button>
                            </div>
                            }
                    </div>
                
            }
        </div>
    );
};

export default Battle;
