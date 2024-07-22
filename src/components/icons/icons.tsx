// import { ReactComponent as HomeIconSvg } from '../styles/items/homeIcon.svg?react';
// import { ReactComponent as MenuIconSvg } from '../styles/items/threelinesmenu.svg?react';
// import { ReactComponent as AngleDownIconSvg } from '../styles/items/angledown.svg?react';

// export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//   <HomeIconSvg {...props} />
// );

// export const ThreeLinesMenu: React.FC<React.SVGProps<SVGSVGElement>> = (
//   props,
// ) => <MenuIconSvg {...props} />;

// export const AngleDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
//   props,
// ) => <AngleDownIconSvg {...props} />;

// interface SVGIconProps {
//   Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
//   width?: number;
//   height?: number;
//   fill?: string;
//   onClick?: React.MouseEventHandler<SVGSVGElement>;
// }
// const SVGIcon: React.FC<SVGIconProps> = ({
//   Icon,
//   width = 26,
//   height = 26,
//   fill = '#265c79',
//   onClick,
// }: SVGIconProps) => {
//   return (
//     <Icon
//       width={width}
//       height={height}
//       fill={fill}
//       onClick={onClick}
//     />
//   );
// };
// export default SVGIcon;

// import { ReactComponent as NotFoundSVG } from '../../assets/images/404.svg';
// import { ReactComponent as HomeSVG } from '../../assets/images/home.svg';
// import MenuNavLink from '../../components/Sidebar/MenuNavLink';
// import SVGIcon from '../../components/SVGIcon/SVGIcon';
// import './notFound.css';
// const NotFound: React.FC = () => {
//   return (
//     <section className="not-found">
//       <h1 className="home__title">DCCS Tuzla</h1>
//       <section className="not-found__contents">
//         <div className="
// <div className="not-found__icon">
//           <SVGIcon Icon={NotFoundSVG} />
//         </div>
//         <h2 className="not-found__title">Page Not Found</h2>
//         <p className="not-found__description">
//           Sorry, the page you requested could not be found. Try navigating back
//           home.
//         </p>
//         <MenuNavLink
//           to="/"
//           desc={
//             <div className="not-found__nav-link">
//               <SVGIcon
//                 Icon={HomeSVG}
//                 fill="#fff"
// />
//               <p>Home</p>
//             </div>
//           }
//         />
//       </section>
//     </section>
//   );
// };
// export default NotFound;
interface IIconProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const IconSvg: React.FC<IIconProps> = ({
  Icon,
  width = 25,
  height = 25,
  color = '#265c79',
  className,
  onClick,
}: IIconProps) => {
  return (
    <Icon
      width={width}
      height={height}
      color={color}
      className={className}
      onClick={onClick}
    />
  );
};

export default IconSvg;
