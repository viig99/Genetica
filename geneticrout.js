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
        partsum += population[j].fitness;
        j++;
    }
    while (!((partsum >= rand) || (j == population.length)))
    return j;
}

/*
 * Crossover the 2 parents and return the crossed children for the new generation.
 */
function crossover(parent1, parent2, child1, child2, lchrom,
    ncross, nmutation, jcross, pcross, pmutation)
{
    var j = 0;
    if (randrout.flip(pcross))
    {
        jcross = randrout.rnd(1, lchrom - 1);
        ncross++;
    }
    else
    {
        jcross = lchrom;
    }

    for (var i = 1; i < jcross; i++)
    {
        child1[j] = mutation(parent1[j], pmutation, nmutation);
        child2[j] = mutation(parent2[j], pmutation, nmutation);
    }

    if (jcross != lchrom)
    {
        for (var j = jcross + 1; j < lchrom; j++)
        {
            child1[j] = mutation(parent2[j], pmutation, nmutation);
            child2[j] = mutation(parent1[j], pmutation, nmutation);
        }
    }
}

/*
 * Build the mutation function.
 */
function mutation(alleleval, pmutation, nmutation)
{
    var mutatedbit = alleleval;
    var mutate = randchoicerout.flip(pmutation);
    if (mutate)
    {
        nmutation++;
        mutatedbit = alleleval == 1 ? 0 : 1;
    }
    return mutatedbit;
}