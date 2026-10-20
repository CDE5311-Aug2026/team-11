import type {CSSProperties} from 'react';
export function Check({on,style}:{on:boolean;style?:CSSProperties}){return <span className={'check '+(on?'checked':'')} style={style} aria-hidden="true">{on&&<svg viewBox="0 0 28 28" fill="none"><path d="M9.5 14.8 12.6 17.9 18.8 11.7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}</span>}
