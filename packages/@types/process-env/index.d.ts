
declare namespace process.env {
    export const NODE_ENV: 'development' | 'production';
}
declare namespace module {
    export const hot: {
        accept(path: string, fn: () => void): void;
    };
}
