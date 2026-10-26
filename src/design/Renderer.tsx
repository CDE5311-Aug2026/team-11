import React,{type CSSProperties,type ReactNode} from 'react';
import data from './screens.json';
import {Check} from '../Check';
export type DesignNode={tag:string;props:Record<string,any>&{style:CSSProperties};children:(DesignNode|string)[]};
export type Override=(n:DesignNode,path:string,render:(n:DesignNode|string,path?:string)=>ReactNode)=>ReactNode|undefined;
export const designs=data as unknown as Record<string,{height:number;tree:DesignNode}>;
export const words=(n:DesignNode|string):string=>typeof n==='string'?n:n.children.map(words).join(' ').replace(/\s+/g,' ').trim();
export const nameOf=(n:DesignNode)=>n.props['data-name']||'';
export const find=(n:DesignNode,fn:(n:DesignNode)=>boolean):DesignNode|undefined=>fn(n)?n:n.children.filter(x=>typeof x!=='string').map(x=>find(x as DesignNode,fn)).find(Boolean);
export function Status(){return <div className="status" aria-hidden="true"><b>9:41</b><span className="island"/><span className="status-symbols"><span className="signal"><i/><i/><i/><i/></span><svg className="wifi" width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true"><path d="M1.5 4.5C5.64.5 12.36.5 16.5 4.5M4.4 7.6C6.94 5.2 11.06 5.2 13.6 7.6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"/><path d="M6.5 10.4Q9 8.3 11.5 10.4L9.7 12.3Q9 13 8.3 12.3Z" fill="currentColor"/></svg><span className="battery"/></span></div>}
export function Design({id,override,part,layout=true}:{id:string;override?:Override;part?:DesignNode;layout?:boolean}){
 const screen=designs[id];const root=part||screen.tree;
 function render(n:DesignNode|string,path='r'):ReactNode{if(typeof n==='string')return n;const custom=override?.(n,path,render);if(custom!==undefined)return custom;if(nameOf(n)==='Checkmark')return <Check key={path} on={n.props.style.backgroundColor==='#5b2a6e'} style={{width:n.props.style.width,height:n.props.style.height}}/>;if(nameOf(n)==='Icon / tick-circle')return <Check key={path} on style={{width:n.props.style.width,height:n.props.style.height}}/>;if(n.tag==='status-bar')return <Status key={path}/>;const props:Record<string,any>={...n.props,key:path};delete props.id;if(n.tag==='a'){delete props.href;}return React.createElement(n.tag==='a'?'div':n.tag,props,...n.children.map((c,i)=>render(c,path+'.'+i)))}
 if(part||!layout)return <>{render(root)}</>;
 const children=root.children.filter(x=>typeof x!=='string') as DesignNode[];
 const nav=children.find(n=>/Home\s+Visit\s+Create\s+Pattern\s+Profile/.test(words(n))&&words(n).length<45);
 const onboard=!nav;
 if(onboard)return <div className="design onboarding" style={{minHeight:screen.height}}>{children.map((n,i)=>render(n,'r.'+i))}</div>;
 const body=children.filter(n=>n!==nav&&n.tag!=='status-bar');
 return <div className="design screen-flow" style={{minHeight:screen.height}}><Status/><div className="screen-content" key={id}>{body.map((n,i)=>{
  const isHome=(id==='278:4272'||id==='646:3306');let margin= i===0?Math.max(0,parseFloat(String(n.props.style.top||'74'))-62):0;
  if(isHome)margin=i===0?12:i===1?15:12;
  return <div key={i} className="design-section" style={{marginTop:margin,width:'100%'}}>{render({...n,props:{...n.props,style:{...n.props.style,...(nameOf(n)==='Summary content'?{width:'357px'}:{}),position:'relative',top:undefined,left:undefined,right:undefined,bottom:undefined,transform:undefined,marginLeft:isHome&&i===1?0:'auto',marginRight:'auto'}}},'r.'+i)}</div>
 })}</div><div className="navigation-slot">{nav&&render({...nav,props:{...nav.props,style:{...nav.props.style,position:'relative',top:undefined,bottom:undefined,left:0,transform:undefined}}},'nav')}</div></div>
}
