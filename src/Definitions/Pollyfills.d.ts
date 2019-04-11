interface Object
{
    entries(obj: any): [string, any][];
}

interface NodeListOf<TNode extends Node> 
{
    [Symbol.iterator](): IterableIterator<TNode>;
}

interface NamedNodeMap 
{
    [Symbol.iterator](): IterableIterator<Attr>;
}