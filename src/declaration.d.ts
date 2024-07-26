declare module '*.svg';
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.jpeg';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
