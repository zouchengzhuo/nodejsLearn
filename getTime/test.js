var t1 = new Date().getTime();
var t2 = t1;
var i = 0, count = 10000000, interval = 0;

for(i = 0; i < count; i++)
{
    t2 = new Date().getTime();
    interval = (t2 - t1);
}
interval = (t2 - t1);
console.log('【new Date().getTime()】interval: ', interval);

t1 = new Date().getTime();
for(i = 0; i < count; i++)
{
    t2 = +new Date;
    interval = (t2 - t1);
}
interval = (t2 - t1);
console.log('【+new Date】interval: ', interval);

t1 = new Date().getTime();
for(i = 0; i < count; i++)
{
    t2 = Date.now();
    interval = (t2 - t1);
}
interval = (t2 - t1);
console.log('【Date.now()】interval: ', interval);

var hrTime1 = process.hrtime();
var hrTime2 = hrTime1;

t1 = new Date().getTime();
for(i = 0; i < count; i++)
{
    hrTime2 = process.hrtime(hrTime1);
}
t2 = new Date().getTime();
interval = parseInt(hrTime2[0] * 1e3 + hrTime2[1] * 1e-6);
console.log('【hrTime】interval: ', interval, t2 - t1);

t1 = process.uptime()*1000;
for(i = 0; i < count; i++)
{
    t2 = process.uptime()*1000;
    //interval = (t2 - t1);
}
interval = (t2 - t1);
console.log('【process.uptime()】interval: ', interval);










