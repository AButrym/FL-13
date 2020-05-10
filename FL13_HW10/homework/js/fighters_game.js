const HUNDRED_PERCENTS = 100;

class Fighter {
    constructor(params) {

        // PRIVATE PROPERTIES:

        const name = params.name;
        const damage = +params.damage;
        const max_hp = +params.hp;
        const strength = +params.strength;
        const agility = +params.agility;

        let cur_hp = max_hp;
        let wins = 0;
        let losses = 0;

        // GETTERS:

        this.getName = () => name;
        this.getDamage = () => damage;
        this.getStrength = () => strength;
        this.getAgility = () => agility;
        this.getHealth = () => cur_hp;

        // FUNCTIONS:

        this.attack = (another_fighter) => {
            const defence = another_fighter.getStrength() + another_fighter.getAgility();
            const chance_to_hit = (HUNDRED_PERCENTS - defence) / HUNDRED_PERCENTS;
            if (Math.random() <= chance_to_hit) {
                another_fighter.dealDamage(damage);
                console.log(`${name} makes ${damage} damage to ${another_fighter.getName()}`);
            } else {
                console.log(`${name} attack missed`);
            }
        }

        this.logCombatHistory = () => `Name: ${name}, Wins: ${wins}, Losses: ${losses}`;

        this.heal = (amount_to_add) => {
            cur_hp = Math.min(max_hp, cur_hp + amount_to_add);
        }

        this.dealDamage = (damage_dealt) => {
            cur_hp = Math.max(0, cur_hp - damage_dealt);
        }

        this.addWin = () => {
            wins++;
        }

        this.addLoss = () => {
            losses++;
        }
    }
}

function battle(fighter1, fighter2) {
    for (let fighter of arguments) {
        if (fighter.getHealth() === 0) {
            console.log(`${fighter.getName()} is dead and can't fight.`);
            return;
        }
    }

    let attacker = fighter1;
    let defender = fighter2;

    while (attacker.getHealth() > 0) {
        attacker.attack(defender);
        [attacker, defender] = [defender, attacker];
    }

    attacker.addLoss();
    defender.addWin();

    console.log(`${defender.getName()} has won!`);
}

/*
// TESTS:
function main() {
    const fighter1 = new Fighter({
        name: 'Maximus',
        damage: 20,
        strength: 20,
        agility: 15,
        hp: 100
    });
    const fighter2 = new Fighter({
        name: 'Commodus',
        damage: 25,
        strength: 25,
        agility: 20,
        hp: 90
    });

    battle(fighter1, fighter2);

    console.log(fighter1.getHealth());
    console.log(fighter2.getHealth());

    battle(fighter1, fighter2);

    const HEAL_DEAD_BY = 50;
    if (fighter1.getHealth() === 0) {
        fighter1.heal(HEAL_DEAD_BY);
    } else if (fighter2.getHealth() === 0) {
        fighter2.heal(HEAL_DEAD_BY);
    }

    console.log(fighter1.getHealth());
    console.log(fighter2.getHealth());

    console.log(fighter1.logCombatHistory());
    console.log(fighter2.logCombatHistory());

    console.log(fighter2.getStrength());
}

main();
*/
