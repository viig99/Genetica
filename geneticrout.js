var randrout = require('./randchoicerout');
var approut = require('./applicationroutines');

/*
 * Function which returns which individual to select from a population.
 */
function select(popsize, sumfiteness, population)
{
    var partsum = 0;
    var j = 0;
    var rand = randrout.random() * sumfiteness;
    do {
        partsum += population[j].fitness;
        j++;
    }
    while (!((partsum >= rand) || (j == popsize)))
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

/*
 * Get a new generation of population from the older one.
 */
function generation(oldpop, newpop, popsize, sumfiteness, lchrom, ncross, nmutation, jcross, pcross, pmutation)
{
    var j, mate1, mate2;
    j = 0;
    do {
        mate1 = select(popsize, sumfiteness, oldpop);
        mate2 = select(popsize, sumfiteness, oldpop);
        crossover(oldpop[mate1].chrom, oldpop[mate2].chrom, newpop[j].chrom, newpop[j + 1].chrom, lchrom, ncross, nmutation, jcross, pcross, pmutation);
        jChild = newpop[j];
        j1Child = newpop[j + 1];
        jChild.x = approut.decode(jChild.chrom, lchrom);
        j1Child.x = approut.decode(j1Child.chrom, lchrom);
        jChild.fitness = approut.objfunc(jChild.x);
        j1Child.fitness = approut.objfunc(j1Child.x);
        jChild.parent1 = j1Child.parent1 = mate1;
        jChild.parent2 = j1Child.parent2 = mate2;
        jChild.xsite = j1Child.xsite = jcross;
        j += 2;
    } while (j < popsize)
}