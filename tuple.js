class InvalidTupleArgumentException extends Error {
    constructor(str) {
        super(str);
    }
}

class Tuple {
    #vals;

    constructor(...args) {
        switch(args.length) {
            default:
                this.#vals = [...args];
                break;
            case 1:
                if(Tuple.isArray(args[0])) {
                    this.#vals = [...args[0]];
                } else if(args[0] instanceof Tuple) {
                    this.#vals = args[0].toArray();
                } else {
                    this.#vals = [args[0]];
                }
                break;
            case 2:
                this.#vals = [...args];
                break;
        }
    } 
    // Copied from https://github.com/99TheDark/Arrays
    get(index) {
        return this.#vals[(index < 0 ? this.#vals.length : 0) + index % this.#vals.length];
    }
    size() {
        return this.#vals.length;
    }
    indexOf(item) {
        return this.#vals.indexOf(item);
    }
    lastIndexOf(item) {
        return this.#vals.lastIndexOf(item);
    }
    indicesOf(item) {
        let indices = [];
        let idx;
        while((idx = this.#vals.indexOf(item, idx + 1)) != -1) indices.push(idx);
        return indices;
    }
    toArray() {
        return [...this.#vals];
    }
    equals(tuple) {
        return Tuple.equals(this, tuple);
    }
    static reverse(tuple) {
        if(!(tuple instanceof Tuple)) throw new InvalidTupleArgumentException(`'${tuple}' is not a tuple.`);
        return new Tuple(tuple.toArray().reverse());
    }
    static equals(tup1, tup2) {
        if(!(tup1 instanceof Tuple)) throw new InvalidTupleArgumentException(`'${tup1}' is not a tuple.`);
        if(!(tup2 instanceof Tuple)) throw new InvalidTupleArgumentException(`'${tup2}' is not a tuple.`);

        if(tup1.size() != tup2.size()) return false;

        for(let i = 0; i < tup1.size(); i++) {
            if(tup1.get(i) != tup2.get(i)) return false;
        }

        return true;
    }
    // Copied from https://github.com/99TheDark/Dark.js
    static isArray(arr) {
        return Array.isArray(arr) || ArrayBuffer.isView(arr);
    }
}
