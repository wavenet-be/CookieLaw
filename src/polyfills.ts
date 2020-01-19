if (!Object.entries)
{
    Object.entries = function (obj: any)
    {
        let ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
}

if (!Element.prototype.matches) 
{
    let prototype: any = Element.prototype;
    prototype.matches = prototype.msMatchesSelector || prototype.webkitMatchesSelector;
}

if (!Array.prototype.find)
{
    Array.prototype.find = function(this: Array<any>, predicate:(value:any, index: number, obj: any[])=> boolean, thisArg?:any)
    {
        return this.filter(predicate, thisArg)[0];
    };
}