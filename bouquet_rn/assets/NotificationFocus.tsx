import React from "react";
import { SvgXml } from "react-native-svg";

const alarm_focus = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2045 3.69534C13.2045 3.31131 12.8891 3 12.5 3C12.1109 3 11.7955 3.31131 11.7955 3.69534V3.96878C11.375 4.01728 10.9588 4.1062 10.5537 4.2352C8.44323 4.90718 6.79399 6.59279 6.20994 8.71011L6.16783 8.86277C5.81888 10.1278 5.74259 11.4504 5.94311 12.7452C5.22265 13.2443 4.75 14.0715 4.75 15.0085C4.75 16.3231 5.68832 17.4558 6.99379 17.717L7.33911 17.7861C7.91503 17.9014 8.49392 17.9971 9.07478 18.0734C9.08018 18.0968 9.0858 18.1202 9.09164 18.1436L9.16864 18.4512C9.47314 19.6676 10.4405 20.6143 11.6756 20.9045C12.2176 21.0318 12.7824 21.0318 13.3244 20.9045C14.5595 20.6143 15.5269 19.6676 15.8314 18.4512L15.9084 18.1436C15.9142 18.1202 15.9198 18.0968 15.9252 18.0734C16.5061 17.9971 17.085 17.9014 17.6609 17.7861L18.0062 17.717C19.3117 17.4558 20.25 16.3231 20.25 15.0085C20.25 14.0717 19.7775 13.2447 19.0574 12.7455C19.2606 11.4623 19.1925 10.151 18.8568 8.89421L18.7982 8.67469C18.2401 6.58522 16.6478 4.91682 14.5679 4.24206C14.1236 4.09794 13.6661 4.00318 13.2045 3.95738V3.69534ZM12.002 19.5516C11.3172 19.3907 10.7733 18.8846 10.5672 18.2262C11.8539 18.321 13.1461 18.321 14.4328 18.2262C14.2267 18.8846 13.6828 19.3907 12.998 19.5516C12.6706 19.6286 12.3294 19.6286 12.002 19.5516Z" fill="#FA7268"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const AlarmFocusSvg = () => <SvgXml xml={alarm_focus} width={w} height={h}/>;
  return <AlarmFocusSvg />;
};

export default svg;