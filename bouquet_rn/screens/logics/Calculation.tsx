export function numName(num : number){
  let ans;
  if(num>=1000){
      num=num/1000;
      ans = num+ 'K';
  }
  else ans=num;
  return ans;
}

export function timeName(time : number){
  if(time<60) return time+'분';
  else if(time/60 < 24) return ((time/60) | 0) + '시간';
  else return ((time/1440) | 0 )+'일';
}