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
    while (partsum < rand && j != popsize)
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
        jcross = randrout.rnd(1, lchrom - 2);
        ncross++;
    }
    else
    {
        jcross = lchrom - 1;
    }

    for (var i = 1; i < jcross; i++)
    {
        p1 = mutation(parent1[j], pmutation, nmutation);
        nmutation = p1.n;
        p2 = mutation(parent2[j], pmutation, nmutation);
        nmutation = p2.n;
        child1[j] = p1.m;
        child2[j] = p2.m;

    }

    if (jcross != lchrom)
    {
        for (var j = jcross + 1; j < lchrom; j++)
        {
            child1[j] = mutation(parent2[j], pmutation, nmutation);
            child2[j] = mutation(parent1[j], pmutation, nmutation);
        }
    }

    return {
        j: jcross,
        n: ncross,
        nm: nmutation
    };
}

/*
 * Build the mutation function.
 */
function mutation(alleleval, pmutation, nmutation)
{
    var mutatedbit = alleleval;
    var mutate = randrout.flip(pmutation);
    if (mutate)
    {
        nmutation++;
        mutatedbit = alleleval == 1 ? 0 : 1;
    }
    return {
        m: mutatedbit,
        n: nmutation
    };
}

/*
 * Get a new generation of population from the older one.
 */
function generation(oldpop, newpop, popsize, lchrom, ncross, nmutation, pcross, pmutation, sumfiteness)
{
    var j, mate1, mate2, jcross;
    j = 0;
    do {
        mate1 = select(popsize, sumfiteness, oldpop);
        mate2 = select(popsize, sumfiteness, oldpop);
        c = crossover(oldpop[mate1].chrom, oldpop[mate2].chrom, newpop[j].chrom, newpop[j + 1].chrom, lchrom, ncross, nmutation, jcross, pcross, pmutation);
        nmutation = c.nm;
        jcross = c.j;
        ncross = c.n;
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

function evolution()
{
    var gen = 0,
        stats;
    var nmutation = 0,
        ncross = 0,
        lchrom = 30,
        pmutation = 0.0333,
        pcross = 0.6,
        popsize = 30,
        MAX_GENERATION = 20;

    var oldpop = init_population(popsize, lchrom);
    var newpop = oldpop.slice();
    var sumfiteness = statistics(popsize, oldpop).sumfiteness;
    do {
        gen++;
        generation(oldpop, newpop, popsize, lchrom, ncross, nmutation, pcross, pmutation, sumfiteness);
        stats = statistics(popsize, newpop);
        sumfiteness = stats.sumfiteness;
        report(gen, stats);
        oldpop = newpop;
    } while (gen < MAX_GENERATION)
}

function init_population(popsize, lchrom)
{
    var pop = [];

    for (var j = 0; j < popsize; j++)
    {
        var chrom = [];
        for (var j1 = 0; j1 < lchrom; j1++)
        {
            chrom.push(randrout.flip(0.5) ? 1 : 0);
        }
        var x = approut.decode(chrom, lchrom);
        pop.push(
        {
            chrom: chrom,
            x: x,
            fitness: approut.objfunc(x),
            parent1: 0,
            parent2: 0,
            xsite: 0
        })
    }

    return pop;
}

function statistics(popsize, pop)
{
    var sumfiteness = pop[0].fitness;
    var min = pop[0].fitness;
    var max = pop[0].fitness;

    for (var j = 1; j < pop.length; ++j)
    {
        var fit = pop[j].fitness;
        sumfiteness += fit;
        if (fit > max)
        {
            max = fit;
        }

        if (min < fit)
        {
            min = fit;
        }
    }

    var avg = sumfiteness / popsize;

    return {
        min: min,
        max: max,
        avg: avg,
        sum: sumfiteness
    }
}

function report(generation, stats)
{
    console.log('#######################################');
    console.log('Statistics for Generation ' + generation);
    console.log('min: ' + stats.min + ', max: ' + stats.max + ', avg: ' + stats.avg + ', sumfiteness: ' + stats.sum);
    console.log('########################################');
}

evolution();