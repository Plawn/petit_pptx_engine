import expressions from 'angular-expressions';
import merge from "lodash/merge";

// define your filter functions here, for example, to be able to write {clientname | lower}
expressions.filters.lower = function (input: string) {
    // This condition should be used to make sure that if your input is undefined, your output will be undefined as well and will not throw an error
    if (!input) return input;
    return input.toLowerCase();
}



const angularParser = (tag: string) => {
    if (tag === '.') {
        return {
            get: (s: any) => s
        };
    }
    const expr = expressions.compile(
        tag.replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"')
    );
    return {
        get: (scope: any, context: any) => {
            let obj = {};
            const scopeList = context.scopeList;
            const num = context.num;
            for (let i = 0, len = num + 1; i < len; i++) {
                obj = merge(obj, scopeList[i]);
            }
            return expr(scope, obj);
        }
    };
}

export default angularParser;