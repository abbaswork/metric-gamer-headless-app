'use client';
import React from "react";
import "./scroll-up-button.scss";



export const ScrollUpButton = () => {

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scroll-up-button" onClick={handleScrollToTop} >
      <svg className="vector" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </div>
  );
};
//Abdullah


export default ScrollUpButton;
