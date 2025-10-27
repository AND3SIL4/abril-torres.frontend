import { useEffect, useState, useRef } from 'react';

export default function ModelViewer({ src, alt, style }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const viewerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadModelViewer = async () => {
      try {
        // Importa model-viewer solo en el cliente
        await import('@google/model-viewer');

        // No need to manually register - model-viewer auto-registers
        // Just wait a bit for the custom element to be ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (isMounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading model-viewer:', err);
        if (isMounted) {
          setError('Error al cargar el visor 3D');
          setLoading(false);
        }
      }
    };

    loadModelViewer();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleError = (event) => {
    console.error('Model loading error:', event);
    console.error('Error details:', event.detail);
    console.error('Error type:', event.detail?.type);
    console.error('Error message:', event.detail?.message);

    // Provide more specific error messages based on error type
    let errorMessage = 'Error al cargar el modelo 3D';

    if (event.detail?.message) {
      errorMessage += `: ${event.detail.message}`;
    } else if (event.detail?.type === 'network') {
      errorMessage += ': Error de red - verifica la URL del archivo';
    } else if (event.detail?.type === 'parse') {
      errorMessage += ': Error al analizar el archivo - formato inválido';
    } else if (event.detail?.type === 'webgl') {
      errorMessage += ': Error de WebGL - navegador no compatible';
    } else if (event.detail?.type === 'memory') {
      errorMessage += ': Error de memoria - archivo demasiado grande';
    } else {
      // Check for common issues
      const url = src;
      if (url.includes('.obj') && !url.includes('.gltf')) {
        errorMessage +=
          ': Los archivos OBJ pueden tener problemas de compatibilidad. Considera convertir a GLTF';
      } else {
        errorMessage += ': Verifica que el archivo existe y es accesible';
      }
    }

    setError(errorMessage);
    setLoading(false);
  };

  const handleLoad = () => {
    console.log('Model loaded successfully');
    setLoading(false);
    setError(null);
  };

  const handleProgress = (event) => {
    console.log('Model loading progress:', event.detail);
  };

  // Debug network requests
  useEffect(() => {
    const handleFetch = (event) => {
      console.log('Model-viewer fetch request:', event.detail?.url);
    };

    if (viewerRef.current) {
      viewerRef.current.addEventListener('fetch', handleFetch);
      return () => {
        viewerRef.current?.removeEventListener('fetch', handleFetch);
      };
    }
  }, [loading]);

  if (error) {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
          borderRadius: '8px',
        }}
      >
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '16px' }}>⚠️ {error}</p>
          <p style={{ margin: '0', fontSize: '14px' }}>
            El modelo 3D no se pudo cargar
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>
            Verifica la consola del navegador para más detalles
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div
          style={{
            ...style,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px',
              }}
            ></div>
            <p style={{ margin: '0', color: '#666' }}>Cargando modelo 3D...</p>
          </div>
        </div>
      )}
      <model-viewer
        ref={viewerRef}
        src={src}
        alt={alt}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        camera-orbit="0deg 55deg 15m"
        field-of-view="25deg"
        scale="0.8 0.8 0.8"
        exposure="1"
        environment-image="neutral"
        disable-tap
        orientation="180deg 0deg 0deg"
        style={{
          ...style,
          display: loading ? 'none' : 'block',
          width: '100%',
          height: '350px',
          maxWidth: '7000px',
          margin: '0 auto',
        }}
        onError={handleError}
        onLoad={handleLoad}
        onProgress={handleProgress}
      >
        {/* Fallback content for when model fails to load */}
        <div slot="poster" style={{ display: 'none' }}></div>
        <div slot="progress-bar" style={{ display: 'none' }}></div>
      </model-viewer>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        model-viewer {
          --progress-bar-color: #3498db;
        }
      `}</style>
    </>
  );
}
