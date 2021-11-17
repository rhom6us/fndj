import path from 'path';


export type Environment = 'production' | 'development';
export type App = 'webApp';
export type Command = 'fnbuild' | 'fnwatch' | 'fnserve';
export const isDev = true;// process.env.NODE_ENV !== 'production';
export const projectDir = path.resolve('.');
// const packageJson = fs.readFileSync(path.join('.', 'package.json'));
// const pkg = JSON.parse(packageJson as any);
// export const entryPoint: string = pkg.main;
export const entryPoint: string = process.env['npm_package_main'] || process.env['npm_package_browser']; //  pkg.main;

// This will be running from "./packages/@fndj/main/" or the like.
// Get back up to the root dir
// export const rootDir = path.resolve(path.join(projectDir, '../../../'));

// export const staticSourceDir = path.join(rootDir, 'static');
export const outDir = (path.join(projectDir, 'dist'));

