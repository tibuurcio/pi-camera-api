import React from 'react';
import ContentLoader from 'react-content-loader';

const Loading = props => (
  <ContentLoader
    height={300}
    width={400}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}>
    <rect x="0" y="10" rx="5" ry="5" width="400" height="300" />
  </ContentLoader>
);

export default Loading;
