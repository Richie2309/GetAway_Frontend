import React from 'react';

const Loading = () => {
  return (
    <div style={styles.overlay}>
      <style>
        {`
          .loader {
            width: 28px;
            aspect-ratio: 1;
            border-radius: 50%;
            background: #E3AAD6;
            transform-origin: top;
            display: grid;
            animation: l3-0 1s infinite linear;
          }
          .loader::before,
          .loader::after {
            content: "";
            grid-area: 1/1;
            background: #F4DD51;
            border-radius: 50%;
            transform-origin: top;
            animation: inherit;
            animation-name: l3-1;
          }
          .loader::after {
            background: #F10C49;
            --s: 180deg;
          }
          @keyframes l3-0 {
            0%, 20% { transform: rotate(0); }
            100% { transform: rotate(360deg); }
          }
          @keyframes l3-1 {
            50% { transform: rotate(var(--s, 90deg)); }
            100% { transform: rotate(0); }
          }
        `}
      </style>
      <div className="loader"></div>
    </div>
  );
};

// Styles for overlay and centering the loader
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker shade overlay
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999 // Make sure the overlay is above other content
  }
};

export default Loading;
