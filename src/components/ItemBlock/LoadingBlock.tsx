import React from 'react';
import ContentLoader from "react-content-loader";

const LoadingBlock = () => {
  return (
    <ContentLoader
      speed={2}
      width={624}
      height={112}
      viewBox="0 0 624 112"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="15" y="20" rx="0" ry="0" width="212" height="18"/>
      <rect x="15" y="45" rx="0" ry="0" width="212" height="18"/>
      <rect x="15" y="70" rx="0" ry="0" width="212" height="18"/>
      <rect x="515" y="70" rx="0" ry="0" width="83" height="18"/>
    </ContentLoader>
  );
}

export default LoadingBlock;