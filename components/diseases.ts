export interface DiseaseInfo {
  description: string;
  solution: string;
  medicine: string;
}

export function parseDiseaseClass(diseaseClass: string): { plant: string; disease: string } {
  const [plant, ...diseaseParts] = diseaseClass.split('___');
  return {
    plant: plant || 'Unknown',
    disease: diseaseParts.join(' ') || 'Unknown',
  };
}

export function getDiseaseInfo(diseaseClass: string): DiseaseInfo {
  // Example mappings (extend based on PlantVillage dataset classes)
  const diseaseInfoMap: Record<string, DiseaseInfo> = {
    'Tomato___Late_blight': {
      description: 'Late blight is a potentially destructive disease caused by the oomycete Phytophthora infestans, affecting tomato crops.',
      solution: 'Remove and destroy affected leaves, improve air circulation, and apply fungicides early in the disease cycle.',
      medicine: 'Copper-based fungicides or chlorothalonil can be effective.',
    },
    'Tomato___healthy': {
      description: 'The plant appears healthy with no visible signs of disease.',
      solution: 'Maintain proper watering, fertilization, and monitoring to keep the plant healthy.',
      medicine: 'No treatment required.',
    },
    // Add more mappings for other classes
  };

  return (
    diseaseInfoMap[diseaseClass] || {
      description: 'No information available for this disease.',
      solution: 'Consult an agronomist for specific advice.',
      medicine: 'Unknown.',
    }
  );
}