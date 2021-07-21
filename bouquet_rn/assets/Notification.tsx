import React from "react";
import { SvgXml } from "react-native-svg";

const alarm = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5278 8.63259L7.2517 8.82873L7.2517 8.82873L6.5278 8.63259ZM10.6584 4.30223L10.4271 3.58877L10.6584 4.30223ZM6.48297 8.79804L5.75907 8.6019L5.75907 8.6019L6.48297 8.79804ZM6.28956 12.8674L7.0288 12.7409V12.7409L6.28956 12.8674ZM6.31207 12.9989L5.57282 13.1255L5.57282 13.1255L6.31207 12.9989ZM6.78759 17.4572L6.93731 16.7223L6.78759 17.4572ZM7.15518 17.5321L7.3049 16.7971H7.3049L7.15518 17.5321ZM17.8448 17.5321L17.6951 16.7971H17.6951L17.8448 17.5321ZM18.2124 17.4572L18.3621 18.1921L18.2124 17.4572ZM18.6922 12.9737L19.4315 13.1003V13.1003L18.6922 12.9737ZM18.7161 12.8343L17.9769 12.7077V12.7077L18.7161 12.8343ZM18.5417 8.82624L17.8163 9.01657V9.01658L18.5417 8.82624ZM18.4793 8.58835L19.2047 8.39802V8.39802L18.4793 8.58835ZM14.4671 4.30838L14.7023 3.59621V3.59621L14.4671 4.30838ZM18.853 13.3008L18.4868 13.9553L18.853 13.3008ZM6.16797 13.2892L5.8088 12.6308L6.16797 13.2892ZM13.25 3C13.25 2.58579 12.9142 2.25 12.5 2.25C12.0858 2.25 11.75 2.58579 11.75 3H13.25ZM11.75 4.00474C11.75 4.41895 12.0858 4.75474 12.5 4.75474C12.9142 4.75474 13.25 4.41895 13.25 4.00474H11.75ZM9.5091 17.9034L9.59289 17.1581L8.69556 17.0572L8.76108 17.9578L9.5091 17.9034ZM15.4909 17.9034L16.2389 17.9578L16.3044 17.0572L15.4071 17.1581L15.4909 17.9034ZM15.4001 18.4772L16.1285 18.6563L15.4001 18.4772ZM15.3182 18.8106L14.5899 18.6315L15.3182 18.8106ZM13.2039 20.917L13.3784 21.6464H13.3784L13.2039 20.917ZM11.7961 20.917L11.6216 21.6464H11.6216L11.7961 20.917ZM9.68182 18.8106L8.95352 18.9896L9.68182 18.8106ZM9.59985 18.4772L10.3282 18.2981H10.3282L9.59985 18.4772ZM7.2517 8.82873C7.73925 7.02931 9.12052 5.58915 10.8896 5.01568L10.4271 3.58877C8.17951 4.31734 6.42499 6.14416 5.8039 8.43645L7.2517 8.82873ZM7.20687 8.99418L7.2517 8.82873L5.8039 8.43645L5.75907 8.6019L7.20687 8.99418ZM7.0288 12.7409C6.8153 11.4939 6.87608 10.215 7.20687 8.99418L5.75907 8.6019C5.37128 10.0331 5.30004 11.5322 5.55032 12.994L7.0288 12.7409ZM7.05131 12.8723L7.0288 12.7409L5.55032 12.994L5.57282 13.1255L7.05131 12.8723ZM5.75 15.2604C5.75 14.6932 6.06385 14.2003 6.52714 13.9476L5.8088 12.6308C4.88074 13.137 4.25 14.1251 4.25 15.2604H5.75ZM6.93731 16.7223C6.24893 16.582 5.75 15.9725 5.75 15.2604H4.25C4.25 16.6807 5.24616 17.9085 6.63787 18.1921L6.93731 16.7223ZM7.3049 16.7971L6.93731 16.7223L6.63787 18.1921L7.00547 18.267L7.3049 16.7971ZM17.6951 16.7971C14.2666 17.4956 10.7334 17.4956 7.3049 16.7971L7.00547 18.267C10.6316 19.0057 14.3684 19.0057 17.9945 18.267L17.6951 16.7971ZM18.0627 16.7223L17.6951 16.7971L17.9945 18.267L18.3621 18.1921L18.0627 16.7223ZM19.25 15.2604C19.25 15.9725 18.7511 16.582 18.0627 16.7223L18.3621 18.1921C19.7538 17.9085 20.75 16.6807 20.75 15.2604H19.25ZM18.4868 13.9553C18.9425 14.2103 19.25 14.6989 19.25 15.2604H20.75C20.75 14.1365 20.1319 13.157 19.2192 12.6463L18.4868 13.9553ZM17.9769 12.7077L17.953 12.8471L19.4315 13.1003L19.4554 12.9608L17.9769 12.7077ZM17.8163 9.01658C18.1323 10.2211 18.1871 11.4799 17.9769 12.7077L19.4554 12.9608C19.7017 11.5223 19.6375 10.0474 19.2672 8.63591L17.8163 9.01658ZM17.7539 8.77868L17.8163 9.01657L19.2672 8.63591L19.2047 8.39802L17.7539 8.77868ZM14.2319 5.02054C15.9622 5.592 17.2887 7.00574 17.7539 8.77868L19.2047 8.39802C18.6113 6.13594 16.9174 4.32779 14.7023 3.59621L14.2319 5.02054ZM10.8896 5.01568C11.974 4.66418 13.1528 4.66417 14.2319 5.02054L14.7023 3.59621C13.3171 3.13872 11.8114 3.14004 10.4271 3.58877L10.8896 5.01568ZM19.2192 12.6463C19.3626 12.7265 19.466 12.8988 19.4315 13.1003L17.953 12.8471C17.8735 13.3114 18.1116 13.7453 18.4868 13.9553L19.2192 12.6463ZM5.57282 13.1255C5.53579 12.9092 5.64712 12.719 5.8088 12.6308L6.52714 13.9476C6.89669 13.746 7.12845 13.3228 7.05131 12.8723L5.57282 13.1255ZM11.75 3V4.00474H13.25V3H11.75ZM9.42531 18.6487C11.4687 18.8784 13.5313 18.8784 15.5747 18.6487L15.4071 17.1581C13.4751 17.3753 11.5249 17.3753 9.59289 17.1581L9.42531 18.6487ZM16.1285 18.6563C16.1849 18.4268 16.2218 18.1932 16.2389 17.9578L14.7429 17.849C14.7319 18.0003 14.7081 18.1506 14.6718 18.2981L16.1285 18.6563ZM16.0465 18.9896L16.1285 18.6563L14.6718 18.2981L14.5899 18.6315L16.0465 18.9896ZM13.3784 21.6464C14.6945 21.3315 15.723 20.3052 16.0465 18.9896L14.5899 18.6315C14.3997 19.4047 13.7965 20.004 13.0294 20.1875L13.3784 21.6464ZM11.6216 21.6464C12.1991 21.7845 12.8009 21.7845 13.3784 21.6464L13.0294 20.1875C12.6813 20.2708 12.3187 20.2708 11.9706 20.1875L11.6216 21.6464ZM8.95352 18.9896C9.27701 20.3052 10.3055 21.3315 11.6216 21.6464L11.9706 20.1875C11.2035 20.004 10.6003 19.4047 10.4101 18.6315L8.95352 18.9896ZM8.87155 18.6563L8.95352 18.9896L10.4101 18.6315L10.3282 18.2981L8.87155 18.6563ZM8.76108 17.9578C8.7782 18.1932 8.81512 18.4268 8.87155 18.6563L10.3282 18.2981C10.2919 18.1506 10.2681 18.0003 10.2571 17.849L8.76108 17.9578Z" fill="#B0B0B0"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const AlarmSvg = () => <SvgXml xml={alarm} width={w} height={h}/>;
  return <AlarmSvg />;
};

export default svg;