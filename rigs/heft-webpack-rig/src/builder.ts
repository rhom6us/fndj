import { RuleSetUseItem } from 'webpack';
type IifPhrase<T> = [test: boolean, truePart: T];
function iif<T, F = T>(...args: [...phrases: IifPhrase<T>[], fallback: F]): T | F {
    const fallback = args.splice(-1, 1);
    for (const [test, value] of args as any) {
        if (test) {
            return value;
        }
    }
    return fallback as any;
}
interface Rule {
    readonly use?: RuleSetUseItem[];
    readonly test?: RegExp;
    readonly resourceQuery?: RegExp;
    readonly exclude?: RegExp[];
    readonly type?: string;
}
export class RuleBuilder {
    private readonly use?: RuleSetUseItem[];
    private readonly test?: RegExp;
    private readonly resourceQuery?: RegExp;
    private readonly exclude?: RegExp[];
    private readonly type?: string;
    result(tag?: string): Rule {
        const result = { ...this } as any;
        delete result.isDev;
        return result;
    }
    constructor(private readonly isDev: boolean) {

    }
    private extend(rule: Rule): this {
        return Object.assign(new RuleBuilder(this.isDev), this, rule);
    }
    when(test: RegExp) {
        return this.extend({
            test
        });
    };
    butNotWhen(...exclude: RegExp[]) {
        return this.extend({
            exclude: [...(this.exclude ?? []), ...exclude],
        });
    };
    asAsset(inline: boolean | undefined = undefined) {
        return this.extend({
            type:
                inline === undefined ? 'asset' :
                    inline ? 'asset/inline' :
                        'asset/resource'
            // type: iif(
            //     [inline === undefined, 'asset' as const],
            //     [inline, 'asset/inline' as const],
            //     'asset/resource' as const),

            // generator: {
            //     dataUrl: content => {
            //         content = content.toString();
            //         return svgToMiniDataURI(content);
            //     }
            // }

        });
    };
    withResourceQuery(resourceQuery: RegExp) {
        return this.extend({ resourceQuery });
    };
    usingDev(...use: RuleSetUseItem[]) {
        return this.using(...use);
        // return this.isDev ? this.using(...use) : this
    };
    usingProd(...use: RuleSetUseItem[]) {
        return this.using(...use);
        // return this.isDev ? this : this.using(...use);
    };

    using(...use: RuleSetUseItem[]) {
        return this.extend({
            use: [...(this.use ?? []), ...use],
        });
    }
};
