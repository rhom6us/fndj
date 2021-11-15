import { RuleSetUseItem } from 'webpack';

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
        });
    };
    withResourceQuery(resourceQuery: RegExp) {
        return this.extend({ resourceQuery });
    };
    usingDev(...use: RuleSetUseItem[]) {
        return this.extend({
            use: !this.isDev ? this.use : [...(this.use ?? []), ...use],
        });
    };
    usingProd(...use: RuleSetUseItem[]) {
        return this.extend({
            use: this.isDev ? this.use : [...(this.use ?? []), ...use],
        });
    };

    using(...use: RuleSetUseItem[]) {
        return this.extend({
            use: [...(this.use ?? []), ...use],
        });
    }
};
