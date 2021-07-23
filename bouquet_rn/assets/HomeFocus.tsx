import React from "react";
import { SvgXml } from "react-native-svg";

const home_focus = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2972 11.7821C21.5676 11.51 21.5676 11.0687 21.2972 10.7966L15.5664 5.02821C14.98 4.43789 14.491 3.94564 14.0506 3.60741C13.5857 3.2504 13.0946 3 12.5 3C11.9054 3 11.4143 3.2504 10.9494 3.60741C10.509 3.94564 10.02 4.43789 9.43355 5.02821L3.70277 10.7966C3.43241 11.0687 3.43241 11.51 3.70277 11.7821C3.97314 12.0542 4.41148 12.0542 4.68184 11.7821L5.07845 11.3829V14.4332C5.07845 17.4273 7.12594 20.0276 10.022 20.7114C11.6519 21.0962 13.3481 21.0962 14.978 20.7114C17.874 20.0276 19.9215 17.4273 19.9215 14.4332V11.3829L20.3182 11.7821C20.5885 12.0542 21.0269 12.0542 21.2972 11.7821Z" fill="#FA7268"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const HomeFocusSvg = () => <SvgXml xml={home_focus} width={w} height={h}/>;
  return <HomeFocusSvg />;
};

export default svg;