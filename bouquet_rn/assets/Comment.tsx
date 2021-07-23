import React from "react";
import { SvgXml } from "react-native-svg";

const commentFocus = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2619 16.2418L9.79623 16.0597L10.2619 16.2418ZM3.14924 11.7815L2.66195 11.8935L3.14924 11.7815ZM3.14643 7.68868L2.65914 7.57668L3.14643 7.68868ZM16.873 7.87284L17.3603 7.76083L16.873 7.87284ZM16.873 11.5851L16.3857 11.4731L16.873 11.5851ZM7.76328 17.3528L7.95983 16.893H7.95983L7.76328 17.3528ZM8.07461 2.72618L8.19101 3.21244V3.21244L8.07461 2.72618ZM11.9025 2.72618L11.7861 3.21244L11.9025 2.72618ZM7.66481 17.3107L7.46825 17.7704H7.46825L7.66481 17.3107ZM12.2201 2.8022L12.3365 2.31594L12.2201 2.8022ZM16.799 7.55073L16.3117 7.66274L16.799 7.55073ZM7.88874 2.77067L7.77234 2.28441V2.28441L7.88874 2.77067ZM7.2469 7.04828C6.97076 7.04828 6.7469 7.27213 6.7469 7.54828C6.7469 7.82442 6.97076 8.04828 7.2469 8.04828V7.04828ZM12.2733 8.04828C12.5494 8.04828 12.7733 7.82442 12.7733 7.54828C12.7733 7.27213 12.5494 7.04828 12.2733 7.04828V8.04828ZM7.2469 9.92841C6.97076 9.92841 6.7469 10.1523 6.7469 10.4284C6.7469 10.7046 6.97076 10.9284 7.2469 10.9284V9.92841ZM10.4455 10.9284C10.7217 10.9284 10.9455 10.7046 10.9455 10.4284C10.9455 10.1523 10.7217 9.92841 10.4455 9.92841V10.9284ZM8.00514 3.25693L8.19101 3.21244L7.95821 2.23992L7.77234 2.28441L8.00514 3.25693ZM11.7861 3.21244L12.1037 3.28846L12.3365 2.31594L12.0189 2.23992L11.7861 3.21244ZM7.95983 16.893L7.86136 16.8509L7.46825 17.7704L7.56672 17.8125L7.95983 16.893ZM16.3117 7.66274L16.3857 7.98485L17.3603 7.76083L17.2863 7.43872L16.3117 7.66274ZM11.8101 15.2723H10.9256V16.2723H11.8101V15.2723ZM10.9256 15.2723C10.4153 15.2723 9.97636 15.5991 9.79623 16.0597L10.7275 16.4239C10.7682 16.32 10.855 16.2723 10.9256 16.2723V15.2723ZM3.63654 11.6695C3.3451 10.4016 3.3426 9.06721 3.63372 7.80069L2.65914 7.57668C2.33382 8.99198 2.33695 10.4795 2.66195 11.8935L3.63654 11.6695ZM16.3857 7.98485C16.6492 9.13102 16.6492 10.3269 16.3857 11.4731L17.3603 11.6971C17.6577 10.4035 17.6577 9.05442 17.3603 7.76083L16.3857 7.98485ZM7.56672 17.8125C8.82358 18.3498 10.2316 17.6919 10.7275 16.4239L9.79623 16.0597C9.48991 16.8428 8.65816 17.1916 7.95983 16.893L7.56672 17.8125ZM8.19101 3.21244C9.37432 2.92919 10.6028 2.92919 11.7861 3.21244L12.0189 2.23992C10.6826 1.92003 9.29456 1.92003 7.95821 2.23992L8.19101 3.21244ZM7.86136 16.8509C5.7575 15.9514 4.1753 14.0134 3.63654 11.6695L2.66195 11.8935C3.26815 14.5308 5.05397 16.7382 7.46825 17.7704L7.86136 16.8509ZM16.3857 11.4731C15.8697 13.7181 13.9671 15.2723 11.8101 15.2723V16.2723C14.4644 16.2723 16.7471 14.3651 17.3603 11.6971L16.3857 11.4731ZM12.1037 3.28846C14.1695 3.78295 15.8076 5.46948 16.3117 7.66274L17.2863 7.43872C16.7019 4.89649 14.7922 2.90378 12.3365 2.31594L12.1037 3.28846ZM7.77234 2.28441C5.23592 2.89156 3.26291 4.94993 2.65914 7.57668L3.63372 7.80069C4.15728 5.52292 5.85869 3.77074 8.00514 3.25693L7.77234 2.28441ZM7.2469 8.04828H12.2733V7.04828H7.2469V8.04828ZM7.2469 10.9284H10.4455V9.92841H7.2469V10.9284Z" fill="#FA7268"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const CommentFocusSvg = () => <SvgXml xml={commentFocus} width={w} height={h}/>;
  return <CommentFocusSvg />;
};

export default svg;