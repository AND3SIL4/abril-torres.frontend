import { useState } from 'react';
import ModelViewer from './ModelViewer.jsx';

export default function ModelCarousel() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  // Array of 5 model configurations
  const models = [
    {
      id: 1,
      src: '/models/salento-model.glb',
      alt: 'Bolso Salento en 3D',
      name: 'Salento',
      description:
        'Entre los paisajes del Quindio, donde el arte y la naturaleza se entrelazan, se inspira el lujo',
    },
    {
      id: 2,
      src: '/models/villa-de-leiva-model.glb',
      alt: 'Bolso Villa de Leiva (rojo) Crossbody en 3D',
      name: 'Villa de Leiva (rojo)',
      description:
        'Rendimos honor a la tierra de Boyaca, transformamos la tradicion en elegancia',
    },
    {
      id: 3,
      src: '/models/guatape-model.glb',
      alt: 'Bolso Guatape en 3D',
      name: 'Guatape',
      description: 'Inspirado en las montanias de Antioquia, surgue la escencia que da vida nuestros bolsos',
    },
    {
      id: 4,
      src: '/models/villa-de-leiva-model-blue.glb',
      alt: 'Bolso Villa de Leiva (azul) Crossbody en 3D',
      name: 'Villa de Leiva (azul)',
      description:
        'Rendimos honor a la tierra de Boyaca, transformamos la tradicion en elegancia',
    },
  ];

  const nextModel = () => {
    setCurrentModelIndex((prevIndex) =>
      prevIndex === models.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevModel = () => {
    setCurrentModelIndex((prevIndex) =>
      prevIndex === 0 ? models.length - 1 : prevIndex - 1
    );
  };

  const goToModel = (index) => {
    setCurrentModelIndex(index);
  };

  const currentModel = models[currentModelIndex];

  return (
    <div className="relative">
      {/* Model Viewer */}
      <div className="relative">
        <ModelViewer
          src={currentModel.src}
          alt={currentModel.alt}
          style={{
            width: '100%',
            height: '600px',
            borderRadius: '8px',
            maxWidth: '800px',
            margin: '0 auto',
          }}
          client:load
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevModel}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
          aria-label="Modelo anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={nextModel}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
          aria-label="Modelo siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Model Info */}
      <div className="text-center mt-6 mb-4">
        <h4 className="text-xl font-semibold text-foreground mb-1">
          {currentModel.name}
        </h4>
        <p className="text-muted-foreground">{currentModel.description}</p>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2">
        {models.map((_, index) => (
          <button
            key={index}
            onClick={() => goToModel(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentModelIndex
                ? 'bg-primary'
                : 'bg-muted hover:bg-muted-foreground'
            }`}
            aria-label={`Ir al modelo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
