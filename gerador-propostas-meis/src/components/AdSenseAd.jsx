import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Componente AdSense para exibição de anúncios
 * @param {string} adSlot - ID do slot do anúncio (obrigatório)
 * @param {string} adFormat - Formato do anúncio (default: "auto")
 * @param {boolean} fullWidthResponsive - Se o anúncio deve ser responsivo (default: true)
 * @param {string} className - Classes CSS customizadas
 * @param {object} style - Estilos inline
 */
const AdSenseAd = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = {},
  ...props
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Só carrega anúncios em produção
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Verifica se o AdSense já foi carregado
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        // Push do anúncio para o AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Erro ao carregar anúncio AdSense:', error);
      }
    }
  }, [adSlot]);

  // Não renderiza em desenvolvimento
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div 
        className={cn(
          'bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500',
          className
        )}
        style={style}
        {...props}
      >
        <p className="text-sm">AdSense Ad Placeholder</p>
        <p className="text-xs">Slot: {adSlot}</p>
      </div>
    );
  }

  return (
    <div className={cn('adsense-container', className)} style={style} {...props}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client="ca-pub-4789090074866563"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdSenseAd;