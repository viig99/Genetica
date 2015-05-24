// TODO: Logic for decoding the input to chromosomes, objective function for knowning its fitness.
var AppRoute = {
    decode: function(chrom, lbits)
    {
        var j, accum, powerof2;
        accum = 0;
        powerof2 = 1;
        for (var j = 0; j < lbits; ++j)
        {
            if (chrom[j])
            {
                accum += powerof2;
            }
            powerof2 *= 2;
        }
        return accum;
    },
    objfunc: function(x)
    {
        var coef = 1073741823;
        var n = 10;
        return Math.pow(x / coef, n);
    }
};

module.exports = AppRoute;