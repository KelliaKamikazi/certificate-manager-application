declare module '*.svg';
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.jpeg';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
// declare module '*.png' {
//   const value: string;
//   export default value;
// }

// declare module '*.svg' {
//   import React from 'react';
//   const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   export { ReactComponent };
//   export default ReactComponent;
// }

// declare module '*.module.scss' {
//   const classes: { [key: string]: string };
//   export default classes;
// }
