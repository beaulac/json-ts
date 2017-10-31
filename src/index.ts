import {parse} from "./parser";
import {print} from "./printer";
import {transform} from "./transformer";

export interface JsonTsOptions {
    namespace?: string
    flow?: boolean
    prefix?: string
    rootName?: string
}

export const defaults = {
    prefix: "I",
    rootName: "RootObject"
};

export function json2ts(validJsonString: string, options: JsonTsOptions = {}): string {
    const merged = checkOptions({
        ...defaults,
        ...options
    });
    const parsed = parse(validJsonString, merged);
    const transformed = transform(parsed, merged);
    const printed = print(transformed, merged);
    return printed;
}

function checkOptions(options) {
    if (options.prefix || options.rootName) {
        return options;
    }
    throw Error('prefix and rootName cannot both be empty!');
}

export {
    parse,
    print,
    transform
}

declare var window;
if ((typeof window !== 'undefined') && ((typeof window.json2ts) === 'undefined')) {
    window.json2ts = json2ts;
    window.json2ts.parse = parse;
    window.json2ts.transform = transform;
    window.json2ts.print = print;
}