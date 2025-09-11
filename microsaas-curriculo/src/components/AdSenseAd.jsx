import React, { useEffect } from 'react';

const AdSenseAd = ({ 
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  style = { display: 'block' },
  className = ''
}) => {
  useEffect(() => {
    // Só carrega AdSense em produção
    if (process.env.NODE_ENV === 'production') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Erro ao carregar AdSense:', error);
      }
    }
  }, []);

  // Em desenvolvimento, mostra um placeholder
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div 
        className={`bg-gray-200 border-2 border-dashed border-gray-400 p-4 text-center text-gray-600 ${className}`}
        style={style}
      >
        <p>AdSense Placeholder</p>
        <p className="text-sm">Slot: {slot}</p>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-4789090074866563"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive.toString()}
    />
  );
};

export default AdSenseAd;