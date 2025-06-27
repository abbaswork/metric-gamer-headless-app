import React from 'react';


interface Props {
  children?: any;
}

export const PageContent = ({ children }: Props) => {
  return (
    // Consider using section + article tags
    <article className='page-content'>
      {children}
    </article>
  );
};
