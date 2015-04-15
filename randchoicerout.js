var Rand = function()
{
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
        return Math.floor(Math.round() * (b - a + 1)) + a;
    }
}
exports.module = Rand;