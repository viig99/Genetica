var Rand = {
    random: function()
    {
        return Math.random();
    },
    flip: function(prob)
    {
        return Math.random() <= prob;
    },
    rnd: function(a, b)
    {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
};

module.exports = Rand;