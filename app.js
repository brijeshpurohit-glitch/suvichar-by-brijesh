let i=0;
let language = "hi";
function toggleLanguage(){
  language = language === "hi" ? "en" : "hi";
  render();
}
document.getElementById("langBtn").onclick = toggleLanguage;
const art=document.getElementById('art'), title=document.getElementById('title'), meta=document.getElementById('meta'), counter=document.getElementById('counter');
function render(){
 const englishTitle = ENGLISH[i] || PAGES[i].title;
const p=PAGES[i]; art.src=p.image; art.alt=`पृष्ठ ${p.page} — ${p.title}`; title.textContent = language === "hi" ? p.title : englishTitle;
 meta.textContent=`अध्याय 1 • जीवन • पृष्ठ ${p.page}`; counter.textContent=`${p.page} / ${PAGES.length}`;
}
document.getElementById('next').onclick=()=>{i=(i+1)%PAGES.length;render()};
document.getElementById('prev').onclick=()=>{i=(i-1+PAGES.length)%PAGES.length;render()};
document.getElementById('share').onclick=async()=>{
 const p=PAGES[i];
 try{
   const blob=await (await fetch(p.image,{cache:'no-store'})).blob();
   const file=new File([blob],`suvichar-${String(p.page).padStart(2,'0')}.jpg`,{type:'image/jpeg'});
   if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))){
     await navigator.share({title:`सुविचार — ${p.title}`,text:`अध्याय 1 • जीवन • पृष्ठ ${p.page} — brijesh`,files:[file]});
   }else if(navigator.share){
     await navigator.share({title:`सुविचार — ${p.title}`,text:`अध्याय 1 • जीवन • पृष्ठ ${p.page} — brijesh`});
   }
 }catch(e){}
};
render();
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
