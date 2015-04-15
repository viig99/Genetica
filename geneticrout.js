var randrout = require('./randchoicerout');

/*
 * Function which returns which individual to select from a population.
 */
function select(sumfiteness, population)
{
    var partsum = 0;
    var j = 0;
    var rand = randrout.random() * sumfiteness;
    do {
        partsum = population[j].fitness;
        j++;
    }
    while ((partsum >= rand) || (j == population.length))
    return j;
}